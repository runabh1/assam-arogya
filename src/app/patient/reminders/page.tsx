
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, PlusCircle, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';


type Reminder = {
    id: number;
    title: string;
    time: string;
    active: boolean;
    by: 'Self' | 'Provider';
}

const initialReminders: Reminder[] = [
    { id: 1, title: "Take Multivitamin", time: "08:00 AM", active: true, by: "Self" },
    { id: 2, title: "Follow-up with Dr. Carter", time: "Next week", active: false, by: "Provider" },
    { id: 3, title: "Buddy's flea medication", time: "1st of every month", active: true, by: "Self" },
    { id: 4, title: "Annual health check-up", time: "Due in August", active: true, by: "Provider" },
];

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddReminder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const time = formData.get('time') as string;

    if (!title || !time) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill out all fields for the reminder.",
        });
        return;
    }

    const newReminder: Reminder = {
        id: Math.max(0, ...reminders.map(r => r.id)) + 1,
        title,
        time,
        active: true,
        by: 'Self',
    };

    setReminders(prev => [newReminder, ...prev]);
    toast({
        title: "Reminder Added",
        description: `Your reminder for "${title}" has been set.`,
    });
    setIsDialogOpen(false);
  }

  const toggleReminder = (id: number) => {
    setReminders(prev =>
        prev.map(r => r.id === id ? { ...r, active: !r.active } : r)
    );
  }

  const deleteReminder = (id: number) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast({
        title: "Reminder Deleted",
    })
  }

  return (
    <>
      <main className="flex-1 md:gap-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                    <CardTitle>Health Reminders</CardTitle>
                    <CardDescription>Manage your proactive health and wellness alerts.</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Reminder
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleAddReminder}>
                            <DialogHeader>
                                <DialogTitle>Create New Reminder</DialogTitle>
                                <DialogDescription>Set up a new alert for yourself or a pet.</DialogDescription>
                            </DialogHeader>
                             <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">Title</Label>
                                    <Input id="title" name="title" className="col-span-3" placeholder="e.g., Take morning pills" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="time" className="text-right">Time/Frequency</Label>
                                    <Input id="time" name="time" className="col-span-3" placeholder="e.g., 08:00 AM daily" />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save Reminder</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent className="divide-y divide-border">
               {reminders.length > 0 ? reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4">
                            <Bell className="h-6 w-6 text-primary" />
                            <div>
                                <p className="font-medium">{reminder.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {reminder.time} {reminder.by === 'Provider' && `(from Provider)`}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                             <Switch
                                id={`reminder-${reminder.id}`}
                                checked={reminder.active}
                                onCheckedChange={() => toggleReminder(reminder.id)}
                                aria-label="Toggle reminder"
                            />
                            <Button variant="ghost" size="icon" onClick={() => deleteReminder(reminder.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                    </div>
               )) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>You have no active reminders.</p>
                </div>
               )}
            </CardContent>
        </Card>
      </main>
    </>
  );
}
