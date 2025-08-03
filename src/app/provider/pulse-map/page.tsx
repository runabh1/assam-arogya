
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from '@/lib/utils';

type Alert = {
  id: number;
  district: string;
  symptom: string;
  count: number;
  severity: 'High' | 'Medium' | 'Low';
  coordinates: { top: string; left: string };
  action: string;
}

const allAlerts: Alert[] = [
    { id: 1, district: 'Sivasagar', symptom: 'Mouth Ulcers', count: 6, severity: 'High', coordinates: { top: '42%', left: '82%' }, action: 'Check water quality' },
    { id: 2, district: 'Barpeta', symptom: 'Fever', count: 3, severity: 'Medium', coordinates: { top: '70%', left: '35%' }, action: 'Monitor trend' },
    { id: 3, district: 'Kamrup', symptom: 'Chest Pain', count: 7, severity: 'High', coordinates: { top: '60%', left: '50%' }, action: 'Alert cardiologists' },
    { id: 4, district: 'Dibrugarh', symptom: 'Cough', count: 2, severity: 'Low', coordinates: { top: '30%', left: '88%' }, action: 'Continue monitoring' },
];

const severityConfig = {
    High: { color: 'bg-red-500', ring: 'ring-red-500/30', label: 'High' },
    Medium: { color: 'bg-yellow-500', ring: 'ring-yellow-500/30', label: 'Medium' },
    Low: { color: 'bg-green-500', ring: 'ring-green-500/30', label: 'Low' },
}

export default function PulseMapPage() {
  const [filteredAlerts, setFilteredAlerts] = useState(allAlerts);
  const [districtFilter, setDistrictFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState({ High: true, Medium: true, Low: true });
  const { toast } = useToast();

  React.useEffect(() => {
    let alerts = allAlerts;
    if (districtFilter !== 'all') {
      alerts = alerts.filter(a => a.district === districtFilter);
    }
    alerts = alerts.filter(a => severityFilter[a.severity as keyof typeof severityFilter]);
    setFilteredAlerts(alerts);
  }, [districtFilter, severityFilter]);

  const handleSeverityChange = (severity: 'High' | 'Medium' | 'Low', checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
        setSeverityFilter(prev => ({...prev, [severity]: checked}));
    }
  };

  const uniqueDistricts = [...new Set(allAlerts.map(a => a.district))];

  return (
    <TooltipProvider>
    <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            <Card className="md:col-span-3 lg:col-span-4">
                <CardHeader>
                    <CardTitle>Radar Controls</CardTitle>
                    <CardDescription>Filter and manage real-time health alerts across Assam.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="district-filter">Filter by District</Label>
                        <Select value={districtFilter} onValueChange={setDistrictFilter}>
                            <SelectTrigger id="district-filter">
                                <SelectValue placeholder="All Districts" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Districts</SelectItem>
                                {uniqueDistricts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1 space-y-2">
                        <Label>Filter by Severity</Label>
                        <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="high-sev" checked={severityFilter.High} onCheckedChange={(checked) => handleSeverityChange('High', checked)} />
                                <Label htmlFor="high-sev" className="font-medium text-red-600">High</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="medium-sev" checked={severityFilter.Medium} onCheckedChange={(checked) => handleSeverityChange('Medium', checked)} />
                                <Label htmlFor="medium-sev" className="font-medium text-yellow-600">Medium</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="low-sev" checked={severityFilter.Low} onCheckedChange={(checked) => handleSeverityChange('Low', checked)} />
                                <Label htmlFor="low-sev" className="font-medium text-green-600">Low</Label>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Community Health Heatmap</CardTitle>
                <CardDescription>Live visualization of symptom clusters across Assam.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-full aspect-[16/9] bg-muted/20 rounded-lg overflow-hidden border">
                   <Image
                      src="https://placehold.co/900x500.png"
                      alt="Map of Assam"
                      fill
                      className="object-cover"
                      data-ai-hint="assam district map"
                   />
                   {filteredAlerts.map((alert) => (
                     <Tooltip key={alert.id}>
                       <TooltipTrigger asChild>
                         <div className="absolute z-10" style={{ top: alert.coordinates.top, left: alert.coordinates.left, transform: 'translate(-50%, -50%)' }}>
                            <div className="relative group flex items-center justify-center">
                                <div className={cn("h-3 w-3 rounded-full animate-pulse", severityConfig[alert.severity].color)}></div>
                                <div className={cn("absolute h-5 w-5 rounded-full animate-ping", severityConfig[alert.severity].color)}></div>
                            </div>
                         </div>
                       </TooltipTrigger>
                       <TooltipContent>
                           <div className="text-sm">
                                <p className="font-bold">{alert.district}</p>
                                <p><span className="font-semibold">Symptom:</span> {alert.symptom}</p>
                                <p><span className="font-semibold">Reports:</span> {alert.count}</p>
                                <p><span className="font-semibold">Action:</span> {alert.action}</p>
                           </div>
                       </TooltipContent>
                     </Tooltip>
                   ))}
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Respond to emerging health trends based on current alerts.</CardDescription>
            </CardHeader>
            <CardContent>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>
                            <Send className="mr-2 h-4 w-4" />
                            Notify Health Officers
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will send a high-priority notification to all district health officers in the regions with active alerts.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => toast({ title: "Notification Sent", description: "Health officers have been notified of the alerts."})}>
                            Confirm & Send
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    </main>
    </TooltipProvider>
  );
}
