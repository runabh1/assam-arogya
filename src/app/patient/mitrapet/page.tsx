
import {
  Activity,
  ArrowUpRight,
  Beaker,
  Bot,
  Calendar,
  Dog,
  Feather,
  Flower,
  GitCommitVertical,
  Search,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function MitraPetDashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Dog className="h-6 w-6 text-primary" />
                My Pet Profiles
              </CardTitle>
              <CardDescription>Manage your pets' health information.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="dog" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <span className="font-medium">Buddy</span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="cat" />
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
                <span className="font-medium">Lucy</span>
              </div>
               <Button size="sm" variant="outline" asChild>
                  <Link href="/patient/profile">Manage Profiles</Link>
                </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Pet Symptom Checker
              </CardTitle>
              <CardDescription>AI vet assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" asChild>
                <Link href="/patient/navigator">Start Check</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Find a Vet
              </CardTitle>
              <CardDescription>Search for veterinarians</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="outline" asChild>
                <Link href="/patient/find-provider?specialty=Veterinary">Find Vets</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Vet Appointments</CardTitle>
            <CardDescription>
              A list of upcoming appointments for your pets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>For Pet</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Dr. Priya Desai (Vet)</div>
                    <div className="text-sm text-muted-foreground">Downtown Vet Clinic</div>
                  </TableCell>
                   <TableCell>
                      <div className="font-medium">Buddy</div>
                    </TableCell>
                  <TableCell>
                    <Badge>Vaccination</Badge>
                  </TableCell>
                  <TableCell>2024-08-02 at 11:30 AM</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell>
                    <div className="font-medium">Dr. Max (Vet)</div>
                    <div className="text-sm text-muted-foreground">City Pet Hospital</div>
                  </TableCell>
                   <TableCell>
                      <div className="font-medium">Lucy</div>
                    </TableCell>
                  <TableCell>
                    <Badge variant="outline">Check-up</Badge>
                  </TableCell>
                  <TableCell>2024-08-15 at 3:00 PM</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Pet Activity</CardTitle>
            <CardDescription>
              Recent updates in your pets' health profiles.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="https://placehold.co/100x100" alt="Avatar" data-ai-hint="medical icon"/>
                <AvatarFallback>DC</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Lab Report Added for Buddy
                </p>
                <p className="text-sm text-muted-foreground">
                  Buddy's blood test results are available.
                </p>
              </div>
              <div className="ml-auto font-medium text-sm">2h ago</div>
            </div>
             <div className="flex items-center gap-4">
               <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="https://placehold.co/100x100" alt="Avatar" data-ai-hint="bell icon" />
                <AvatarFallback>VM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Reminder: Buddy's Check-up
                </p>
                <p className="text-sm text-muted-foreground">
                  Annual check-up for Buddy is due next month.
                </p>
              </div>
              <div className="ml-auto font-medium text-sm">2d ago</div>
            </div>
             <div className="flex items-center gap-4">
               <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="https://placehold.co/100x100" alt="Avatar" data-ai-hint="prescription icon" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Prescription Updated for Lucy
                </p>
                <p className="text-sm text-muted-foreground">
                  Dr. Desai has updated Lucy's prescription.
                </p>
              </div>
              <div className="ml-auto font-medium text-sm">5d ago</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
