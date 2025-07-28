
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Stethoscope, MapPin } from 'lucide-react';

const providers = [
    { name: 'Dr. Emily Carter', specialty: 'Cardiology', location: 'Guwahati', avatar: 'https://placehold.co/100x100' },
    { name: 'Dr. Rahul Sharma', specialty: 'Dermatology', location: 'Guwahati', avatar: 'https://placehold.co/100x100' },
    { name: 'Dr. Priya Desai (Vet)', specialty: 'Veterinary Medicine', location: 'Guwahati', avatar: 'https://placehold.co/100x100' },
    { name: 'Dr. Alok Verma', specialty: 'Orthopedics', location: 'Guwahati', avatar: 'https://placehold.co/100x100' },
];

export default function FindProviderPage() {
  return (
    <>
      <main className="flex-1 p-4 sm:px-6 md:gap-8">
         <Card className="mb-8">
            <CardHeader>
                <CardTitle>Find a Provider</CardTitle>
                <CardDescription>Search for specialists and veterinarians in your area.</CardDescription>
            </CardHeader>
            <CardContent>
                 <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Input placeholder="Search by name or specialty..." />
                    <Input placeholder="Location (e.g., Guwahati)" />
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by specialty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="dermatology">Dermatology</SelectItem>
                            <SelectItem value="veterinary">Veterinary</SelectItem>
                            <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit">Search</Button>
                </form>
            </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {providers.map((provider, index) => (
                <Card key={index}>
                    <CardHeader className="flex-row items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={provider.avatar} alt={provider.name} />
                            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{provider.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Stethoscope className="h-5 w-5" />
                            <span>{provider.specialty}</span>
                        </div>
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-5 w-5" />
                            <span>{provider.location}</span>
                        </div>
                        <Button className="w-full">View Profile & Book</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </main>
    </>
  );
}
