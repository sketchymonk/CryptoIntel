
export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'checkbox' | 'single_checkbox';
    placeholder?: string;
    options?: { value: string; label: string }[];
    description?: string;
}

export interface FormSection {
    id: string;
    title: string;
    fields: FormField[];
}

export interface FormData {
    [sectionId: string]: {
        [fieldId: string]: string | boolean | string[];
    };
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface AnalysisResult {
  text: string;
  groundingChunks?: GroundingChunk[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface SavedAnalysis {
  id: string;
  title: string;
  createdAt: string;
  formData: FormData;
  generatedPrompt: string;
  geminiResponse?: string; // Optional now
  groundingChunks?: GroundingChunk[];
  analysisType?: 'deep' | 'grounded'; // Optional now
}

export interface ResearchTemplate {
  id: string;
  name: string;
  description: string;
  data: Partial<FormData>;
}
