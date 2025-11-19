import React, { useState, useCallback, useEffect } from 'react';
import { sections } from './constants';
import { FormData, GroundingChunk, SavedAnalysis } from './types';
import Accordion from './components/Accordion';
import { TextInput, TextArea, SelectInput, CheckboxGroup, SingleCheckbox } from './components/FormElements';
import { runDeepAnalysis, runGroundedAnalysis } from './services/geminiService';
import * as storageService from './services/storageService';
import { generatePromptFromData } from './utils/promptUtils';
import OutputDisplay from './components/OutputDisplay';
import ChatBot from './components/ChatBot';
import SavedAnalysesModal from './components/SavedAnalysesModal';
import { templates } from './templates';

const getInitialFormData = (): FormData => ({
  quality_guardrails: { guardrail_preset: 'custom' }
});

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

  useEffect(() => {
    setSavedAnalyses(storageService.getSavedAnalyses());
  }, []);

  const updateField = useCallback((sectionId: string, fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [fieldId]: value,
      }
    }));
  }, []);

  const loadTemplate = (templateId: string) => {
    if (!templateId) {
        if (window.confirm('Clear form? This will reset all fields.')) {
            setFormData(getInitialFormData());
            setSelectedTemplate('');
            resetResults();
        }
        return;
    }

    const template = templates.find(t => t.id === templateId);
    if (template) {
        if (window.confirm(`Load template "${template.name}"? This will overwrite current form data.`)) {
            const newFormData = { ...getInitialFormData(), ...template.data };
            // Preserve project name if it exists, for user convenience
            if (formData.context?.project) {
                newFormData.context = { ...newFormData.context, project: formData.context.project };
            }
            
            setFormData(newFormData as FormData);
            setSelectedTemplate(templateId);
            resetResults();
        }
    }
  };
  
  const resetResults = () => {
      setGeneratedPrompt('');
      setGeminiResponse('');
      setGroundingChunks([]);
      setError('');
  };

  const handleGeneratePrompt = () => {
    setGeneratedPrompt(generatePromptFromData(formData));
    setGeminiResponse('');
    setError('');
  };

  const handleAnalysis = async (type: 'deep' | 'grounded') => {
    if (!generatedPrompt) return;
    
    setIsLoading(true);
    setActiveAnalysis(type);
    setLastAnalysisType(type);
    setError('');
    setGeminiResponse('');
    setGroundingChunks([]);

    try {
      const result = type === 'deep' 
        ? await runDeepAnalysis(generatedPrompt)
        : await runGroundedAnalysis(generatedPrompt);
      
      setGeminiResponse(result.text);
      if (result.groundingChunks) setGroundingChunks(result.groundingChunks);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Analysis failed. Please check your API key and internet connection.');
    } finally {
      setIsLoading(false);
      setActiveAnalysis(null);
    }
  };

  const handleSave = () => {
      if (!geminiResponse) return;
      const analysis: SavedAnalysis = {
          id: Date.now().toString(),
          title: `${(formData.context?.project as string) || 'Untitled'} - ${lastAnalysisType === 'deep' ? 'Deep Analysis' : 'Live Check'}`,
          createdAt: new Date().toISOString(),
          formData,
          generatedPrompt,
          geminiResponse,
          groundingChunks,
          analysisType: lastAnalysisType!
      };
      storageService.saveAnalysis(analysis);
      setSavedAnalyses(storageService.getSavedAnalyses());
      alert('Analysis saved successfully!');
  };

  const renderLoadingSpinner = () => (
     <svg className="animate-spin h-5 w-5 text-white inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
     </svg>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans pb-20">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
            Crypto Intelligence
          </h1>
          <p className="mt-3 text-gray-400 text-lg">Advanced AI-Powered Research & Audit Platform</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 shadow-sm">
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Select Research Template</label>
                <select 
                    className="w-full bg-gray-700 border border-gray-600 rounded p-3 focus:ring-2 focus:ring-purple-500 outline-none text-white transition-shadow"
                    value={selectedTemplate}
                    onChange={(e) => loadTemplate(e.target.value)}
                >
                    <option value="">-- Custom / Blank --</option>
                    {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
            </div>

            {sections.map(section => (
              <Accordion key={section.id} title={section.title} sectionId={section.id}>
                <div className="space-y-5">
                  {section.fields.map(field => {
                    // Logic to hide granular fields if preset is active in the guardrail section
                    const isGuardrailSection = section.id === 'quality_guardrails';
                    const preset = formData.quality_guardrails?.guardrail_preset || 'custom';
                    if (isGuardrailSection && preset !== 'custom' && field.id !== 'guardrail_preset') return null;

                    const props = {
                        id: `${section.id}-${field.id}`,
                        label: field.label,
                        sectionId: section.id,
                        fieldId: field.id,
                        onChange: (val: any) => updateField(section.id, field.id, val)
                    };
                    const val = formData[section.id]?.[field.id];

                    if (field.type === 'text') return <TextInput key={field.id} {...props} value={val as string || ''} placeholder={field.placeholder} />;
                    if (field.type === 'textarea') return <TextArea key={field.id} {...props} value={val as string || ''} placeholder={field.placeholder} />;
                    if (field.type === 'select') return <SelectInput key={field.id} {...props} value={val as string || ''} options={field.options!} />;
                    if (field.type === 'checkbox') return <CheckboxGroup key={field.id} {...props} value={val as string[] || []} options={field.options!} />;
                    if (field.type === 'single_checkbox') return <SingleCheckbox key={field.id} {...props} value={val as boolean || false} description={field.description} />;
                    return null;
                  })}
                </div>
              </Accordion>
            ))}
          </div>

          {/* RIGHT COLUMN: ACTIONS & OUTPUT */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-6 space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 space-y-5">
                    <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3">Control Panel</h2>
                    
                    <button 
                        onClick={handleGeneratePrompt}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        1. Generate Research Prompt
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => handleAnalysis('deep')}
                            disabled={!generatedPrompt || isLoading}
                            className={`flex items-center justify-center py-4 px-2 rounded-lg font-bold transition-all shadow-md
                                ${!generatedPrompt || isLoading ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 text-white hover:shadow-purple-500/20'}
                            `}
                        >
                            Deep Analysis 
                            {isLoading && activeAnalysis === 'deep' && renderLoadingSpinner()}
                        </button>
                        <button
                            onClick={() => handleAnalysis('grounded')}
                            disabled={!generatedPrompt || isLoading}
                            className={`flex items-center justify-center py-4 px-2 rounded-lg font-bold transition-all shadow-md
                                ${!generatedPrompt || isLoading ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-emerald-500/20'}
                            `}
                        >
                            Live Data Check
                            {isLoading && activeAnalysis === 'grounded' && renderLoadingSpinner()}
                        </button>
                    </div>

                    <div className="pt-4 border-t border-gray-700 flex gap-3">
                         <button 
                            onClick={handleSave}
                            disabled={!geminiResponse}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white py-2 rounded transition-colors font-medium"
                        >
                            Save Results
                        </button>
                        <button 
                            onClick={() => setIsSavedModalOpen(true)}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition-colors font-medium"
                        >
                            Load Saved ({savedAnalyses.length})
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg shadow-lg animate-fade-in">
                        <strong className="block font-bold mb-1">Analysis Error</strong>
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                {/* Output Section */}
                <div className="space-y-4">
                    {generatedPrompt && !geminiResponse && (
                        <OutputDisplay title="Generated Prompt Preview" text={generatedPrompt} />
                    )}

                    {geminiResponse && (
                        <OutputDisplay 
                            title={activeAnalysis === 'deep' ? "Deep Analysis Report" : "Live Data Analysis"} 
                            text={geminiResponse} 
                            isMarkdown={true} 
                            groundingChunks={groundingChunks}
                        />
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>

      <SavedAnalysesModal 
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        analyses={savedAnalyses}
        onLoad={(a) => {
            setFormData(a.formData);
            setGeneratedPrompt(a.generatedPrompt);
            setGeminiResponse(a.geminiResponse);
            setGroundingChunks(a.groundingChunks || []);
            setIsSavedModalOpen(false);
        }}
        onDelete={(id) => {
            storageService.deleteAnalysis(id);
            setSavedAnalyses(storageService.getSavedAnalyses());
        }}
      />

      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
      {!isChatOpen && (
        <button 
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 bg-purple-600 p-4 rounded-full shadow-xl hover:bg-purple-500 hover:shadow-purple-500/40 transition-all hover:scale-110 z-50 group"
            aria-label="Open Assistant"
        >
            <svg className="w-8 h-8 text-white group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        </button>
      )}
    </div>
  );
};

export default App;