
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { User, Dog, Send } from 'lucide-react';
import Link from 'next/link';


const patients = [
    { id: '#10234', name: 'Rohan Sharma', lastVisit: '2024-07-29', type: 'Human' as const, avatar: 'https://placehold.co/100x100' },
    { id: '#10231', name: 'Priya Singh', lastVisit: '2024-07-29', type: 'Human' as const, avatar: 'https://placehold.co/100x100' },
    { id: '#10225', name: 'Ananya Das', lastVisit: '2024-07-29', type: 'Pet Owner' as const, pet: 'Fluffy', avatar: 'https://placehold.co/100x100' },
    { id: '#10222', name: 'Vikram Mehta', lastVisit: '2024-07-28', type: 'Human' as const, avatar: 'https://placehold.co/100x100' },
];

export default function PatientsPage() {
  return (
    <>
      <main className="flex-1 md:gap-8">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Patient Management</CardTitle>
                        <CardDescription>Search, view, and manage your patient records.</CardDescription>
                    </div>
                     <Button asChild>
                        <Link href="/provider/patients/send-report">
                            <Send className="mr-2 h-4 w-4" />
                            Send Report
                        </Link>
                    </Button>
                </div>
                 <div className="pt-4">
                    <Input placeholder="Search patients by name or ID..." />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient</TableHead>
                            <TableHead>Patient ID</TableHead>
                            <TableHead>Last Visit</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={patient.avatar} data-ai-hint="person portrait" />
                                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{patient.name}</p>
                                            {patient.type === 'Pet Owner' && (
                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Dog className="h-4 w-4" />
                                                    {patient.pet}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{patient.id}</TableCell>
                                <TableCell>{patient.lastVisit}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">View Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </>
  );
}
