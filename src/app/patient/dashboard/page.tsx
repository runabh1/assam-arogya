
import {
  Activity,
  ArrowUpRight,
  Beaker,
  Calendar,
  Dog,
  Feather,
  Flower,
  GitCommitVertical,
  Heart,
  ShieldCheck,
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
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import image3 from '../../../../images/image3.jpg';
import image4 from '../../../../images/image4.jpg';


export default function PatientDashboard() {
  return (
    <>
      <main className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          {/* Human Health Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary" />
                <CardTitle>My Health</CardTitle>
              </div>
              <CardDescription>
                Manage your personal health profile and services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <User className="h-4 w-4 text-primary" />
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
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Feather className="h-4 w-4 text-primary" />
                      Health Navigator
                    </CardTitle>
                    <CardDescription>AI symptom check</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/patient/navigator">Start Check</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <GitCommitVertical className="h-4 w-4 text-primary" />
                      Genome Guardian
                    </CardTitle>
                    <CardDescription>Predict future risks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/patient/genome-guardian">Get Forecast</Link>
                    </Button>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Predictive Health
                    </CardTitle>
                    <CardDescription>Assess major risks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/patient/predictive-health">Analyze</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
           {/* Pet Health Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Dog className="h-6 w-6 text-primary" />
                <CardTitle>MitraPet</CardTitle>
              </div>
              <CardDescription>
                Access pet profiles and veterinary services.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center gap-4">
               <div className="flex-1 flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <Image src={image3} alt="Buddy" className="rounded-full" />
                    <AvatarFallback>B</AvatarFallback>
                  </Avatar>
                   <Avatar className="h-8 w-8">
                    <Image src={image4} alt="Lucy" className="rounded-full" />
                    <AvatarFallback>L</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Buddy & Lucy</span>
               </div>
               <Button asChild>
                <Link href="/patient/mitrapet">
                    Go to MitraPet Dashboard <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
               </Button>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                A list of upcoming appointments for you and your pets.
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
                      <div className="text-sm text-muted-foreground">For: Jane Doe (Self)</div>
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
                      <div className="text-sm text-muted-foreground">For: Buddy</div>
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
                Recent updates in your health profile.
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
