
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Upload, Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const records = [
    { document: "Blood Test Results", date: "2024-07-15", type: "Lab Report", sharedWith: "Dr. Carter" },
    { document: "X-Ray: Left Knee", date: "2024-06-20", type: "Imaging", sharedWith: "Dr. Verma" },
    { document: "Buddy's Vaccination Certificate", date: "2024-05-01", type: "Veterinary", sharedWith: "Dr. Desai" },
    { document: "Prescription - Allergy", date: "2024-07-16", type: "Prescription", sharedWith: "Self" },
];

export default function RecordsPage() {
  return (
    <>
      <main className="flex-1 p-4 sm:px-6 md:gap-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Medical Records</CardTitle>
                    <CardDescription>View, manage, and share your health records securely.</CardDescription>
                </div>
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Record
                </Button>
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem><Download className="mr-2 h-4 w-4" /> Download</DropdownMenuItem>
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
