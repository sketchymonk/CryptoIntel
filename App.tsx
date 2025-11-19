
import React, { useState, useCallback, useEffect } from 'react';
import { sections } from './constants';
import { FormData, GroundingChunk, SavedAnalysis } from './types';
import Accordion from './components/Accordion';
import { TextInput, TextArea, SelectInput, CheckboxGroup, SingleCheckbox } from './components/FormElements';
import { runDeepAnalysis, runGroundedAnalysis } from './services/geminiService';
import * as storageService from './services/storageService';
import OutputDisplay from './components/OutputDisplay';
import ChatBot from './components/ChatBot';
import SavedAnalysesModal from './components/SavedAnalysesModal';
import { templates } from './templates';

// Helper to define and get the consistent initial state for the form
const getInitialFormData = (): FormData => {
    const initialData: FormData = {};
    sections.forEach(section => {
        initialData[section.id] = {};
    });
    // Set defaults
    if (initialData['quality_guardrails']) {
        initialData['quality_guardrails']['guardrail_preset'] = 'custom';
    }
    return initialData;
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(getInitialFormData());
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');
  const [groundingChunks, setGroundingChunks] = useState<GroundingChunk[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<'deep' | 'grounded' | null>(null);
  const [lastAnalysisType, setLastAnalysisType] = useState<'deep' | 'grounded' | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [error, setError] = useState('');
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // New state to provide stable context to ChatBot to prevent constant resets while typing
  const [chatContext, setChatContext] = useState<{ prompt: string; response: string } | undefined>(undefined);

  // Computed property for the currently active template object
  const activeTemplate = templates.find(t => t.id === selectedTemplate);

  useEffect(() => {
    setSavedAnalyses(storageService.getSavedAnalyses());
  }, []);

  const handleInputChange = useCallback((section: string, field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      }
    }));
  }, []);

  const handleTemplateChange = (templateId: string) => {
      const template = templates.find(t => t.id === templateId);
      const formIsPristine = JSON.stringify(formData) === JSON.stringify(getInitialFormData());

      if (template) {
          const userConfirmed = formIsPristine || window.confirm(`Loading the "${template.name}" template will overwrite current form settings. Continue?`);
          
          if (userConfirmed) {
              // --- ROBUST STATE MERGING ---
              // Start with the complete initial state structure to ensure all sections are present.
              const newFormData = getInitialFormData();

              // Deep merge the template data over the defaults.
              const templateData = template.data;
              for (const sectionId in templateData) {
                  newFormData[sectionId] = {
                      ...(newFormData[sectionId] || {}),
                      ...(templateData[sectionId] as object),
                  };
              }

              // Preserve key context fields from the user's current input.
              const currentContext = formData.context || {};
              const preservedContext: Partial<FormData['context']> = {};
              if (currentContext.project) preservedContext.project = currentContext.project;
              if (currentContext.ticker) preservedContext.ticker = currentContext.ticker;
              if (currentContext.chain) preservedContext.chain = currentContext.chain;

              newFormData.context = {
                  ...(newFormData.context || {}),
                  ...preservedContext,
              };

              setFormData(newFormData);
              setSelectedTemplate(templateId);
              
              // Clear previous results for a clean start
              setGeneratedPrompt('');
              setGeminiResponse('');
              setGroundingChunks([]);
              setError('');
              setChatContext(undefined);
          } else {
             // If user cancels, force the dropdown to snap back to the actual current state.
             // React state update handles the reversion in the UI.
             setSelectedTemplate(current => current);
          }
      } else {
          // If selecting placeholder, do nothing or clear? 
          // Current logic is handled by handleClearForm, so this branch might just reset the select.
          if (templateId === "") {
              // Intentionally left blank to allow de-selection if needed, currently managed by separate Clear button
          }
      }
  };

  const handleClearForm = () => {
      if (window.confirm("Are you sure you want to clear the entire form and all results?")) {
          setFormData(getInitialFormData());
          setSelectedTemplate('');
          setGeneratedPrompt('');
          setGeminiResponse('');
          setGroundingChunks([]);
          setError('');
          setChatContext(undefined);
      }
  }

  const convertTimeInputToSeconds = (input: string): string => {
      // Normalize input: remove spaces, lowercase
      const cleanInput = input.toLowerCase().replace(/\s/g, '');
      
      // Regex to match number and optional unit (supporting various forms)
      const match = cleanInput.match(/^(\d+(?:\.\d+)?)(s|sec|secs|second|seconds|m|min|mins|minute|minutes|h|hr|hrs|hour|hours|d|day|days)?$/);
      
      if (match) {
          const val = parseFloat(match[1]);
          const unit = match[2];
          let seconds = val;
          
          if (!unit || unit.startsWith('s')) {
              seconds = val;
          } else if (unit.startsWith('m')) {
              seconds = val * 60;
          } else if (unit.startsWith('h')) {
              seconds = val * 3600;
          } else if (unit.startsWith('d')) {
              seconds = val * 86400;
          }
          
          return `${Math.round(seconds)} seconds`;
      }
      return input;
  };

  const generatePromptText = () => {
    const projectName = formData.context?.project as string;
    
    // Logic: If a template is active, prioritize it in the title
    let title = '## Comprehensive Crypto Research Brief';
    if (activeTemplate) {
        title = `## Research Brief: ${activeTemplate.name}`;
        if (projectName) title += ` - ${projectName}`;
    } else if (projectName) {
        title = `## Crypto Research Brief: ${projectName}`;
    }
    
    let prompt = `${title}\n\n`;

    sections.forEach(section => {
        const sectionData = formData[section.id];
        // If section data is empty, we might skip it, but getInitialFormData ensures the object exists.
        // We check if it has any non-empty keys
        const hasContent = sectionData && Object.values(sectionData).some(v => Array.isArray(v) ? v.length > 0 : !!v);
        if (!sectionData || !hasContent) return;

        // Special handling for quality_guardrails section based on preset
        if (section.id === 'quality_guardrails') {
            const preset = sectionData.guardrail_preset;
            
            // Base Logic based on preset
            if (preset === 'strict') {
                prompt += `### ${section.title}\n\n`;
                prompt += `**Strict Guardrail Defaults:** ENABLED. The following is a non-negotiable pre-flight check to ensure data integrity. Halt execution if any check fails.\n\n`;
                prompt += `#### Freshness Policy (Hard Fail if Stale)\n`;
                prompt += `*   **Price Data:** Max age 30 seconds.\n`;
                prompt += `*   **On-chain Data:** Max age 10 minutes.\n`;
                prompt += `*   **Derivatives/Funding Data:** Max age 10 minutes.\n`;
                prompt += `*   **News/Social Data:** Max age 30 minutes.\n\n`;
                prompt += `#### Quorum & Deviation Policy\n`;
                prompt += `*   **Minimum Sources:** 2 for all critical data points (price, supply).\n`;
                prompt += `*   **Aggregation Method:** Use the median value after collecting from sources.\n`;
                prompt += `*   **Max Price Deviation:** 0.25% between sources.\n`;
                prompt += `*   **Refetch Policy:** If deviation is exceeded, add a third source, re-query all, and use the median. If failure persists, abort.\n\n`;
                prompt += `#### Accuracy Guard\n`;
                prompt += `*   **Checks:** Spot price must be within the 24h high/low range, bid-ask spread must be reasonable (e.g., <= 0.5%), last trade recency must be <= 60s.\n`;
                prompt += `*   **Failure Action:** If ANY check fails, re-query all sources. If still failing, ABORT with a full audit log.\n\n`;
            } else if (preset === 'loose') {
                prompt += `### ${section.title}\n\n`;
                prompt += `**Web Scraping Guardrails (Looser):** ENABLED. The following is a set of relaxed guidelines for data integrity, suitable for public web sources. Best-effort checks will be performed.\n\n`;
                prompt += `#### Freshness Policy (Best Effort)\n`;
                prompt += `*   **Price Data:** Max age 10 minutes (600s).\n`;
                prompt += `*   **On-chain Data:** Max age 60 minutes (3600s).\n`;
                prompt += `*   **News/Social Data:** Max age 60 minutes (3600s).\n\n`;
                prompt += `#### Quorum & Deviation Policy\n`;
                prompt += `*   **Minimum Sources:** 2 for critical data points.\n`;
                prompt += `*   **Aggregation Method:** Use the median value.\n`;
                prompt += `*   **Max Price Deviation:** 5% between sources.\n`;
                prompt += `*   **Refetch Policy:** If deviation is exceeded, note the discrepancy in the audit log.\n\n`;
            } else {
                // Custom logic
                const fieldEntries = section.fields
                    .map(field => {
                        // Don't reprint selector or the standalone boolean in the general list
                        if (field.id === 'guardrail_preset' || field.id === 'include_provenance_table') {
                            return null;
                        }

                        let value = sectionData[field.id];
                        if (value && (!Array.isArray(value) || value.length > 0)) {
                            let displayValue = value;
                            
                            // Convert freshness fields to seconds for the LLM
                            if (field.id.endsWith('_freshness') && typeof value === 'string') {
                                displayValue = convertTimeInputToSeconds(value);
                            }

                            if (field.type === 'checkbox') {
                                return `*   **${field.label}:** ${(value as string[]).join(', ')}`;
                            } else if (field.type === 'single_checkbox') {
                                return `*   **${field.label}:** ${value ? 'Enabled' : 'Disabled'}`;
                            } else {
                                return `*   **${field.label}:** ${displayValue}`;
                            }
                        }
                        return null;
                    })
                    .filter(Boolean);

                if (fieldEntries.length > 0) {
                    prompt += `### ${section.title}\n\n`;
                    prompt += fieldEntries.join('\n') + '\n\n';
                }
            }

            // Common logic for Provenance Table (Added to all modes if checked)
            if (sectionData.include_provenance_table) {
                // Ensure header exists if we skipped it in Custom mode due to no other fields
                if (preset === 'custom' && prompt.lastIndexOf(`### ${section.title}`) === -1) {
                     prompt += `### ${section.title}\n\n`;
                }
                prompt += `#### Data Provenance & Audit\n`;
                prompt += `*   **Requirement:** Embed a detailed data provenance table in the final report.\n`;
                prompt += `*   **Columns:** Metric, Final Value, Source(s) Used, Timestamp (UTC), Confidence Score/Notes.\n`;
                prompt += `*   **Validation:** Explicitly flag any data points where sources deviated significantly or data was stale.\n\n`;
            }
            
            return; // End of quality_guardrails processing
        }

        // Default logic for all other sections
        const fieldEntries = section.fields
            .map(field => {
                const value = sectionData[field.id];
                if (value && (!Array.isArray(value) || value.length > 0)) {
                    if (field.type === 'checkbox') {
                        return `*   **${field.label}:** ${(value as string[]).join(', ')}`;
                    } else if (field.type === 'single_checkbox') {
                        return `*   **${field.label}:** ${value ? 'Enabled' : 'Disabled'}`;
                    } else {
                        return `*   **${field.label}:** ${value}`;
                    }
                }
                return null;
            })
            .filter(Boolean);

        if (fieldEntries.length > 0) {
            prompt += `### ${section.title}\n\n`;
            prompt += fieldEntries.join('\n') + '\n\n';
        }
    });
    return prompt;
  };

  const handleGeneratePrompt = () => {
    const promptText = generatePromptText();
    setGeneratedPrompt(promptText);
    
    // Update chat context with the new prompt. 
    // We do NOT pass 'geminiResponse' here as it is likely stale relative to this new prompt.
    setChatContext({ prompt: promptText, response: '' });
    
    setGeminiResponse('');
    setGroundingChunks([]);
    setError('');
  };

  const handleSubmitToGemini = async (type: 'deep' | 'grounded') => {
    if (!generatedPrompt) {
      alert("Please generate the prompt first.");
      return;
    }
    setIsLoading(true);
    setActiveAnalysis(type);
    setLastAnalysisType(type);
    setError('');
    setGeminiResponse('');
    setGroundingChunks([]);
    try {
      const response = type === 'deep'
        ? await runDeepAnalysis(generatedPrompt)
        : await runGroundedAnalysis(generatedPrompt);

      setGeminiResponse(response.text);
      
      // Update chat context to include the new response
      setChatContext({ prompt: generatedPrompt, response: response.text });

      if (response.groundingChunks) {
        setGroundingChunks(response.groundingChunks);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
      setActiveAnalysis(null);
    }
  };

  const handleSave = (saveType: 'prompt' | 'analysis') => {
      if (!generatedPrompt) {
          alert('You must generate a prompt before saving.');
          return;
      }

      if (saveType === 'analysis' && !geminiResponse) {
          alert('No analysis results to save. Run the analysis first.');
          return;
      }

      const projectName = formData.context?.project as string || 'Untitled';
      const typeLabel = saveType === 'prompt' ? 'Prompt' : 'Analysis';
      
      const newAnalysis: SavedAnalysis = {
          id: Date.now().toString(),
          title: `${projectName} ${typeLabel}`,
          createdAt: new Date().toISOString(),
          formData,
          generatedPrompt,
          // Only include response if saving a full analysis
          ...(saveType === 'analysis' ? { 
              geminiResponse, 
              groundingChunks, 
              analysisType: lastAnalysisType || undefined 
          } : {})
      };

      storageService.saveAnalysis(newAnalysis);
      setSavedAnalyses(storageService.getSavedAnalyses());
      alert(`${typeLabel} saved successfully!`);
  };

  const handleLoadAnalysis = (analysis: SavedAnalysis) => {
    setFormData(analysis.formData);
    setGeneratedPrompt(analysis.generatedPrompt);
    
    if (analysis.geminiResponse) {
        // It's a full analysis
        setGeminiResponse(analysis.geminiResponse);
        setGroundingChunks(analysis.groundingChunks || []);
        setLastAnalysisType(analysis.analysisType || null);
        setChatContext({ prompt: analysis.generatedPrompt, response: analysis.geminiResponse });
    } else {
        // It's just a prompt save
        setGeminiResponse('');
        setGroundingChunks([]);
        setLastAnalysisType(null);
        setChatContext({ prompt: analysis.generatedPrompt, response: '' });
    }
    
    setError('');
    setIsSavedModalOpen(false);
    setSelectedTemplate('');
  };

  const handleDeleteAnalysis = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
        storageService.deleteAnalysis(id);
        setSavedAnalyses(storageService.getSavedAnalyses());
    }
  };

  const renderField = (sectionId: string, field: any) => {
    const value = formData[sectionId]?.[field.id];
    // `value` is handled per-component, so it's removed from commonProps to avoid type conflicts.
    const commonProps = {
      id: `${sectionId}-${field.id}`,
      label: field.label,
      placeholder: field.placeholder,
      description: field.description,
      onChange: (val: string | boolean | string[]) => handleInputChange(sectionId, field.id, val),
    };

    switch (field.type) {
      case 'text':
        return <TextInput {...commonProps} value={value as string || ''} />;
      case 'textarea':
        return <TextArea {...commonProps} value={value as string || ''} />;
      case 'select':
        return <SelectInput {...commonProps} options={field.options!} value={value as string || ''} />;
      case 'checkbox':
        return <CheckboxGroup {...commonProps} options={field.options!} value={value as string[] || []} />;
      case 'single_checkbox':
        return <SingleCheckbox {...commonProps} value={value as boolean || false} />;
      default:
        return null;
    }
  };
  
  const renderLoadingButton = (text: string) => (
    <>
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {text}
    </>
  );

  // Helper to estimate tokens (roughly 4 chars per token)
  const estimateTokens = (text: string) => Math.ceil(text.length / 4);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
            Crypto Intelligence
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Craft expert-level research prompts and get instant AI-powered analysis.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Form */}
          <div className="flex flex-col space-y-4">
             {sections.map(section => {
                // Relevance Logic:
                // If a template is active, a section is "relevant" if it is defined in the template data,
                // or if it's the fundamental 'context' section.
                // If no template is active, we treat only 'context' as primary open, or all as relevant.
                const isRelevant = !activeTemplate 
                    ? section.id === 'context' 
                    : (section.id === 'context' || (activeTemplate.data && Object.prototype.hasOwnProperty.call(activeTemplate.data, section.id)));
                
                // Styling to de-emphasize sections that aren't part of the active template
                const containerClass = isRelevant 
                    ? "transition-opacity duration-300 opacity-100" 
                    : "transition-opacity duration-300 opacity-60 hover:opacity-100";

                return (
                  <div key={`${section.id}-${selectedTemplate}`} className={containerClass}>
                    <Accordion title={section.title} defaultOpen={isRelevant}>
                      <div className="space-y-4">
                        {section.fields.map(field => {
                          // Special rendering logic for quality_guardrails
                          if (section.id === 'quality_guardrails') {
                            const preset = formData.quality_guardrails?.guardrail_preset || 'custom';
                            // Hide granular fields if a preset is selected, but always show the preset selector AND the provenance checkbox
                            if (preset !== 'custom' && field.id !== 'guardrail_preset' && field.id !== 'include_provenance_table') {
                              return null;
                            }
                          }
                          return (
                            <div key={field.id}>
                              {renderField(section.id, field)}
                            </div>
                          );
                        })}
                      </div>
                    </Accordion>
                  </div>
                );
            })}
          </div>

          {/* Right Column: Output */}
          <div className="flex flex-col space-y-4 sticky top-8 self-start">
             <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-purple-400">Actions</h2>
                 <div className="flex flex-col gap-4">
                    <div className="mb-2">
                        <label htmlFor="template-selector" className="block mb-2 text-sm font-medium text-gray-300">
                            Load a Research Template
                        </label>
                        <div className="flex gap-2">
                            <select
                                id="template-selector"
                                value={selectedTemplate}
                                onChange={(e) => handleTemplateChange(e.target.value)}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
                            >
                                <option value="">Select a template...</option>
                                {templates.map(template => (
                                    <option key={template.id} value={template.id}>
                                        {template.name}
                                    </option>
                                ))}
                            </select>
                            <button 
                                onClick={handleClearForm}
                                title="Clear Form"
                                className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-gray-200 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                        {activeTemplate && (
                            <div className="mt-3 p-3 bg-gray-700/50 border border-gray-600 rounded-md text-sm animate-fadeIn">
                                <p className="font-bold text-purple-300 mb-1 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    {activeTemplate.name}
                                </p>
                                <p className="text-gray-300 italic leading-relaxed">{activeTemplate.description}</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleGeneratePrompt}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        1. Generate Prompt
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleSubmitToGemini('deep')}
                        disabled={isLoading || !generatedPrompt}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                      >
                        {isLoading && activeAnalysis === 'deep' ? renderLoadingButton('Analyzing...') : '2a. Deep Analysis (Pro)'}
                      </button>
                      <button
                        onClick={() => handleSubmitToGemini('grounded')}
                        disabled={isLoading || !generatedPrompt}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                      >
                        {isLoading && activeAnalysis === 'grounded' ? renderLoadingButton('Searching...') : '2b. Live Data Analysis (Flash)'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => handleSave('prompt')}
                            disabled={!generatedPrompt}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                        >
                            Save Prompt Config
                        </button>
                        <button
                            onClick={() => handleSave('analysis')}
                            disabled={!geminiResponse || isLoading}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                        >
                            Save Analysis
                        </button>
                    </div>
                    
                    <button
                        onClick={() => setIsSavedModalOpen(true)}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center text-sm"
                    >
                        Saved Items ({savedAnalyses.length})
                    </button>
                </div>
            </div>

            {generatedPrompt && !geminiResponse && !error && (
               <div className="bg-gray-800 p-4 rounded-lg shadow-lg animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-purple-400">Generated Prompt (Editable)</h3>
                   <div className="flex items-center gap-4">
                       <span className="text-xs text-gray-400 font-mono" title="Estimated token count">
                           ~{estimateTokens(generatedPrompt)} tokens
                       </span>
                       <button
                        onClick={() => {navigator.clipboard.writeText(generatedPrompt); alert("Prompt copied to clipboard!");}}
                        className="text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded transition-colors"
                      >
                        Copy
                      </button>
                   </div>
                </div>
                <textarea
                  value={generatedPrompt}
                  onChange={(e) => setGeneratedPrompt(e.target.value)}
                  className="w-full h-96 bg-gray-900 text-gray-300 font-mono text-sm p-4 rounded-md border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-y"
                  spellCheck={false}
                />
                <p className="text-xs text-gray-500 mt-2">
                  * You can edit this prompt manually before running the analysis.
                  <br/>
                  * <span className="text-yellow-500">Note:</span> If you edit the prompt here, remember to click "Generate Prompt" again if you want the Chat Assistant to be aware of your latest changes.
                </p>
              </div>
            )}
            
            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 p-4 rounded-lg">
                <h3 className="font-bold">Error</h3>
                <p>{error}</p>
              </div>
            )}

            {geminiResponse && (
              <OutputDisplay title="Gemini Analysis" text={geminiResponse} isMarkdown={true} groundingChunks={groundingChunks} />
            )}
          </div>
        </div>
      </div>
      
      <SavedAnalysesModal 
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        analyses={savedAnalyses}
        onLoad={handleLoadAnalysis}
        onDelete={handleDeleteAnalysis}
      />

      {isChatOpen && (
        <ChatBot 
            onClose={() => setIsChatOpen(false)} 
            context={chatContext}
        />
      )}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 z-40"
          aria-label="Open Chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.08-3.239A8.962 8.962 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.416 11.455A6.962 6.962 0 004 10c0-2.651 2.418-4.815 5.333-4.815 2.916 0 5.333 2.164 5.333 4.815 0 1.41-.65 2.68-1.683 3.555L14.667 15l-1.933-1.45A6.963 6.963 0 0110 14.182c-1.331 0-2.553-.37-3.584-.973l-1 .598z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
