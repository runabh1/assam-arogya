
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Upload, Share2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type Record = {
    document: string;
    date: string;
    type: string;
    sharedWith: string;
    file?: File;
}

const initialRecords: Record[] = [
    { document: "Cardiac Stress Test Results", date: "2024-07-18", type: "Cardiology", sharedWith: "Dr. Singh (Provider)" },
    { document: "Blood Test Results", date: "2024-07-15", type: "Lab Report", sharedWith: "Dr. Carter" },
    { document: "X-Ray: Left Knee", date: "2024-06-20", type: "Imaging", sharedWith: "Dr. Verma" },
    { document: "Buddy's Vaccination Certificate", date: "2024-05-01", type: "Veterinary", sharedWith: "Dr. Desai" },
    { document: "Prescription - Allergy", date: "2024-07-16", type: "Prescription", sharedWith: "Self" },
];

export default function RecordsPage() {
  const [records, setRecords] = useState<Record[]>(initialRecords);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get('file') as File;

    if (!formData.get('documentName') || !formData.get('date') || !formData.get('type') || !file || file.size === 0) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill out all fields and select a file to upload.",
        });
        return;
    }
    
    const newRecord: Record = {
        document: formData.get('documentName') as string,
        date: new Date(formData.get('date') as string).toISOString().split('T')[0],
        type: formData.get('type') as string,
        sharedWith: 'Self',
        file: file,
    };

    setRecords(prevRecords => [newRecord, ...prevRecords]);
    toast({
        title: "Record Uploaded",
        description: `${newRecord.document} has been successfully added.`,
    })
    setIsDialogOpen(false);
    (event.target as HTMLFormElement).reset();
  }

  const handleDownload = (file: File | undefined) => {
    if (file) {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        toast({
            variant: "destructive",
            title: "Download Failed",
            description: "No file is available for this record.",
        })
    }
  }

  return (
    <>
      <main className="flex-1 md:gap-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Medical Records</CardTitle>
                    <CardDescription>View, manage, and share your health records securely.</CardDescription>
                </div>
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Record
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                         <form onSubmit={handleUpload}>
                            <DialogHeader>
                                <DialogTitle>Upload New Record</DialogTitle>
                                <DialogDescription>
                                    Add a new medical document to your records. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="documentName" className="text-right">Name</Label>
                                    <Input id="documentName" name="documentName" className="col-span-3" placeholder="e.g., Annual Physical Exam" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="type" className="text-right">Type</Label>
                                    <Input id="type" name="type" className="col-span-3" placeholder="e.g., Lab Report" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="date" className="text-right">Date</Label>
                                    <Input id="date" name="date" type="date" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="file" className="text-right">File</Label>
                                    <Input id="file" name="file" type="file" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save Record</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Document</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Shared With</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {records.map((record, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    {record.document}
                                </TableCell>
                                <TableCell><Badge variant="outline">{record.type}</Badge></TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell>{record.sharedWith}</TableCell>
                                <TableCell className="text-right">
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <span className="sr-only">More actions</span>
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleDownload(record.file)}><Download className="mr-2 h-4 w-4" /> Download</DropdownMenuItem>
                                            <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
