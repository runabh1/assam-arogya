"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Loader2 } from "lucide-react";

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
import { DashboardHeader } from "@/components/dashboard-header";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  symptoms: z
    .string()
    .min(10, { message: "Please describe your symptoms in at least 10 characters." }),
  location: z
    .string()
    .min(2, { message: "Please enter a valid location." }),
});

export default function AiHealthNavigatorPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiHealthNavigatorOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const output = await aiHealthNavigator(values);
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

  return (
    <>
      <DashboardHeader title="AI Health Navigator" />
      <main className="flex-1 p-4 sm:px-6 md:gap-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Symptom Checker</CardTitle>
                  <CardDescription>
                    Describe your or your pet's symptoms, and our AI will suggest relevant specialists and available appointments. This is not a medical diagnosis.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Symptoms</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'Persistent dry cough, mild fever, and fatigue for the last 3 days.' or 'My dog has been lethargic and is not eating.'"
                            rows={5}
                            {...field}
                          />
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
                    <div className="space-y-4">
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
                <CardTitle>Appointment Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{result.suggestions}</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/patient/find-provider">Book an Appointment</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
