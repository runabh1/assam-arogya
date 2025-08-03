
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const centers = [
    { name: 'Guwahati Advanced Imaging', tests: ['MRI', 'CT Scan'], location: 'Ulubari, Guwahati', rating: 4.8, timing: '8 AM - 10 PM', avatar: 'https://placehold.co/100x100' },
    { name: 'Dispur Diagnostic Center', tests: ['X-Ray', 'Ultrasound'], location: 'Dispur, Guwahati', rating: 4.5, timing: '7 AM - 8 PM', avatar: 'https://placehold.co/100x100' },
    { name: 'Modern X-Ray Clinic', tests: ['X-Ray'], location: 'Paltan Bazaar, Guwahati', rating: 4.2, timing: '9 AM - 9 PM', avatar: 'https://placehold.co/100x100' },
    { name: 'City Scan & Diagnostics', tests: ['CT Scan', 'MRI', 'X-Ray'], location: 'Ganeshguri, Guwahati', rating: 4.9, timing: 'Open 24 Hours', avatar: 'https://placehold.co/100x100' },
];

export default function BookTestPage() {
  return (
    <>
      <main className="flex-1 md:gap-8">
         <Card className="mb-8">
            <CardHeader>
                <CardTitle>Book a Diagnostic Test</CardTitle>
                <CardDescription>Find and book CT scans, MRIs, X-rays, and other tests.</CardDescription>
            </CardHeader>
            <CardContent>
                 <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Input placeholder="Search by center name..." />
                    <Input placeholder="Location (e.g., Guwahati)" />
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by test" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ct">CT Scan</SelectItem>
                            <SelectItem value="mri">MRI</SelectItem>
                            <SelectItem value="xray">X-Ray</SelectItem>
                            <SelectItem value="ultrasound">Ultrasound</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit">Search Centers</Button>
                </form>
            </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {centers.map((center, index) => (
                <Card key={index}>
                    <CardHeader className="flex-row items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={center.avatar} alt={center.name} data-ai-hint="hospital building" />
                            <AvatarFallback>{center.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{center.name}</CardTitle>
                             <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="h-4 w-4 fill-current" /> <span>{center.rating}</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>{center.location}</span>
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold">Timings: {center.timing}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {center.tests.map(test => <Badge key={test} variant="secondary">{test}</Badge>)}
                        </div>
                        <Button className="w-full">Book Now</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </main>
    </>
  );
}
