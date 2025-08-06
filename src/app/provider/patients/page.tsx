
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { User, Dog, Send, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

type PatientType = 'Human' | 'Pet Owner';

type Patient = {
  id: string;
  name: string;
  lastVisit: string;
  type: PatientType;
  avatar: string;
  pet?: string;
};

const initialPatients: Patient[] = [
    { id: '#10234', name: 'Rohan Sharma', lastVisit: '2024-07-29', type: 'Human', avatar: 'https://placehold.co/100x100' },
    { id: '#10231', name: 'Priya Singh', lastVisit: '2024-07-29', type: 'Human', avatar: 'https://placehold.co/100x100' },
    { id: '#10225', name: 'Ananya Das', lastVisit: '2024-07-29', type: 'Pet Owner', pet: 'Fluffy', avatar: 'https://placehold.co/100x100' },
    { id: '#10222', name: 'Vikram Mehta', lastVisit: '2024-07-28', type: 'Human', avatar: 'https://placehold.co/100x100' },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [patientType, setPatientType] = useState<PatientType>('Human');
  const { toast } = useToast();

  const handleAddPatient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const petName = formData.get('petName') as string;

    if (!name) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter the patient's name.",
      });
      return;
    }
     if (patientType === 'Pet Owner' && !petName) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter the pet's name for a Pet Owner.",
      });
      return;
    }

    const newPatient: Patient = {
      id: `#${Math.floor(10000 + Math.random() * 90000)}`,
      name,
      type: patientType,
      pet: patientType === 'Pet Owner' ? petName : undefined,
      lastVisit: new Date().toISOString().split('T')[0],
      avatar: 'https://placehold.co/100x100'
    };

    setPatients(prev => [newPatient, ...prev]);
    toast({
        title: "Patient Added",
        description: `${name} has been successfully added to your records.`,
    })
    setIsDialogOpen(false);
  }

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
                    <div className="flex gap-2">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Patient
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <form onSubmit={handleAddPatient}>
                                    <DialogHeader>
                                        <DialogTitle>Add New Patient</DialogTitle>
                                        <DialogDescription>Enter the details for the new patient.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Patient Name</Label>
                                            <Input id="name" name="name" placeholder="e.g., John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Patient Type</Label>
                                            <RadioGroup defaultValue="Human" onValueChange={(value: PatientType) => setPatientType(value)}>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Human" id="r1" />
                                                    <Label htmlFor="r1">Human</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Pet Owner" id="r2" />
                                                    <Label htmlFor="r2">Pet Owner</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        {patientType === 'Pet Owner' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="petName">Pet's Name</Label>
                                                <Input id="petName" name="petName" placeholder="e.g., Buddy" />
                                            </div>
                                        )}
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">Add Patient</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Button asChild variant="outline">
                            <Link href="/provider/patients/send-report">
                                <Send className="mr-2 h-4 w-4" />
                                Send Report
                            </Link>
                        </Button>
                    </div>
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
