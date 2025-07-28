
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2, FileCheck2, AlertTriangle, Upload } from 'lucide-react';

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
import { Input } from '@/components/ui/input';
import { analyzeReport } from '@/ai/flows/report-analyzer-flow';
import type { AnalyzeReportOutput } from '@/ai/flows/report-analyzer-flow';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  reportFile: z
    .any()
    .refine((files) => files?.length === 1, 'File is required.')
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (files) => ['application/pdf', 'text/plain'].includes(files?.[0]?.type),
      'Only .pdf and .txt files are accepted.'
    ),
});

export default function ReportAnalyzerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeReportOutput | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportFile: undefined,
    },
  });

  const fileRef = form.register('reportFile');

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const file = values.reportFile[0];
      const reportContent = await readFileAsText(file);
      
      const output = await analyzeReport({ report: reportContent });
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
                  Upload a medical report (.txt or .pdf). The AI will provide a simplified summary.
                  This is not a medical diagnosis. Always consult with a qualified healthcare professional.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="reportFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Report File</FormLabel>
                      <FormControl>
                         <div className="relative">
                            <Button asChild variant="outline" className="w-full justify-start font-normal text-muted-foreground">
                                <div>
                                    <Upload className="mr-2" />
                                    {fileName || "Select a file..."}
                                </div>
                            </Button>
                            <Input
                                type="file"
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                accept=".txt,.pdf"
                                {...fileRef}
                                onChange={(e) => {
                                    field.onChange(e.target.files);
                                    if (e.target.files && e.target.files[0]) {
                                        setFileName(e.target.files[0].name);
                                    } else {
                                        setFileName(null);
                                    }
                                }}
                            />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading || !form.formState.isValid}>
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
