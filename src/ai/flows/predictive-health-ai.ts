
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

const promptTemplate = `You are an intelligent health risk predictor. Analyze the user's input to determine their risk for either Oral Cancer or a Heart Attack. Follow the rules precisely.

Assessment Type: {{assessmentType}}

**IF Assessment Type is 'oralCancer':**
- Symptoms provided: {{symptoms}}
{{#if photoDataUri}}
- Photo of mouth/gums provided: {{media url=photoDataUri}}
- Analyze the image for visual signs of oral cancer (e.g., lesions, white/red patches, lumps).
{{else}}
- No photo provided for analysis.
{{/if}}
- **High Risk**: If multiple symptoms strongly correlate with oral cancer AND/OR the photo shows clear visual signs of a potential malignancy.
  - Recommendation: "High Risk of Oral Cancer. Please consult an oncologist immediately."
  - Set isEmergency to true.
  - Suggested Specialist: "Oncologist"
- **Medium Risk**: If 1-2 symptoms match OR the photo shows some visual abnormalities that require professional examination (e.g., persistent ulcer, unusual patch).
  - Recommendation: "Moderate Risk. Recommend a diagnostic checkup with an oncologist or dentist."
  - Set isEmergency to false.
  - Suggested Specialist: "Oncologist"
- **Low Risk**: If symptoms do not match AND (if a photo is provided) the photo shows normal, healthy tissue without any visual signs for concern. If no photo is provided, base the decision solely on the lack of correlating symptoms.
  - Recommendation: "Low Risk. No urgent concern detected. Continue regular checkups."
  - Set isEmergency to false.

**IF Assessment Type is 'heartAttack':**
- Symptoms provided: {{symptoms}}
- Medical History: {{history}}
- Analyze symptoms like "chest pain", "sweating", "shortness of breath" and history like "smoking", "high BP", "family history".

- **High Risk**: If ≥3 danger symptoms (e.g., severe chest pain, radiating pain, shortness of breath) AND ≥2 history risk factors (e.g., smoking, high BP).
  - Recommendation: "High Risk of Heart Attack. Emergency response recommended. Please call for help immediately."
  - Set isEmergency to true.
  - Suggested Specialist: "Cardiologist"
- **Medium Risk**: If some danger symptoms OR some history risk factors are present.
  - Recommendation: "Moderate Risk. Schedule a consultation with a cardiologist soon."
  - Set isEmergency to false.
  - Suggested Specialist: "Cardiologist"
- **Low Risk**: Minimal or no symptoms/history.
  - Recommendation: "Low Risk. Stay monitored and follow a healthy lifestyle."
  - Set isEmergency to false.

Return the final risk level, recommendation, emergency status, and specialist.
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
