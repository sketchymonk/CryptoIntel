
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from '../types';

// Initialize the client with the API key from the environment.
const getAI = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing. Please provide a valid API key.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Runs a deep analysis using gemini-3-pro-preview with reasoning capabilities.
 * This leverages the 'thinkingConfig' to allow the model to deliberate on complex crypto topics.
 * We set a high thinking budget to ensure depth, and a larger maxOutputTokens to accommodate the response.
 */
export async function runDeepAnalysis(prompt: string): Promise<AnalysisResult> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        // The effective token limit for the response is `maxOutputTokens` minus the `thinkingBudget`.
        // We allocate 16k tokens for thinking and leave ~49k for the final output.
        thinkingConfig: { thinkingBudget: 16000 },
        maxOutputTokens: 65536,
      },
    });

    const text = response.text;
    if (!text) {
       throw new Error("The model did not return any text. The response might have been filtered.");
    }

    return { text };
  } catch (error) {
    console.error("Deep Analysis failed:", error);
    throw new Error(error instanceof Error ? error.message : "Deep analysis failed due to an unknown error.");
  }
}

/**
 * Runs a grounded analysis using gemini-2.5-flash with Google Search.
 * This allows the model to fetch real-time data for price, news, and sentiment.
 * Note: responseMimeType and responseSchema must NOT be set when using googleSearch.
 */
export async function runGroundedAnalysis(prompt: string): Promise<AnalysisResult> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // Extract grounding metadata (search sources)
    const candidate = response.candidates?.[0];
    const groundingChunks = candidate?.groundingMetadata?.groundingChunks || [];
    const text = response.text || "No text response generated.";

    // Cast groundingChunks to any[] to satisfy the interface if strict types vary slightly from SDK
    return { 
        text, 
        groundingChunks: groundingChunks as any[] 
    };
  } catch (error) {
    console.error("Grounded Analysis failed:", error);
    throw new Error(error instanceof Error ? error.message : "Grounded analysis failed due to an unknown error.");
  }
}

// --- Chat Service ---

/**
 * Creates a new chat session.
 * We do not persist the instance globally to ensure the UI state (which resets on open) 
 * matches the chat context.
 */
export function createChatSession(): Chat {
    const ai = getAI();
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are an expert crypto research assistant. Help the user refine their research prompts, explain complex DeFi concepts, or analyze specific tokens."
        }
    });
}

/**
 * Sends a message to the chat session and returns a stream.
 */
export async function sendMessageStream(
    chat: Chat,
    message: string
): Promise<AsyncIterable<GenerateContentResponse>> {
    return chat.sendMessageStream({ message });
}
