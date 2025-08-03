
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Bell, Pin, Send, Siren } from 'lucide-react';

const mockAlerts = [
    { district: 'Nalbari', symptom: 'fatigue', increase: '32%', severity: 'High', coordinates: { top: '45%', left: '40%' } },
    { district: 'Sivasagar', symptom: 'ulcers', increase: '5 cases', severity: 'Medium', coordinates: { top: '40%', left: '80%' } },
    { district: 'Dhubri', symptom: 'rash', increase: '12 cases', severity: 'Medium', coordinates: { top: '65%', left: '20%' } },
    { district: 'Dibrugarh', symptom: 'fever', increase: '18%', severity: 'High', coordinates: { top: '30%', left: '85%' } },
    { district: 'Kamrup', symptom: 'fever', increase: '25%', severity: 'High', coordinates: { top: '50%', left: '50%' } },
];

export default function PulseMapPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Radar Controls</CardTitle>
                        <CardDescription>Filter and manage alerts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                             <label htmlFor="symptom-filter" className="text-sm font-medium">Filter by Symptom</label>
                            <Select>
                                <SelectTrigger id="symptom-filter">
                                    <SelectValue placeholder="All Symptoms" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fatigue">Fatigue</SelectItem>
                                    <SelectItem value="ulcers">Ulcers</SelectItem>
                                    <SelectItem value="rash">Rash</SelectItem>
                                    <SelectItem value="fever">Fever</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                             <label htmlFor="district-filter" className="text-sm font-medium">Filter by District</label>
                            <Select>
                                <SelectTrigger id="district-filter">
                                    <SelectValue placeholder="All Districts" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nalbari">Nalbari</SelectItem>
                                    <SelectItem value="sivasagar">Sivasagar</SelectItem>
                                    <SelectItem value="dhubri">Dhubri</SelectItem>
                                    <SelectItem value="dibrugarh">Dibrugarh</SelectItem>
                                    <SelectItem value="kamrup">Kamrup</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Active Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                       {mockAlerts.map((alert, index) => (
                         <div key={index} className={`p-2 rounded-lg border-l-4 ${alert.severity === 'High' ? 'border-red-500 bg-red-500/10' : 'border-yellow-500 bg-yellow-500/10'}`}>
                            <p className="font-semibold text-sm">{alert.district}: {alert.symptom} spike</p>
                            <p className="text-xs text-muted-foreground">Increase: {alert.increase}</p>
                         </div>
                       ))}
                    </CardContent>
                </Card>
            </div>

            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Community Health Heatmap</CardTitle>
                        <CardDescription>Live visualization of symptom clusters across Assam.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full aspect-[16/10] bg-muted/30 rounded-lg">
                           <Image
                            src="https://placehold.co/800x500.png"
                            layout="fill"
                            objectFit="cover"
                            alt="Map of Assam"
                            className="opacity-20"
                            data-ai-hint="assam map"
                           />
                           {mockAlerts.map((alert, index) => (
                             <div key={index} className="absolute" style={{ top: alert.coordinates.top, left: alert.coordinates.left }}>
                                <div className={`relative group flex items-center justify-center`}>
                                    <Siren className={`h-6 w-6 animate-pulse ${alert.severity === 'High' ? 'text-red-500' : 'text-yellow-500'}`} />
                                    <div className="absolute bottom-full mb-2 w-max hidden group-hover:block bg-background p-2 rounded-md shadow-lg text-xs">
                                        <strong>{alert.district}</strong>: {alert.increase} spike in {alert.symptom}
                                    </div>
                                </div>
                             </div>
                           ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
         <Card>
            <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Respond to emerging health trends.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Notify District Health Officers
                </Button>
                <Button variant="secondary">
                     <Bell className="mr-2 h-4 w-4" />
                    Auto-Assign Mobile Medical Units
                </Button>
            </CardContent>
        </Card>
    </main>
  );
}
