
'use server';

/**
 * @fileOverview An AI-powered health navigator that suggests appointments with relevant specialists.
 *
 * - aiHealthNavigator - A function that handles the health navigation process.
 * - AiHealthNavigatorInput - The input type for the aiHealthNavigator function.
 * - AiHealthNavigatorOutput - The return type for the aiHealthNavigator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiHealthNavigatorInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A description of the symptoms experienced by the patient, who could be a human or a domestic animal.'),
  location: z.string().describe('The location of the patient.'),
});
export type AiHealthNavigatorInput = z.infer<typeof AiHealthNavigatorInputSchema>;

const AiHealthNavigatorOutputSchema = z.object({
  specialist: z
    .string()
    .describe('The type of specialist recommended (e.g., Cardiologist, Dermatologist, Veterinarian).'),
  reasoning: z
    .string()
    .describe('A brief explanation for why this specialist is recommended based on the symptoms.'),
  nextSteps: z
    .string()
    .describe('Suggested next steps for the user, such as booking an appointment.'),
});
export type AiHealthNavigatorOutput = z.infer<typeof AiHealthNavigatorOutputSchema>;

export async function aiHealthNavigator(input: AiHealthNavigatorInput): Promise<AiHealthNavigatorOutput> {
  return aiHealthNavigatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHealthNavigatorPrompt',
  input: {schema: AiHealthNavigatorInputSchema},
  output: {schema: AiHealthNavigatorOutputSchema},
  prompt: `You are an AI health navigator for both humans and domestic animals. A user will describe symptoms and their location. Your task is to identify the most relevant medical specialist (for humans) or veterinarian (for domestic animals) and suggest next steps.

Symptoms: {{{symptoms}}}
Location: {{{location}}}

Based on the symptoms, determine the specialist, provide a brief reasoning, and suggest the next appropriate action. For example, if symptoms point to a heart issue, suggest a "Cardiologist". If it's a skin issue, suggest a "Dermatologist". If it's for an animal, suggest a "Veterinarian".
`,
});

const aiHealthNavigatorFlow = ai.defineFlow(
  {
    name: 'aiHealthNavigatorFlow',
    inputSchema: AiHealthNavigatorInputSchema,
    outputSchema: AiHealthNavigatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
