"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BarChart2, Loader2, Sparkles } from "lucide-react";

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
import {
  predictiveDemandForecasting,
} from "@/ai/flows/predictive-demand-forecasting";
import type {
  PredictiveDemandForecastingOutput,
} from "@/ai/flows/predictive-demand-forecasting";
import { DashboardHeader } from "@/components/dashboard-header";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  region: z.string().min(2, { message: "Please enter a valid region." }),
  timeframe: z.string().min(2, { message: "Please enter a valid timeframe." }),
  historicalData: z
    .string()
    .min(50, { message: "Please provide at least 50 characters of historical data." }),
});

export default function PredictiveAnalyticsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictiveDemandForecastingOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: "Guwahati, Assam",
      timeframe: "Next month",
      historicalData: "Sample data: Last month saw 30% increase in pediatric fever cases. Cardiology consultations up by 15%. Orthopedic cases stable. High incidence of flu-like symptoms in the western part of the city.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const output = await predictiveDemandForecasting(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to generate forecast. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <DashboardHeader title="Predictive Analytics" />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Demand Forecasting</CardTitle>
                  <CardDescription>
                    Use AI to predict demand for specialties and services to optimize resource allocation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 'Guwahati, Assam'" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timeframe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeframe</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 'Next month'" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="historicalData"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anonymized Historical Data</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a summary of recent trends, e.g., 'Increased pediatric cases, rise in cardiology consults...'"
                            rows={8}
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
                        Generating Forecast...
                      </>
                    ) : (
                      "Generate Forecast"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
        <div className="lg:col-span-2">
            {loading && (
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <BarChart2 className="h-6 w-6 animate-pulse" />
                        <CardTitle>Generating AI Forecast...</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div>
                          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-full"></div>
                            <div className="h-4 bg-muted rounded w-5/6"></div>
                          </div>
                       </div>
                       <div>
                          <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-full"></div>
                            <div className="h-4 bg-muted rounded w-4/6"></div>
                            <div className="h-4 bg-muted rounded w-full"></div>
                          </div>
                       </div>
                    </CardContent>
                </Card>
            )}
            {result && (
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <CardTitle>AI-Powered Forecast</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Forecast Summary</h3>
                            <p className="text-muted-foreground whitespace-pre-wrap">{result.forecastSummary}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Suggested Actions</h3>
                            <p className="text-muted-foreground whitespace-pre-wrap">{result.suggestedActions}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
            {!loading && !result && (
                 <Card className="flex h-full items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-center p-8">
                        <BarChart2 className="h-12 w-12 text-muted-foreground" />
                        <h3 className="text-xl font-bold tracking-tight">
                            Ready for Insights?
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Fill in the details on the left and click "Generate Forecast" to see AI-powered predictions for your practice.
                        </p>
                    </div>
                </Card>
            )}
        </div>
      </main>
    </>
  );
}
