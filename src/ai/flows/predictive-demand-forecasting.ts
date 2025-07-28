'use server';
/**
 * @fileOverview Implements the predictive demand forecasting flow for hospital administrators.
 *
 * - predictiveDemandForecasting - Predicts future demand for hospital services.
 * - PredictiveDemandForecastingInput - Input schema for the function.
 * - PredictiveDemandForecastingOutput - Output schema for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveDemandForecastingInputSchema = z.object({
  region: z.string().describe('The geographical region for the demand forecast.'),
  timeframe: z.string().describe('The timeframe for the forecast (e.g., next week, next month).'),
  historicalData: z.string().describe('Anonymized historical patient data, including specialties, services, and conditions.'),
});

export type PredictiveDemandForecastingInput = z.infer<typeof PredictiveDemandForecastingInputSchema>;

const PredictiveDemandForecastingOutputSchema = z.object({
  forecastSummary: z.string().describe('A summary of the predicted demand for specific specialties and services.'),
  suggestedActions: z.string().describe('Suggested actions for resource allocation and staffing based on the forecast.'),
});

export type PredictiveDemandForecastingOutput = z.infer<typeof PredictiveDemandForecastingOutputSchema>;

export async function predictiveDemandForecasting(
  input: PredictiveDemandForecastingInput
): Promise<PredictiveDemandForecastingOutput> {
  return predictiveDemandForecastingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictiveDemandForecastingPrompt',
  input: {schema: PredictiveDemandForecastingInputSchema},
  output: {schema: PredictiveDemandForecastingOutputSchema},
  prompt: `You are an AI assistant for hospital administrators, helping them predict future demand for specific specialties and services to optimize resource allocation and staffing.

  Analyze the following anonymized historical patient data for the specified region and timeframe:

  Region: {{{region}}}
  Timeframe: {{{timeframe}}}
  Historical Data: {{{historicalData}}}

  Based on this data, provide a forecast summary and suggest actions for resource allocation and staffing.

  Forecast Summary:
  - [Provide a detailed forecast of demand for each relevant specialty and service]

  Suggested Actions:
  - [List specific actions the hospital administrator should take to prepare for the predicted demand]`,
});

const predictiveDemandForecastingFlow = ai.defineFlow(
  {
    name: 'predictiveDemandForecastingFlow',
    inputSchema: PredictiveDemandForecastingInputSchema,
    outputSchema: PredictiveDemandForecastingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
