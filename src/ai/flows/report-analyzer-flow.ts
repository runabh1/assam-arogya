
'use server';

/**
 * @fileOverview An AI-powered report analyzer that provides a summary of medical reports from text or images.
 *
 * - analyzeReport - A function that handles the report analysis process.
 * - AnalyzeReportInput - The input type for the analyzeReport function.
 * - AnalyzeReportOutput - The return type for the analyzeReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeReportInputSchema = z.object({
  report: z
    .string()
    .describe('The content of the medical report to be analyzed, extracted from a file. This could be for a human or a domestic animal.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of a medical report for a human or a domestic animal, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.string().optional().describe('The language for the response (e.g., "Assamese", "English"). Defaults to English if not provided.'),
});
export type AnalyzeReportInput = z.infer<typeof AnalyzeReportInputSchema>;

const AnalyzeReportOutputSchema = z.object({
  summary: z.string().describe('A simplified summary of the report.'),
  keyFindings: z.array(z.string()).describe('A list of key findings from the report.'),
  potentialConcerns: z.array(z.string()).describe('A list of potential concerns or areas to discuss with a doctor or veterinarian.'),
});
export type AnalyzeReportOutput = z.infer<typeof AnalyzeReportOutputSchema>;

export async function analyzeReport(input: AnalyzeReportInput): Promise<AnalyzeReportOutput> {
  return analyzeReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeReportPrompt',
  input: {schema: AnalyzeReportInputSchema},
  output: {schema: AnalyzeReportOutputSchema},
  prompt: `You are an AI medical assistant for human and veterinary health. Your task is to analyze a medical report and provide a simplified summary.

**CRITICAL LANGUAGE INSTRUCTION:**
You MUST generate your response in the language specified in the "Language for Response" field.
- **IF Language for Response is 'Assamese', THEN your ENTIRE response for 'summary', 'keyFindings', and 'potentialConcerns' MUST be translated into Assamese.** This is a strict rule.
- IF Language for Response is 'English' or not specified, your entire response MUST be in English.

Language for Response: {{{language}}}

The following text and/or image was extracted from a user-uploaded medical report for a human or a domestic animal. Analyze it and provide the output in the specified format and language.

{{#if report}}
Medical Report Content:
{{{report}}}
{{/if}}

{{#if photoDataUri}}
Medical Report Photo:
{{media url=photoDataUri}}
{{/if}}
`,
});

const analyzeReportFlow = ai.defineFlow(
  {
    name: 'analyzeReportFlow',
    inputSchema: AnalyzeReportInputSchema,
    outputSchema: AnalyzeReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
