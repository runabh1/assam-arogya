
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Loader2, Mic } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { aiHealthNavigator } from "@/ai/flows/ai-health-navigator";
import type { AiHealthNavigatorOutput } from "@/ai/flows/ai-health-navigator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  symptoms: z
    .string()
    .min(10, { message: "Please describe your symptoms in at least 10 characters." }),
  location: z
    .string()
    .min(2, { message: "Please enter a valid location." }),
});

// Extend window type for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type Language = 'en-US' | 'as-IN';
type LanguageLabel = 'English' | 'Assamese';

export default function AiHealthNavigatorPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiHealthNavigatorOutput | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>('en-US');
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
      location: "",
    },
  });
  
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = selectedLang;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        form.setValue("symptoms", form.getValues("symptoms") + transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        toast({
            variant: "destructive",
            title: "Speech Recognition Error",
            description: `An error occurred: ${event.error}. Please ensure you have given microphone permissions.`,
        });
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [form, toast, selectedLang]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const language: LanguageLabel = selectedLang === 'as-IN' ? 'Assamese' : 'English';
      const output = await aiHealthNavigator({...values, language});
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to get suggestions. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleMicClick = () => {
    if (!recognitionRef.current) {
        toast({
            variant: "destructive",
            title: "Browser Not Supported",
            description: "Your browser does not support voice recognition."
        });
        return;
    }
    
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      // Update language before starting
      recognitionRef.current.lang = selectedLang;
      recognitionRef.current.start();
      setIsRecording(true);
      toast({
        title: "Listening...",
        description: `Speak your symptoms in ${selectedLang === 'en-US' ? 'English' : 'Assamese'}.`
      })
    }
  }

  return (
    <main className="flex-1 md:gap-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Symptom Checker</CardTitle>
                <CardDescription>
                  Describe symptoms for yourself or any domestic animal (in English or Assamese), and our AI will suggest a relevant specialist. This is not a medical diagnosis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                          <FormLabel>Symptoms</FormLabel>
                          <div className="flex gap-2">
                              <Button 
                                  type="button" 
                                  variant={selectedLang === 'en-US' ? 'secondary' : 'outline'} 
                                  size="sm"
                                  onClick={() => setSelectedLang('en-US')}
                              >
                                  English
                              </Button>
                              <Button 
                                  type="button" 
                                  variant={selectedLang === 'as-IN' ? 'secondary' : 'outline'} 
                                  size="sm"
                                  onClick={() => setSelectedLang('as-IN')}
                              >
                                  Assamese
                              </Button>
                          </div>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="e.g., 'Persistent dry cough and mild fever.' or 'My horse has been limping on its front left leg.'"
                            rows={5}
                            {...field}
                          />
                          <Button type="button" size="icon" variant={isRecording ? 'destructive' : 'ghost'} className="absolute bottom-2 right-2" onClick={handleMicClick}>
                              <Mic className={`h-5 w-5 ${isRecording ? 'animate-pulse' : ''}`} />
                              <span className="sr-only">{isRecording ? "Stop recording" : "Record symptoms"}</span>
                          </Button>
                        </div>
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
                      <FormLabel>Your Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'Guwahati, Assam'" {...field} />
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
                      Getting Suggestions...
                    </>
                  ) : (
                    "Get Suggestions"
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
                  <CardTitle>AI is thinking...</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
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
              <Bot className="h-6 w-6 text-primary" />
              <CardTitle>{selectedLang === 'as-IN' ? 'পৰামৰ্শ' : 'Recommendation'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">{selectedLang === 'as-IN' ? 'পৰামৰ্শ দিয়া বিশেষজ্ঞ' : 'Recommended Specialist'}</p>
                <p className="text-lg font-semibold">{result.specialist}</p>
              </div>
               <div>
                <p className="text-sm text-muted-foreground">{selectedLang === 'as-IN' ? 'কাৰণ' : 'Reasoning'}</p>
                <p>{result.reasoning}</p>
              </div>
               <div>
                <p className="text-sm text-muted-foreground">{selectedLang === 'as-IN' ? 'পৰৱৰ্তী পদক্ষেপ' : 'Next Steps'}</p>
                <p>{result.nextSteps}</p>
              </div>
            </CardContent>
            <CardFooter>
                <Button asChild>
                  <Link href={`/patient/find-provider?specialty=${encodeURIComponent(result.specialist.split(' ')[0])}`}>
                    Find a Provider
                  </Link>
                </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  );
}
