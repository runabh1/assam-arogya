'use server';
/**
 * @fileOverview Implements the predictive health AI for generating smart alerts.
 *
 * - predictiveHealthAi - Generates alerts based on user symptoms and health logs.
 * - PredictiveHealthInput - Input schema for the function.
 * - PredictiveHealthOutput - Output schema for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveHealthInputSchema = z.object({
  symptoms: z.string().optional().describe('Current symptoms reported by the user.'),
  healthLog: z.string().describe('A log of the user\'s recent health data, including vitals, activities, and medication adherence.'),
  medicalHistory: z.string().describe('The user\'s relevant medical history (e.g., heart disease, diabetes, asthma).'),
});

export type PredictiveHealthInput = z.infer<typeof PredictiveHealthInputSchema>;

const PredictiveHealthOutputSchema = z.object({
  riskScore: z.number().describe('A numerical risk score (0-100) for conditions like heart attack, asthma, diabetes, etc., based on the input data.'),
  alerts: z.array(z.string()).describe('A list of smart alerts, such as missed medicine refills, critical symptoms to watch for, or recommendations to see a doctor.'),
  urgent: z.boolean().describe('Whether the situation requires an urgent alert to be sent to doctors or family members.'),
});

export type PredictiveHealthOutput = z.infer<typeof PredictiveHealthOutputSchema>;

export async function predictiveHealthAi(
  input: PredictiveHealthInput
): Promise<PredictiveHealthOutput> {
  return predictiveHealthAiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictiveHealthAiPrompt',
  input: {schema: PredictiveHealthInputSchema},
  output: {schema: PredictiveHealthOutputSchema},
  prompt: `You are an AI health assistant designed to provide predictive risk analysis and smart alerts. Analyze the provided health log, symptoms, and medical history to assess potential health risks.

  User Information:
  - Medical History: {{{medicalHistory}}}
  - Current Symptoms: {{{symptoms}}}
  - Health Log: {{{healthLog}}}

  Based on this information, calculate a risk score (0-100) for relevant chronic conditions and generate a list of actionable alerts. Set the 'urgent' flag to true if the data indicates a potentially critical situation that requires immediate attention from a doctor or family member.`,
});

const predictiveHealthAiFlow = ai.defineFlow(
  {
    name: 'predictiveHealthAiFlow',
    inputSchema: PredictiveHealthInputSchema,
    outputSchema: PredictiveHealthOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
