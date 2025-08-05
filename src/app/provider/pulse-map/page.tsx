
'use client';

import React, { useState } from 'react';
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

type AlertSeverity = 'High' | 'Medium' | 'Normal';

type Alert = {
  id: number;
  district: string;
  symptom: string;
  count: number;
  severity: AlertSeverity;
  position: { x: number; y: number }; // Using x/y for SVG coordinates
  action: string;
}

const allAlerts: Alert[] = [
    { id: 1, district: 'Sivasagar', symptom: 'Mouth Ulcers', count: 6, severity: 'High', position: { x: 750, y: 380 }, action: 'Check water quality' },
    { id: 2, district: 'Barpeta', symptom: 'Fever', count: 3, severity: 'Medium', position: { x: 280, y: 300 }, action: 'Monitor trend' },
    { id: 3, district: 'Guwahati', symptom: 'Chest Pain', count: 7, severity: 'High', position: { x: 380, y: 390 }, action: 'Alert cardiologists' },
    { id: 4, district: 'Dibrugarh', symptom: 'Cough', count: 2, severity: 'Normal', position: { x: 800, y: 250 }, action: 'Continue monitoring' },
    { id: 5, district: 'Nalbari', symptom: 'Fatigue', count: 12, severity: 'High', position: { x: 320, y: 340 }, action: 'Investigate cluster' },
];

const severityColors: Record<AlertSeverity, string> = {
  High: 'fill-red-500',
  Medium: 'fill-yellow-500',
  Normal: 'fill-green-500',
}

export default function PulseMapPage() {
  const [filteredAlerts, setFilteredAlerts] = useState(allAlerts);
  const [districtFilter, setDistrictFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState({ High: true, Medium: true, Normal: true });
  const [activeAlert, setActiveAlert] = useState<Alert | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    let alerts = allAlerts;
    if (districtFilter !== 'all') {
      alerts = alerts.filter(a => a.district === districtFilter);
    }
    alerts = alerts.filter(a => severityFilter[a.severity as keyof typeof severityFilter]);
    setFilteredAlerts(alerts);
  }, [districtFilter, severityFilter]);

  const handleSeverityChange = (severity: 'High' | 'Medium' | 'Normal', checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
        setSeverityFilter(prev => ({...prev, [severity]: checked}));
    }
  };
  
  const uniqueDistricts = [...new Set(allAlerts.map(a => a.district))];

  return (
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
                                <Checkbox id="low-sev" checked={severityFilter.Normal} onCheckedChange={(checked) => handleSeverityChange('Normal', checked)} />
                                <Label htmlFor="low-sev" className="font-medium text-green-600">Normal</Label>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end">
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
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Community Health Heatmap</CardTitle>
                    <CardDescription>Live visualization of symptom clusters across Assam.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full" onMouseLeave={() => setActiveAlert(null)}>
                        {/* Simplified Assam Map SVG */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1000 600"
                            className="w-full h-auto bg-muted/20 rounded-lg border"
                        >
                            <path d="M991.13,382,925.39,343.4,900.5,301.17,860.84,272.58,829,220.14l-52-32.55-23-28.84-29.35-41-17.5-23.8L658,41.21l-36.8,1.64L577.4,61.1,532.51,51,507,17.47,442.22,2.5,417.33,26.74,360,19.12,319,30.25,296.2,59.46,231,77.34l-53.7,29.1L134.4,141.5l-23,21.67-27.1,43.08-31.42,28.84-25,32.8L8.28,318.51,6.86,419.8,25.43,454,80.1,489.2l13,19.92,19.1,23.8,43.3,21.41,33.5,31.21,114.6,22.14,64.8-11.47,51.8-21.41,29.3-36.88,88.4-44.42,52.8-6.55,54.9,13.11,36.7,22.95,49,42.82,41.9,18.28,40.8,32.28,47.8-23.53,13.7-27.42Z" 
                            className="fill-background stroke-border stroke-2"
                            />

                            {/* Alert Pins */}
                            {filteredAlerts.map((alert) => (
                                <g key={alert.id} onMouseEnter={() => setActiveAlert(alert)}>
                                    <circle
                                        cx={alert.position.x}
                                        cy={alert.position.y}
                                        r="12"
                                        className={`${severityColors[alert.severity]} opacity-30 animate-pulse`}
                                    />
                                    <circle
                                        cx={alert.position.x}
                                        cy={alert.position.y}
                                        r="6"
                                        className={`${severityColors[alert.severity]} stroke-white stroke-2 cursor-pointer`}
                                    />
                                </g>
                            ))}
                        </svg>

                         {/* Tooltip */}
                        {activeAlert && (
                            <div 
                                className="absolute p-3 bg-card border rounded-lg shadow-lg text-sm transition-all pointer-events-none"
                                style={{
                                    left: `${activeAlert.position.x}px`,
                                    top: `${activeAlert.position.y}px`,
                                    transform: 'translate(15px, -100%)' // Offset from pin
                                }}
                            >
                                <p className="font-bold">{activeAlert.district}</p>
                                <p><span className="font-semibold">Symptom:</span> {activeAlert.symptom}</p>
                                <p><span className="font-semibold">Reports:</span> {activeAlert.count}</p>
                                <p><span className="font-semibold">Action:</span> {activeAlert.action}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Alert Details</CardTitle>
                    <CardDescription>Details for the selected health alert.</CardDescription>
                </CardHeader>
                <CardContent>
                    {activeAlert ? (
                        <div className="space-y-4">
                            <div>
                                <Label>District</Label>
                                <p className="font-semibold text-lg">{activeAlert.district}</p>
                            </div>
                            <div>
                                <Label>Symptom</Label>
                                <p className="font-semibold">{activeAlert.symptom}</p>
                            </div>
                            <div>
                                <Label>Severity</Label>
                                <p className={`font-semibold ${severityColors[activeAlert.severity].replace('fill', 'text')}`}>{activeAlert.severity}</p>
                            </div>
                            <div>
                                <Label>Reported Cases</Label>
                                <p className="font-semibold">{activeAlert.count}</p>
                            </div>
                            <div>
                                <Label>Suggested Action</Label>
                                <p className="font-semibold">{activeAlert.action}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-10">
                            <p>Hover over an alert on the map to see details here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </main>
  );
}
