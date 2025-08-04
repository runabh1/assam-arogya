
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
  language: z.string().optional().describe('The language for the response (e.g., "Assamese", "English"). Defaults to English if not provided.'),
});
export type AiHealthNavigatorInput = z.infer<typeof AiHealthNavigatorInputSchema>;

const AiHealthNavigatorOutputSchema = z.object({
  potentialDisease: z
    .string()
    .describe('The name of the potential disease or condition based on the symptoms.'),
  precautions: z
    .string()
    .describe('A list of immediate precautions the user can take.'),
  specialist: z
    .string()
    .describe('The type of specialist recommended (e.g., Cardiologist, Dermatologist, Veterinarian). This MUST always be in English.'),
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
  prompt: `You are an AI health navigator for both humans and domestic animals. A user will describe symptoms and their location. Your task is to identify a potential disease, suggest precautions, find the most relevant medical specialist, and suggest next steps.

IMPORTANT LANGUAGE INSTRUCTIONS:
- The 'specialist' field MUST always be in English (e.g., "Cardiology", "Dermatologist", "Veterinarian"). This is critical for system functionality.
- If the user's specified language is 'Assamese', all other fields ('potentialDisease', 'precautions', 'reasoning', and 'nextSteps') MUST be in Assamese.
- If the language is 'English' or not specified, the entire response should be in English.

Language for Response: {{{language}}}
Symptoms: {{{symptoms}}}
Location: {{{location}}}

Based on the symptoms, determine the potential disease, precautions, recommended specialist, reasoning, and the next appropriate action. This is not a formal medical diagnosis.
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
