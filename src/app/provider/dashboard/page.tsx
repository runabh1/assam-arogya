
'use client';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { DollarSign, Users, ArrowRight, Map, Siren, Phone, Smartphone, Clock } from 'lucide-react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

const chartData = [
  { day: 'Mon', patients: 5 },
  { day: 'Tue', patients: 8 },
  { day: 'Wed', patients: 12 },
  { day: 'Thu', patients: 10 },
  { day: 'Fri', patients: 15 },
  { day: 'Sat', patients: 7 },
  { day: 'Sun', patients: 4 },
];

type BookingSource = 'App' | 'IVR';
type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

const allBookings = [
    { patient: 'Raju Das', time: '5:00 PM, 4 Aug', location: 'Dibrugarh', source: 'IVR' as BookingSource, status: 'Pending' as BookingStatus },
    { patient: 'Priya Singh', time: '9:30 AM, 4 Aug', location: 'Guwahati', source: 'App' as BookingSource, status: 'Confirmed' as BookingStatus },
    { patient: 'Ananya Das', time: '10:00 AM, 4 Aug', location: 'Jorhat', source: 'App' as BookingSource, status: 'Confirmed' as BookingStatus },
    { patient: 'Rohan Sharma', time: '11:15 AM, 4 Aug', location: 'Nalbari', source: 'IVR' as BookingSource, status: 'Pending' as BookingStatus },
    { patient: 'Vikram Mehta', time: '2:00 PM, 4 Aug', location: 'Sivasagar', source: 'App' as BookingSource, status: 'Completed' as BookingStatus },
    { patient: 'Sunita Devi', time: '4:30 PM, 4 Aug', location: 'Guwahati', source: 'IVR' as BookingSource, status: 'Cancelled' as BookingStatus },
];


export default function ProviderDashboard() {
  const [filter, setFilter] = useState<'All' | 'App' | 'IVR'>('All');

  const filteredBookings = allBookings.filter(booking => {
    if (filter === 'All') return true;
    return booking.source === filter;
  });

  const getStatusBadgeVariant = (status: BookingStatus) => {
    switch (status) {
        case 'Confirmed': return 'default';
        case 'Pending': return 'secondary';
        case 'Completed': return 'outline';
        case 'Cancelled': return 'destructive';
        default: return 'secondary';
    }
  }

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
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
          <Card className="lg:col-span-2 bg-primary text-primary-foreground">
            <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-primary-foreground">Arogya PulseMap™</CardTitle>
                 <Map className="h-6 w-6 text-primary-foreground/80" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm mb-4">
                 <Alert variant="destructive" className="bg-red-900/50 border-red-400 text-white p-2">
                    <Siren className="h-4 w-4" />
                    <AlertDescription>
                        <span className="font-bold">Nalbari:</span> 32% spike in fatigue symptoms.
                    </AlertDescription>
                 </Alert>
                  <Alert variant="destructive" className="bg-yellow-900/50 border-yellow-400 text-white p-2">
                    <Siren className="h-4 w-4" />
                    <AlertDescription>
                        <span className="font-bold">Sivasagar:</span> 5 new ulcer cases reported.
                    </AlertDescription>
                 </Alert>
              </div>
              <Button variant="secondary" asChild>
                <Link href="/provider/pulse-map">
                  Launch Radar <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
           <Card className="xl:col-span-2">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <CardTitle>Bookings</CardTitle>
                    <CardDescription>
                        A list of all patient bookings from multiple sources.
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <Button variant={filter === 'All' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('All')}>All</Button>
                    <Button variant={filter === 'App' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('App')}>App</Button>
                    <Button variant={filter === 'IVR' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('IVR')}>IVR</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
               {filteredBookings.map((booking, index) => (
                    <Card 
                        key={index} 
                        className={cn("flex flex-col", booking.source === 'IVR' ? 'bg-amber-50 border-amber-200' : '')}
                    >
                        <CardHeader className="flex-row items-start justify-between gap-4 pb-4">
                           <div>
                            <p className="font-bold text-lg">{booking.patient}</p>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{booking.time}</span>
                            </div>
                           </div>
                           <Badge variant={booking.source === 'IVR' ? 'destructive' : 'default'} className={cn(booking.source === 'IVR' && 'bg-amber-600 hover:bg-amber-700')}>
                               {booking.source === 'IVR' ? <Phone className="mr-1.5 h-3 w-3" /> : <Smartphone className="mr-1.5 h-3 w-3" />}
                               {booking.source} Booking
                           </Badge>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <div className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">Location:</span> {booking.location}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4">
                            <div className="flex items-center justify-between w-full">
                                <p className="text-sm font-medium">Status:</p>
                                <Badge variant={getStatusBadgeVariant(booking.status)}>{booking.status}</Badge>
                            </div>
                        </CardFooter>
                    </Card>
               ))}
               {filteredBookings.length === 0 && (
                <div className="col-span-2 text-center text-muted-foreground py-10">
                    No bookings found for the "{filter}" filter.
                </div>
               )}
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
