
import {
  Activity,
  ArrowUpRight,
  Calendar,
  Dog,
  Feather,
  Flower,
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

export default function PatientDashboard() {
  return (
    <>
      <main className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                 <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  My Profile
                </CardTitle>
                <CardDescription>Jane Doe</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" asChild>
                  <Link href="/patient/profile">View Profile</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                 <CardTitle className="flex items-center gap-2">
                  <Flower className="h-5 w-5 text-primary" />
                  Pet Profiles
                </CardTitle>
                <CardDescription>2 Active Profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Dog className="h-5 w-5 text-muted-foreground" />
                  <span>Buddy & Lucy</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Next Appointment
                </CardTitle>
                <CardDescription>Dr. Smith</CardDescription>
              </CardHeader>
              <CardContent>
                 <span>Tomorrow, 10:00 AM</span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                 <CardTitle className="flex items-center gap-2">
                  <Feather className="h-5 w-5 text-primary" />
                  Health Navigator
                </CardTitle>
                <CardDescription>Get AI-powered advice</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/patient/navigator">Start Symptom Check</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                A garden of upcoming appointments and consultations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Dr. Emily Carter</div>
                      <div className="text-sm text-muted-foreground">Cardiology</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Follow-up</Badge>
                    </TableCell>
                    <TableCell>2024-07-25 at 2:00 PM</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Dr. Max (Vet)</div>
                      <div className="text-sm text-muted-foreground">for Buddy</div>
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
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                New blossoms in your health profile.
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
                    Lab Report Added
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your blood test results are available.
                  </p>
                </div>
                <div className="ml-auto font-medium text-sm">2h ago</div>
              </div>
              <div className="flex items-center gap-4">
                 <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="https://placehold.co/100x100" alt="Avatar" data-ai-hint="prescription icon" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Prescription Updated
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dr. Carter has updated your prescription.
                  </p>
                </div>
                <div className="ml-auto font-medium text-sm">1d ago</div>
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
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
