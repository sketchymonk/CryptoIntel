import { FormData } from '../types';
import { sections } from '../constants';

const formatSectionTitle = (title: string) => `### ${title}\n\n`;

const formatField = (label: string, value: string | string[] | boolean) => {
  if (Array.isArray(value)) {
     return value.length > 0 ? `*   **${label}:** ${value.join(', ')}` : null;
  }
  if (typeof value === 'boolean') {
      return value ? `*   **${label}:** Enabled` : null;
  }
  if (!value) return null;
  return `*   **${label}:** ${value}`;
};

const getGuardrailPrompt = (preset: string, title: string) => {
    if (preset === 'strict') {
        return `${formatSectionTitle(title)}
**Strict Guardrail Defaults:** ENABLED. Halt execution if data integrity checks fail.

#### Freshness & Quorum
*   **Price/On-chain:** Max age 30s - 10m.
*   **Min Sources:** 2 for critical data.
*   **Aggregation:** Median.
*   **Action:** Hard fail on deviation > 0.25%.

#### Audit
*   Embed a data provenance table with source values and timestamps.
\n`;
    }
    if (preset === 'loose') {
         return `${formatSectionTitle(title)}
**Web Scraping Guardrails:** ENABLED. Best-effort data integrity.

#### Freshness & Quorum
*   **Price/On-chain:** Max age 10m - 60m.
*   **Min Sources:** 2.
*   **Action:** Note discrepancies in audit log.

#### Audit
*   Embed provenance table and note quality issues.
\n`;
    }
    return '';
};

export const generatePromptFromData = (formData: FormData): string => {
  const projectName = (formData.context?.project as string) || 'Untitled Project';
  let prompt = `## Crypto Research Brief: ${projectName}\n\n`;

  sections.forEach((section) => {
      const sectionData = formData[section.id];
      if (!sectionData) return;

      // Handle Guardrails Special Logic
      if (section.id === 'quality_guardrails') {
          const preset = sectionData.guardrail_preset as string;
          if (preset && preset !== 'custom') {
              prompt += getGuardrailPrompt(preset, section.title);
              return;
          }
      }

      // Standard Fields
      const lines = section.fields.map(field => {
          // Skip the preset selector itself in output if not custom
          if (field.id === 'guardrail_preset') return null;
          
          const value = sectionData[field.id];
          return formatField(field.label, value as string | string[] | boolean);
      }).filter(Boolean);

      if (lines.length > 0) {
          prompt += formatSectionTitle(section.title);
          prompt += lines.join('\n') + '\n\n';
      }
  });

  return prompt;
};