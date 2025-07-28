
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2, FileCheck2, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { analyzeReport } from '@/ai/flows/report-analyzer-flow';
import type { AnalyzeReportOutput } from '@/ai/flows/report-analyzer-flow';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  report: z
    .string()
    .min(50, { message: 'Please paste the report content (at least 50 characters).' }),
});

export default function ReportAnalyzerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeReportOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      report: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const output = await analyzeReport(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to analyze the report. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 md:gap-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>AI Report Analyzer</CardTitle>
                <CardDescription>
                  Paste the content of your medical report below. The AI will provide a simplified summary.
                  This is not a medical diagnosis. Always consult with a qualified healthcare professional.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="report"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste the full text from your medical or lab report here..."
                          rows={15}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Report...
                    </>
                  ) : (
                    'Analyze Report'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {loading && (
           <Card className="mt-8">
              <CardHeader className="flex flex-row items-center gap-2">
                  <Bot className="h-6 w-6" />
                  <CardTitle>AI is analyzing the report...</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
              </CardContent>
          </Card>
        )}

        {result && (
          <Card className="mt-8">
            <CardHeader className="flex flex-row items-center gap-2">
              <FileCheck2 className="h-6 w-6 text-primary" />
              <CardTitle>Analysis Complete</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Summary</h3>
                    <p className="text-muted-foreground">{result.summary}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-2">Key Findings</h3>
                    <div className="flex flex-wrap gap-2">
                        {result.keyFindings.map((finding, index) => (
                            <Badge key={index} variant="secondary">{finding}</Badge>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Potential Concerns to Discuss with Your Doctor
                    </h3>
                     <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {result.potentialConcerns.map((concern, index) => (
                            <li key={index}>{concern}</li>
                        ))}
                    </ul>
                </div>
            </CardContent>
             <CardFooter className="text-sm text-muted-foreground">
                <p><strong>Disclaimer:</strong> This AI analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.</p>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  );
}
