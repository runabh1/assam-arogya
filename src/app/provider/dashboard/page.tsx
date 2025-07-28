
'use client';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { DollarSign, Users, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const chartData = [
  { day: 'Mon', patients: 5 },
  { day: 'Tue', patients: 8 },
  { day: 'Wed', patients: 12 },
  { day: 'Thu', patients: 10 },
  { day: 'Fri', patients: 15 },
  { day: 'Sat', patients: 7 },
  { day: 'Sun', patients: 4 },
];

export default function ProviderDashboard() {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,205.00</div>
              <p className="text-xs text-muted-foreground">
                +15.2% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Patients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+21</div>
              <p className="text-xs text-muted-foreground">
                +10.5% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Consultation Time</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18m 30s</div>
              <p className="text-xs text-muted-foreground">-2.1% from last week</p>
            </CardContent>
          </Card>
           <Card className="bg-primary text-primary-foreground">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary-foreground/80">Predictive Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Forecast future demand for services and optimize resources.</p>
              <Button variant="secondary" asChild>
                <Link href="/provider/analytics">
                  View Analytics <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>
                A list of patient appointments scheduled for today.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Rohan Sharma</div>
                      <div className="text-sm text-muted-foreground">#10234</div>
                    </TableCell>
                    <TableCell>9:00 AM</TableCell>
                    <TableCell>New Consultation</TableCell>
                    <TableCell className="text-right"><Badge variant="outline">Upcoming</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Priya Singh</div>
                      <div className="text-sm text-muted-foreground">#10231</div>
                    </TableCell>
                    <TableCell>9:30 AM</TableCell>
                    <TableCell>Follow-up</TableCell>
                    <TableCell className="text-right"><Badge variant="outline">Upcoming</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Ananya Das (Pet: Fluffy)</div>
                      <div className="text-sm text-muted-foreground">#10225</div>
                    </TableCell>
                    <TableCell>10:00 AM</TableCell>
                    <TableCell>Check-up</TableCell>
                    <TableCell className="text-right"><Badge>Checked-in</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Patient Volume This Week</CardTitle>
              <CardDescription>
                A summary of patient visits over the past 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <Bar dataKey="patients" fill="var(--color-chart-1)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
