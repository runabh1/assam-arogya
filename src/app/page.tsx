import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, HeartPulse, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Unified Health Hub
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/patient/dashboard">Patient Login</Link>
          </Button>
          <Button asChild>
            <Link href="/provider/dashboard">Provider Login</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
            Your Health, Unified.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Arogya Mitra is the central hub connecting patients and providers for streamlined healthcare, for both you and your pets.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/patient/dashboard">Get Started as a Patient</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/provider/dashboard">Join as a Provider</Link>
            </Button>
          </div>
        </section>

        <section className="bg-card/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <HeartPulse className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-headline font-bold mb-4">For Patients & Pet Owners</h2>
              <p className="text-muted-foreground mb-6">
                Take control of your family's health. Manage profiles, find the best doctors, get AI-powered insights, and access your records anytime, anywhere.
              </p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/patient/dashboard">
                  Explore Patient Features <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-headline font-bold mb-4">For Healthcare Providers</h2>
              <p className="text-muted-foreground mb-6">
                Optimize your practice with our intelligent dashboard. Manage appointments, access patient data securely, and use predictive analytics to stay ahead.
              </p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/provider/dashboard">
                  Discover Provider Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Unified Health Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
