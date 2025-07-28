
'use server';

/**
 * @fileOverview An AI-powered report analyzer that provides a summary of medical reports.
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
    .describe('The content of the medical report to be analyzed, extracted from a file.'),
});
export type AnalyzeReportInput = z.infer<typeof AnalyzeReportInputSchema>;

const AnalyzeReportOutputSchema = z.object({
  summary: z.string().describe('A simplified summary of the report.'),
  keyFindings: z.array(z.string()).describe('A list of key findings from the report.'),
  potentialConcerns: z.array(z.string()).describe('A list of potential concerns or areas to discuss with a doctor.'),
});
export type AnalyzeReportOutput = z.infer<typeof AnalyzeReportOutputSchema>;

export async function analyzeReport(input: AnalyzeReportInput): Promise<AnalyzeReportOutput> {
  return analyzeReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeReportPrompt',
  input: {schema: AnalyzeReportInputSchema},
  output: {schema: AnalyzeReportOutputSchema},
  prompt: `You are a helpful AI medical assistant. Your role is to analyze a medical report and provide a clear, simplified summary for a patient. Do not provide a diagnosis.

You will identify key findings and potential concerns that the patient should discuss with their healthcare provider.

The following text was extracted from a user-uploaded medical report file. Analyze it and provide the output in the specified format.

Medical Report Content:
{{{report}}}
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
