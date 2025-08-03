
'use server';

/**
 * @fileOverview A predictive AI healthcare assistant named "Arogya Genome Guardian™".
 *
 * - genomeGuardian - A function that handles the disease risk forecasting process.
 * - GenomeGuardianInput - The input type for the genomeGuardian function.
 * - GenomeGuardianOutput - The return type for the genomeGuardian function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenomeGuardianInputSchema = z.object({
  name: z.string().describe("The user's name."),
  age: z.number().describe('The age of the user.'),
  gender: z.enum(['Male', 'Female', 'Other']).describe('The gender of the user.'),
  lifestyle: z.object({
    smoking: z.boolean(),
    alcohol: z.boolean(),
    exercise: z.enum(['None', 'Light', 'Moderate', 'Heavy']),
    diet: z.enum(['Healthy', 'Balanced', 'Unhealthy']),
  }).describe("User's lifestyle details."),
  existingConditions: z.string().optional().describe('Any existing medical conditions the user has.'),
  familyHistory: z.string().describe('A text description of the family\'s health history (e.g., "My father has diabetes, my grandmother had breast cancer").'),
  location: z.string().describe('The user\'s location in India (district/state).'),
  symptoms: z.string().optional().describe('Any current symptoms the user is experiencing.'),
});
export type GenomeGuardianInput = z.infer<typeof GenomeGuardianInputSchema>;

export const GenomeGuardianOutputSchema = z.object({
  report: z.string().describe('The final formatted "Future Health Report" as a markdown string.'),
});
export type GenomeGuardianOutput = z.infer<typeof GenomeGuardianOutputSchema>;

export async function genomeGuardian(input: GenomeGuardianInput): Promise<GenomeGuardianOutput> {
  return genomeGuardianFlow(input);
}

const prompt = ai.definePrompt({
  name: 'genomeGuardianPrompt',
  input: {schema: GenomeGuardianInputSchema},
  output: {schema: GenomeGuardianOutputSchema},
  prompt: `You are a predictive AI healthcare assistant named "Arogya Genome Guardian™". Your task is to simulate genetic and environmental disease risk forecasting for a user based on the provided data.

User Data:
- Name: {{{name}}}
- Age: {{{age}}}
- Gender: {{{gender}}}
- Lifestyle: 
  - Smoking: {{{lifestyle.smoking}}}
  - Alcohol: {{{lifestyle.alcohol}}}
  - Exercise: {{{lifestyle.exercise}}}
  - Diet: {{{lifestyle.diet}}}
- Existing Conditions: {{{existingConditions}}}
- Family Health History: {{{familyHistory}}}
- Location: {{{location}}}
- Current Symptoms: {{{symptoms}}}

Your Goal:
1.  Analyze inherited disease risks from the family history.
2.  Analyze region-based environmental risks based on the location.
3.  Predict the top 3 most likely conditions the user may face in the future.
4.  Generate a "Future Health Report" in a specific markdown format. For each of the 3 conditions, you must include:
    - Risk level (Low / Medium / High)
    - A brief explanation of why this risk exists.
    - 2-3 actionable, personalized preventive steps.

Here is the exact format for the output. Do not deviate from it.

---
🧬 **Future Health Forecast for {{{name}}}**

🔹 **[Condition 1 Name]** – Risk: [HIGH/MEDIUM/LOW]  
[Reason for risk based on user data.]  
**Prevention**: [Preventive step 1], [Preventive step 2], [Preventive step 3].

🔹 **[Condition 2 Name]** – Risk: [HIGH/MEDIUM/LOW]  
[Reason for risk based on user data.]  
**Prevention**: [Preventive step 1], [Preventive step 2], [Preventive step 3].

🔹 **[Condition 3 Name]** – Risk: [HIGH/MEDIUM/LOW]  
[Reason for risk based on user data.]  
**Prevention**: [Preventive step 1], [Preventive step 2], [Preventive step 3].

📍 **Environmental Note**: [Provide a note about health risks specific to the user's region, e.g., for Assam, mention arsenic in groundwater.]

🧠 **Smart Tip**: [Provide a helpful tip, e.g., encouraging the user to gather more family health history.]
---
🩺 “Arogya Mitra recommends preventive care before symptoms appear. Stay 10 years ahead with AI.”

Now, generate the report for the user based on their data.
`,
});

const genomeGuardianFlow = ai.defineFlow(
  {
    name: 'genomeGuardianFlow',
    inputSchema: GenomeGuardianInputSchema,
    outputSchema: GenomeGuardianOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
