
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';
import Link from 'next/link';

const patients = [
    { id: '#10234', name: 'Rohan Sharma' },
    { id: '#10231', name: 'Priya Singh' },
    { id: '#10225', name: 'Ananya Das (for Pet: Fluffy)' },
    { id: '#10222', name: 'Vikram Mehta' },
];

export default function SendReportPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const patient = formData.get('patient');
        const reportName = formData.get('reportName');
        const file = formData.get('file') as File;

        if (!patient || !reportName || !file || file.size === 0) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please select a patient, provide a report name, and choose a file.",
            });
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Report Sent!",
                description: `The report "${reportName}" has been successfully sent to ${patient}.`,
            });
            (event.target as HTMLFormElement).reset();
            setFileName('');
        }, 1500);
    }

    return (
        <main className="flex justify-center items-start pt-8">
            <Card className="w-full max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Send Report to Patient</CardTitle>
                        <CardDescription>Upload a document and send it directly to a patient's records.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="patient">Select Patient</Label>
                            <Select name="patient">
                                <SelectTrigger id="patient">
                                    <SelectValue placeholder="Select a patient..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {patients.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="reportName">Report Name</Label>
                            <Input id="reportName" name="reportName" placeholder="e.g., Annual Blood Panel Results" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reportType">Report Type</Label>
                            <Input id="reportType" name="reportType" placeholder="e.g., Lab Report, Imaging, etc." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="file">Report Document</Label>
                            <div className="relative">
                                <Button asChild variant="outline" className="w-full justify-start font-normal text-muted-foreground">
                                  <div>
                                    {fileName || 'Select a file...'}
                                  </div>
                                </Button>
                                <Input 
                                    id="file" 
                                    name="file" 
                                    type="file" 
                                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                    onChange={e => setFileName(e.target.files?.[0]?.name || '')}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                         <Button variant="ghost" asChild>
                           <Link href="/provider/patients">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Report
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </main>
    )
}
