import { SavedAnalysis } from '../types';

const STORAGE_KEY = 'cryptoAnalysisApp_savedAnalyses';

/**
 * Retrieves all saved analyses from localStorage.
 * @returns An array of SavedAnalysis objects.
 */
export const getSavedAnalyses = (): SavedAnalysis[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      // Sort by most recent first
      const analyses: SavedAnalysis[] = JSON.parse(saved);
      return analyses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return [];
  } catch (error) {
    console.error("Failed to parse saved analyses from localStorage:", error);
    // In case of parsing error, clear the corrupted data
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

/**
 * Saves a new analysis to localStorage.
 * @param analysis The SavedAnalysis object to save.
 */
export const saveAnalysis = (analysis: SavedAnalysis) => {
  try {
    const analyses = getSavedAnalyses();
    // Prepend the new analysis to the beginning of the array
    const newAnalyses = [analysis, ...analyses];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnalyses));
  } catch (error) {
    console.error("Failed to save analysis to localStorage:", error);
    alert("Could not save the analysis. Your browser's storage might be full.");
  }
};

/**
 * Deletes an analysis from localStorage by its ID.
 * @param id The ID of the analysis to delete.
 */
export const deleteAnalysis = (id: string) => {
  try {
    const analyses = getSavedAnalyses();
    const newAnalyses = analyses.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnalyses));
  } catch (error) {
    console.error("Failed to delete analysis from localStorage:", error);
  }
};
