
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Stethoscope } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';


const providers = [
    { name: 'Dr. Priya Desai', specialty: 'Veterinary', location: 'Downtown Vet Clinic, Guwahati', rating: 4.9, avatar: 'https://placehold.co/100x100' },
    { name: 'Dr. Emily Carter', specialty: 'Cardiology', location: 'Guwahati Heart Center', rating: 4.8, avatar: 'https://placehold.co/100x100' },
    { name: 'Dr. Max', specialty: 'Veterinary', location: 'City Pet Hospital, Dibrugarh', rating: 4.7, avatar: 'https://placehold.co/100x100' },
    { name: 'Dr. Arjun Verma', specialty: 'Orthopedics', location: 'Assam Bone & Joint, Jorhat', rating: 4.6, avatar: 'https://placehold.co/100x100' },
];

export default function FindProviderPage() {
  return (
    <main className="flex-1 md:gap-8">
        <Card className="mb-8">
        <CardHeader>
            <CardTitle>Find an In-Network Provider</CardTitle>
            <CardDescription>Search for doctors and veterinarians who are part of the Arogya Mitra network.</CardDescription>
        </CardHeader>
        <CardContent>
                <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Input placeholder="Search by provider name..." />
                <Input placeholder="Location (e.g., Guwahati)" />
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by specialty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="veterinary">Veterinary</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="dentist">Dentist</SelectItem>
                    </SelectContent>
                </Select>
                <Button type="submit">Search Providers</Button>
            </form>
        </CardContent>
    </Card>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {providers.map((provider, index) => (
            <Card key={index}>
                <CardHeader className="flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={provider.avatar} alt={provider.name} data-ai-hint="doctor portrait" />
                        <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{provider.name}</CardTitle>
                            <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" /> <span>{provider.rating}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Stethoscope className="h-4 w-4" />
                        <span>{provider.specialty}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>{provider.location}</span>
                    </div>
                    <Button className="w-full" asChild>
                        <Link href="/provider/calendar">Book Appointment</Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
    </main>
  );
}
