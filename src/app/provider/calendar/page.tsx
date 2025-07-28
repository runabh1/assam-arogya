
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';

const appointments = {
    "2024-07-29": [
        { time: "10:00 AM", patient: "Rohan Sharma", type: "New Consultation" },
        { time: "11:00 AM", patient: "Ananya Das (Pet: Fluffy)", type: "Check-up" },
        { time: "02:00 PM", patient: "Priya Singh", type: "Follow-up" },
    ],
     "2024-07-30": [
        { time: "09:30 AM", patient: "Vikram Mehta", type: "New Consultation" },
    ]
}

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date('2024-07-29T00:00:00.000Z'));
  
  const selectedDateString = date ? date.toISOString().split('T')[0] : '';
  const todaysAppointments = appointments[selectedDateString as keyof typeof appointments] || [];


  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
             <Card>
                <CardContent className="p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="p-0"
                        classNames={{
                            root: "w-full",
                            months: "w-full",
                            month: "w-full",
                            table: "w-full",
                            head_row: "w-full",
                            row: "w-full justify-between"
                        }}
                    />
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Appointments for {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'today'}
                    </CardTitle>
                     <CardDescription>Manage your schedule for the selected day.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {todaysAppointments.length > 0 ? (
                        todaysAppointments.map((appt, index) => (
                             <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div>
                                    <p className="font-semibold">{appt.time}</p>
                                    <p className="text-sm">{appt.patient}</p>
                                </div>
                                <Badge variant={appt.type === 'New Consultation' ? 'default' : 'secondary'}>{appt.type}</Badge>
                            </div>
                        ))
                    ) : (
                         <div className="text-center py-8 text-muted-foreground">
                            <p>No appointments scheduled for this day.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </main>
    </>
  );
}
