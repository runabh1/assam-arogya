
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
    .describe('The content of the medical report to be analyzed, extracted from a file. This could be for a human or a pet.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of a medical report for a human or a pet, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
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
  prompt: `You are a helpful AI medical assistant for both human and veterinary health. Your role is to analyze a medical report and provide a clear, simplified summary for a patient or pet owner. Do not provide a diagnosis.

You will identify key findings and potential concerns that the user should discuss with their healthcare provider or veterinarian.

The following text and/or image was extracted from a user-uploaded medical report file. Analyze it and provide the output in the specified format.

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
