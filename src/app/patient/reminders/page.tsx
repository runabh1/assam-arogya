
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, PlusCircle, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const reminders = [
    { id: 1, title: "Take Multivitamin", time: "08:00 AM", active: true, by: "Self" },
    { id: 2, title: "Follow-up with Dr. Carter", time: "Next week", active: false, by: "Provider" },
    { id: 3, title: "Buddy's flea medication", time: "1st of every month", active: true, by: "Self" },
    { id: 4, title: "Annual health check-up", time: "Due in August", active: true, by: "Provider" },
]

export default function RemindersPage() {
  return (
    <>
      <main className="flex-1 md:gap-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                    <CardTitle>Health Reminders</CardTitle>
                    <CardDescription>Manage your proactive health and wellness alerts.</CardDescription>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Reminder
                </Button>
            </CardHeader>
            <CardContent className="divide-y divide-border">
               {reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4">
                            <Bell className="h-6 w-6 text-primary" />
                            <div>
                                <p className="font-medium">{reminder.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {reminder.time} {reminder.by === 'Provider' && `(from ${reminder.by})`}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                             <Switch
                                id={`reminder-${reminder.id}`}
                                checked={reminder.active}
                                aria-label="Toggle reminder"
                            />
                            <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                    </div>
               ))}
            </CardContent>
        </Card>
      </main>
    </>
  );
}
