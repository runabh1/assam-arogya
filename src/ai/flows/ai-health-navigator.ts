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
    .describe('A description of the symptoms experienced by the patient.'),
  location: z.string().describe('The location of the patient.'),
});
export type AiHealthNavigatorInput = z.infer<typeof AiHealthNavigatorInputSchema>;

const AiHealthNavigatorOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Suggestions for available appointments with relevant specialists.'),
});
export type AiHealthNavigatorOutput = z.infer<typeof AiHealthNavigatorOutputSchema>;

export async function aiHealthNavigator(input: AiHealthNavigatorInput): Promise<AiHealthNavigatorOutput> {
  return aiHealthNavigatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHealthNavigatorPrompt',
  input: {schema: AiHealthNavigatorInputSchema},
  output: {schema: AiHealthNavigatorOutputSchema},
  prompt: `You are an AI health navigator. A patient will describe their symptoms and location, and you will suggest available appointments with relevant specialists.

Symptoms: {{{symptoms}}}
Location: {{{location}}}

Suggestions:`, // Removed Handlebars 'each' helper
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
