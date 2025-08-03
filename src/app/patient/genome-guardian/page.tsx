
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GitCommitVertical,
  Loader2,
  Sparkles,
  User,
  HeartPulse,
  Droplets,
  Bone,
  Apple,
  Clock,
  MapPin,
  FileText,
} from 'lucide-react';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  genomeGuardian,
  GenomeGuardianInput,
  GenomeGuardianOutput,
  GenomeGuardianInputSchema,
} from '@/ai/flows/genome-guardian-flow';

// We have to redefine the schema here for the form, because we can't export the object from the server file.
const formSchema = GenomeGuardianInputSchema;

export default function GenomeGuardianPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenomeGuardianOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<GenomeGuardianInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Jane Doe',
      age: 34,
      gender: 'Female',
      lifestyle: {
        smoking: false,
        alcohol: false,
        exercise: 'Light',
        diet: 'Balanced',
      },
      existingConditions: 'None',
      familyHistory: 'Father has Type 2 Diabetes. Maternal grandmother had breast cancer.',
      location: 'Guwahati, Assam',
      symptoms: 'Occasional fatigue and headaches.',
    },
  });

  async function onSubmit(values: GenomeGuardianInput) {
    setLoading(true);
    setResult(null);
    try {
      const output = await genomeGuardian(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate the forecast. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }
  
  // Basic markdown-to-JSX renderer
  const renderMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, index, array) => {
        if (line.startsWith('---')) return <hr key={index} className="my-4" />;
        if (line.startsWith('🧬')) return <h2 key={index} className="text-xl font-bold mb-4">{line.replace('🧬 ', '')}</h2>;
        if (line.startsWith('🔹')) return <h3 key={index} className="text-lg font-semibold mt-4">{line.replace('🔹 ', '')}</h3>;
        if (line.startsWith('📍')) return <p key={index} className="mt-4 text-sm text-muted-foreground"><strong>{line.split(':')[0]}:</strong>{line.split(':')[1]}</p>;
        if (line.startsWith('🧠')) return <p key={index} className="mt-4 text-sm text-muted-foreground"><strong>{line.split(':')[0]}:</strong>{line.split(':')[1]}</p>;
        if (line.startsWith('🩺')) return <p key={index} className="mt-6 text-center font-semibold text-primary">{line.replace('🩺 ', '')}</p>;
        if (line.includes('**Prevention**:')) {
             const parts = line.split('**Prevention**:');
            return <p key={index}>{parts[0]}<br/><strong>Prevention:</strong>{parts[1]}</p>;
        }
        if (line.trim() === '') return <br key={index} />;
        return <p key={index} className="text-muted-foreground">{line}</p>;
      });
  }


  return (
    <main className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Arogya Genome Guardian™</CardTitle>
                <CardDescription>
                  Provide your health data to receive an AI-powered future health forecast.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Your age" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <div className="space-y-2">
                    <FormLabel>Lifestyle</FormLabel>
                    <div className="flex items-center space-x-4">
                         <FormField
                            control={form.control}
                            name="lifestyle.smoking"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel className="font-normal">Smoking</FormLabel>
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="lifestyle.alcohol"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel className="font-normal">Alcohol</FormLabel>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="lifestyle.exercise"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Exercise</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="None">None</SelectItem>
                                <SelectItem value="Light">Light</SelectItem>
                                <SelectItem value="Moderate">Moderate</SelectItem>
                                <SelectItem value="Heavy">Heavy</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="lifestyle.diet"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Diet</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select diet" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Healthy">Healthy</SelectItem>
                                <SelectItem value="Balanced">Balanced</SelectItem>
                                <SelectItem value="Unhealthy">Unhealthy</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="familyHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Family Health History</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., My father has diabetes..." {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Guwahati, Assam" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Symptoms (if any)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., chest tightness, bleeding gums" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Forecast...
                    </>
                  ) : (
                    "Get My Future Health Forecast"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
      <div className="lg:col-span-2">
        {loading && (
          <Card className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-center p-8">
              <Sparkles className="h-12 w-12 text-muted-foreground animate-pulse" />
              <h3 className="text-xl font-bold tracking-tight">
                Arogya Genome Guardian™ is analyzing your future...
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                This may take a moment. We're simulating genetic and environmental factors to build your personalized forecast.
              </p>
            </div>
          </Card>
        )}
        {result ? (
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <GitCommitVertical className="h-6 w-6 text-primary" />
              <CardTitle>Your Personalized Forecast</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              {renderMarkdown(result.report)}
            </CardContent>
          </Card>
        ) : !loading && (
          <Card className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-center p-8">
              <GitCommitVertical className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-bold tracking-tight">
                Your Future Health Report Awaits
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Fill in the form on the left to get your personalized health risk forecast and stay 10 years ahead with AI.
              </p>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
