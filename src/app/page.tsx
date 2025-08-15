
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Leaf, PawPrint, Sun, HeartHandshake } from 'lucide-react';
import { Logo } from '@/components/logo';
import wellnessImage from '../../images/image1.png';
import heroBgImage from '../../images/image2.png';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Arogya Mitra
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
        <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <div
            className="absolute inset-0 bg-no-repeat bg-center bg-cover z-0"
            style={{ backgroundImage: `url(${heroBgImage.src})`, opacity: 0.35 }}
            data-ai-hint="assam tea garden"
          ></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4 text-primary">
              Your Health, Our Priority.
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-8">
              Arogya Mitra is a central hub connecting patients and healthcare providers in Assam. This was built after I lost my grandfather due to lack of timely medical access. Our mission is to prevent that from happening to anyone else.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/patient/dashboard">Get Started as a Patient</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/provider/dashboard">Join as a Provider</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-card/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 grid md:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
             <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-headline font-bold mb-2">For You & Your Family</h2>
              <p className="text-muted-foreground">
                Manage your health with ease. Access records, find doctors, and book tests.
              </p>
            </div>
             <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <PawPrint className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-headline font-bold mb-2">For Your Pets</h2>
              <p className="text-muted-foreground">
                Keep your furry friends healthy. Track vet visits and manage their profiles.
              </p>
            </div>
             <div className="flex flex-col items-center text-center lg:col-span-1 md:col-span-2">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <HeartHandshake className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-headline font-bold mb-2">For Providers</h2>
              <p className="text-muted-foreground">
                A streamlined dashboard to help you focus on what matters most—caring for patients.
              </p>
            </div>
          </div>
        </section>
         <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <Image
                      src={wellnessImage}
                      alt="Happy patient from Assam"
                      width={600}
                      height={400}
                      className="rounded-lg shadow-xl"
                      data-ai-hint="smiling person assam"
                    />
                </div>
                 <div className="flex flex-col items-start text-left">
                  <h2 className="text-3xl font-headline font-bold mb-4">Your Wellness Journey, Simplified</h2>
                  <p className="text-muted-foreground mb-6">
                    We believe managing health should be a positive and straightforward experience. Our platform is designed to be intuitive, beautiful, and easy to use, so you can focus on living a happy, healthy life.
                  </p>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href="/patient/dashboard">
                      Explore Your Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
            </div>
        </section>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Arogya Mitra. All rights reserved.</p>
      </footer>
    </div>
  );
}
