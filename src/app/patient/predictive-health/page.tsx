
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  AlertTriangle,
  HeartPulse,
  Loader2,
  ShieldAlert,
  Upload,
  Sparkles,
  Phone,
  Ambulance,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

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
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  predictiveHealthAi,
  PredictiveHealthInput,
  PredictiveHealthOutput,
} from '@/ai/flows/predictive-health-ai';
import { cn } from '@/lib/utils';

const readFileAsDataURI = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

const oralCancerSchema = z.object({
  assessmentType: z.literal('oralCancer'),
  symptoms: z.string().min(1, 'Please describe your symptoms.'),
  history: z.string().optional(),
  photoFile: z
    .any()
    .refine(files => files?.length > 0, 'A photo is required for oral cancer assessment.')
    .refine(files => files?.[0]?.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      files => ['image/png', 'image/jpeg', 'image/webp'].includes(files?.[0]?.type),
      'Only .png, .jpg, and .webp files are accepted.'
    ),
});

const heartAttackSchema = z.object({
  assessmentType: z.literal('heartAttack'),
  symptoms: z.string().min(1, 'Please describe your symptoms.'),
  history: z.string().min(1, 'Please provide your medical history.'),
  photoFile: z.any().optional(),
});

const formSchema = z.discriminatedUnion('assessmentType', [
  oralCancerSchema,
  heartAttackSchema,
]);

export default function PredictiveHealthPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictiveHealthOutput | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'oralCancer' | 'heartAttack'>('oralCancer');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assessmentType: 'oralCancer',
      symptoms: '',
      history: '',
    },
  });

  const fileRef = form.register('photoFile');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      let photoDataUri: string | undefined = undefined;
      if (values.assessmentType === 'oralCancer' && values.photoFile?.[0]) {
        photoDataUri = await readFileAsDataURI(values.photoFile[0]);
      }

      const input: PredictiveHealthInput = {
        assessmentType: values.assessmentType,
        symptoms: values.symptoms,
        history: values.history,
        photoDataUri,
      };

      const output = await predictiveHealthAi(input);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate prediction. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  const riskColor = {
    Low: 'text-green-600',
    Medium: 'text-yellow-600',
    High: 'text-red-600',
  };
  
  const riskBgColor = {
    Low: 'bg-green-100',
    Medium: 'bg-yellow-100',
    High: 'bg-red-100',
  };

  return (
    <main className="flex-1 md:gap-8">
      <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Predictive Health AI</CardTitle>
            <CardDescription>
              Select an assessment type and provide the required information to
              get an AI-powered risk analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={value => {
                const newTab = value as 'oralCancer' | 'heartAttack';
                setActiveTab(newTab);
                form.setValue('assessmentType', newTab);
                form.reset({
                    assessmentType: newTab,
                    symptoms: '',
                    history: '',
                    photoFile: undefined,
                });
                setResult(null);
                setFileName(null);
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="oralCancer">Oral Cancer</TabsTrigger>
                <TabsTrigger value="heartAttack">Heart Attack</TabsTrigger>
              </TabsList>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                  <TabsContent value="oralCancer">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="symptoms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Symptoms</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g., gum bleeding, white patch, jaw swelling"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="photoFile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Photo of Mouth/Gums</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Button asChild variant="outline" className="w-full justify-start font-normal text-muted-foreground">
                                  <div>
                                    <Upload className="mr-2 h-4 w-4" />
                                    {fileName || 'Select an image file...'}
                                  </div>
                                </Button>
                                <Input
                                  type="file"
                                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                  accept="image/png, image/jpeg, image/webp"
                                  {...fileRef}
                                  onChange={e => {
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
                    </div>
                  </TabsContent>
                  <TabsContent value="heartAttack">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="symptoms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Symptoms</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g., chest pain, sweating, shortness of breath"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="history"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medical History & Lifestyle</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g., smoking, high BP, family history of heart disease"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  <Button type="submit" disabled={loading || !form.formState.isValid}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Predict Risk'
                    )}
                  </Button>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        </Card>

        <div className="lg:col-span-1">
            {loading && (
                 <Card className="flex h-full items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-center p-8">
                        <Sparkles className="h-12 w-12 text-muted-foreground animate-pulse" />
                        <h3 className="text-xl font-bold tracking-tight">
                            AI is analyzing your data...
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Please wait while we generate your health risk prediction.
                        </p>
                    </div>
                </Card>
            )}
            {result && (
                <Card className={cn("border-2", 
                    result.riskLevel === 'High' && "border-red-500",
                    result.riskLevel === 'Medium' && "border-yellow-500",
                    result.riskLevel === 'Low' && "border-green-500"
                )}>
                    <CardHeader className={cn("text-center", riskBgColor[result.riskLevel])}>
                        <div className="flex justify-center items-center gap-2">
                             {result.riskLevel === 'High' && <ShieldAlert className={cn("h-8 w-8", riskColor[result.riskLevel])} />}
                             {result.riskLevel === 'Medium' && <AlertTriangle className={cn("h-8 w-8", riskColor[result.riskLevel])} />}
                             {result.riskLevel === 'Low' && <HeartPulse className={cn("h-8 w-8", riskColor[result.riskLevel])} />}
                             <CardTitle className={cn("text-2xl", riskColor[result.riskLevel])}>
                                {result.riskLevel} Risk
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        <div>
                            <p className="font-semibold">Recommendation:</p>
                            <p className="text-muted-foreground">{result.recommendation}</p>
                        </div>

                         {result.suggestedSpecialist && (
                             <div>
                                <p className="font-semibold">Suggested Specialist:</p>
                                <p className="text-muted-foreground">{result.suggestedSpecialist}</p>
                            </div>
                        )}
                        
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        {result.isEmergency ? (
                            <div className="w-full space-y-2">
                                <Button className="w-full" variant="destructive">
                                    <Ambulance className="mr-2 h-4 w-4" /> Book Ambulance Now
                                </Button>

                                <Button className="w-full" variant="outline">
                                    <Phone className="mr-2 h-4 w-4" /> Call Emergency
                                </Button>
                            </div>
                        ) : result.suggestedSpecialist && (
                            <Button className="w-full" asChild>
                                <Link href={`/patient/find-provider?specialty=${result.suggestedSpecialist}`}>
                                    Find a {result.suggestedSpecialist}
                                </Link>
                            </Button>
                        )}
                         <p className="text-xs text-muted-foreground text-center pt-4">
                            Disclaimer: This is an AI-powered prediction and not a medical diagnosis. Always consult a qualified healthcare professional.
                        </p>
                    </CardFooter>
                </Card>
            )}
             {!loading && !result && (
                 <Card className="flex h-full items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-center p-8">
                        <ShieldCheck className="h-12 w-12 text-muted-foreground" />
                        <h3 className="text-xl font-bold tracking-tight">
                            Your Results Will Appear Here
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Fill in the form on the left to get your personalized health risk assessment.
                        </p>
                    </div>
                </Card>
            )}
        </div>
      </div>
    </main>
  );
}
