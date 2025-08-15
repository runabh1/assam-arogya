
'use server';
/**
 * @fileOverview Implements the predictive health AI for assessing health risks.
 *
 * - predictiveHealthAi - Analyzes symptoms and photos for risk prediction.
 * - PredictiveHealthInput - Input schema for the function.
 * - PredictiveHealthOutput - Output schema for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveHealthInputSchema = z.object({
  assessmentType: z.enum(['oralCancer', 'heartAttack']),
  symptoms: z
    .string()
    .describe('A description of the symptoms experienced by the user.'),
  history: z
    .string()
    .optional()
    .describe(
      'Relevant medical history for heart attack risk, e.g., smoking, high BP, family history.'
    ),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "For oral cancer risk, a photo of the mouth or gums as a data URI. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PredictiveHealthInput = z.infer<typeof PredictiveHealthInputSchema>;

const PredictiveHealthOutputSchema = z.object({
  riskLevel: z
    .enum(['Low', 'Medium', 'High'])
    .describe('The calculated risk level.'),
  recommendation: z
    .string()
    .describe('The recommended action for the user based on the risk level.'),
  isEmergency: z
    .boolean()
    .describe('Whether the situation is considered a high-risk emergency.'),
  suggestedSpecialist: z
    .string()
    .optional()
    .describe('The type of doctor to consult (e.g., Oncologist, Cardiologist).'),
});
export type PredictiveHealthOutput = z.infer<
  typeof PredictiveHealthOutputSchema
>;

export async function predictiveHealthAi(
  input: PredictiveHealthInput
): Promise<PredictiveHealthOutput> {
  return predictiveHealthAiFlow(input);
}

const promptTemplate = `You are an intelligent health risk predictor. Your task is to analyze the user's input to determine their risk for the specified 'assessmentType'. Follow the rules for the given assessment type precisely.

**Assessment Type:** {{{assessmentType}}}

**User Input:**
- Symptoms: {{{symptoms}}}
{{#if history}}- Medical History: {{{history}}}{{/if}}
{{#if photoDataUri}}- Photo: {{media url=photoDataUri}}{{/if}}

**Analysis Rules:**

*   **For 'oralCancer' assessment:**
    *   Analyze symptoms provided and the photo (if available).
    *   **CRITICAL RULE:** If the user provides no symptoms or says "no symptoms", and the photo appears to show healthy tissue without any clear, unambiguous signs like distinct red/white patches, lesions, or lumps, you MUST classify the risk as "Low". Do not escalate to Medium risk just because a photo was provided.
    *   **High Risk Criteria:** Multiple strong symptoms (e.g., persistent sores, lumps, difficulty swallowing) AND/OR the photo clearly shows visual signs of malignancy (e.g., distinct lesions, leukoplakia, erythroplakia).
        *   Output: { riskLevel: "High", recommendation: "High Risk of Oral Cancer. Please consult an oncologist immediately.", isEmergency: true, suggestedSpecialist: "Oncologist" }
    *   **Medium Risk Criteria:** One or two relevant symptoms (e.g., a persistent but minor ulcer) OR the photo shows a suspicious but not definitively malignant area (e.g., an unusual patch that requires professional examination).
        *   Output: { riskLevel: "Medium", recommendation: "Moderate Risk. Recommend a diagnostic checkup with an oncologist or dentist.", isEmergency: false, suggestedSpecialist: "Oncologist" }
    *   **Low Risk Criteria:** Symptoms do not correlate to oral cancer and the photo (if provided) shows healthy tissue.
        *   Output: { riskLevel: "Low", recommendation: "Low Risk. No urgent concern detected. Continue regular checkups.", isEmergency: false, suggestedSpecialist: undefined }

*   **For 'heartAttack' assessment:**
    *   Analyze symptoms like "chest pain", "sweating", "shortness of breath" and history like "smoking", "high BP", "family history".
    *   **High Risk Criteria:** Three or more danger symptoms (e.g., severe chest pain, radiating pain, shortness of breath) AND two or more history risk factors (e.g., smoking, high BP).
        *   Output: { riskLevel: "High", recommendation: "High Risk of Heart Attack. Emergency response recommended. Please call for help immediately.", isEmergency: true, suggestedSpecialist: "Cardiologist" }
    *   **Medium Risk Criteria:** Some danger symptoms are present, OR some significant history risk factors are present.
        *   Output: { riskLevel: "Medium", recommendation: "Moderate Risk. Schedule a consultation with a cardiologist soon.", isEmergency: false, suggestedSpecialist: "Cardiologist" }
    *   **Low Risk Criteria:** Minimal or no correlating symptoms or history risk factors.
        *   Output: { riskLevel: "Low", recommendation: "Low Risk. Stay monitored and follow a healthy lifestyle.", isEmergency: false, suggestedSpecialist: undefined }

Based on the provided 'assessmentType' and user input, generate the final risk level, recommendation, emergency status, and specialist.
`;

const predictiveHealthAiPrompt = ai.definePrompt({
    name: 'predictiveHealthAiPrompt',
    input: { schema: PredictiveHealthInputSchema },
    output: { schema: PredictiveHealthOutputSchema },
    prompt: promptTemplate,
});

const predictiveHealthAiFlow = ai.defineFlow(
  {
    name: 'predictiveHealthAiFlow',
    inputSchema: PredictiveHealthInputSchema,
    outputSchema: PredictiveHealthOutputSchema,
  },
  async input => {
    const {output} = await predictiveHealthAiPrompt(input);
    return output!;
  }
);
