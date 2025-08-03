
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Bell, Pin, Send, Siren } from 'lucide-react';

const mockAlerts = [
    { district: 'Nalbari', symptom: 'fatigue', increase: '32%', severity: 'High', coordinates: { top: '55%', left: '38%' } },
    { district: 'Sivasagar', symptom: 'ulcers', increase: '5 cases', severity: 'Medium', coordinates: { top: '40%', left: '80%' } },
    { district: 'Dhubri', symptom: 'rash', increase: '12 cases', severity: 'Medium', coordinates: { top: '75%', left: '20%' } },
    { district: 'Dibrugarh', symptom: 'fever', increase: '18%', severity: 'High', coordinates: { top: '30%', left: '85%' } },
    { district: 'Kamrup', symptom: 'fever', increase: '25%', severity: 'High', coordinates: { top: '60%', left: '50%' } },
];

const AssamMapSVG = () => (
    <svg viewBox="0 0 500 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path d="M485.6,83.3c-2-2.3-4.6-3.8-7.5-4.2c-5.1-0.8-9.8,1.4-12.8,5.1l-10.1,12.7c-0.3,0.4-0.8,0.6-1.3,0.6l-20.7-1.1
	c-0.6,0-1.2-0.4-1.4-1l-2.6-6.4c-0.4-1-1.4-1.6-2.5-1.6l-11.1-0.2c-0.9,0-1.7-0.5-2.2-1.3l-5.1-8.2c-0.7-1-1.8-1.6-3-1.6l-11,0.2
	c-0.9,0-1.8-0.5-2.2-1.3l-2.7-4.3c-0.9-1.4-2.5-2.3-4.3-2.3l-10.7,0.4c-1.3,0.1-2.5-0.6-3.1-1.7l-2.3-4.3
	c-0.6-1.1-1.8-1.8-3-1.8l-10.9,0.4c-1.1,0-2.1-0.7-2.6-1.7l-1.8-3.7c-0.6-1.2-1.9-2-3.3-2l-10.7,0.7c-1.6,0.1-3.1-0.8-3.8-2.2
	l-1.3-2.7c-0.6-1.2-1.8-1.9-3.1-1.9l-10.9,0.4c-1.3,0.1-2.5-0.6-3.1-1.7l-2.3-4.3c-0.6-1.1-1.8-1.8-3-1.8l-10.9,0.4
	c-1.1,0-2.1-0.7-2.6-1.7l-1.8-3.7c-0.6-1.2-1.9-2-3.3-2l-10.7,0.7c-1.6,0.1-3.1-0.8-3.8-2.2l-1.3-2.7
	c-0.6-1.2-1.8-1.9-3.1-1.9L242,28.8c-1.3,0.1-2.5-0.6-3.1-1.7l-2.3-4.3c-0.6-1.1-1.8-1.8-3-1.8l-10.9,0.4c-1.1,0-2.1-0.7-2.6-1.7
	l-1.8-3.7c-0.6-1.2-1.9-2-3.3-2l-10.7,0.7c-1.6,0.1-3.1-0.8-3.8-2.2l-1.3-2.7c-0.6-1.2-1.8-1.9-3.1-1.9l-10.9,0.4
	c-0.5,0.1-1,0-1.4-0.2L116.3,1.6c-2.4-1.1-5.2-0.8-7.3,0.8l-8.6,6.3c-1.4,1-3.3,1.3-5,0.8L83.9,7.6C82,7,80,7.3,78.3,8.4l-7,4.8
	c-1,0.7-2.2,0.9-3.4,0.7L47.2,13c-2.4-0.4-4.7,0.7-6.1,2.7l-2.8,4.1c-0.8,1.2-2.1,1.9-3.5,1.9L15.3,22c-2.1,0-4,1.2-4.9,3.1l-1,2
	c-0.6,1.2-1.8,2-3.1,2H2.8C1.3,29.1,0,30.4,0,31.9v4.3c0,0.6,0.2,1.2,0.6,1.6l10,12.4c0.7,0.9,1.8,1.4,2.9,1.4l10.9-0.4
	c1.8-0.1,3.4,1,4,2.7l1.7,4.7c0.4,1.1,1.3,1.9,2.4,2.1l11.1,1.5c1.4,0.2,2.8-0.6,3.4-1.8l2.6-4.9c0.7-1.3,2.1-2.2,3.6-2.2l11-0.2
	c1.6,0,3.1,0.9,3.8,2.3l2,4c0.6,1.2,1.8,2,3.1,2l10.9-0.4c1.8-0.1,3.4,1,4,2.7l1.7,4.7c0.4,1.1,1.3,1.9,2.4,2.1l11.1,1.5
	c1.4,0.2,2.8-0.6,3.4-1.8l2.6-4.9c0.7-1.3,2.1-2.2,3.6-2.2l11-0.2c1.6,0,3.1,0.9,3.8,2.3l2,4c0.6,1.2,1.8,2,3.1,2l10.9-0.4
	c1.8-0.1,3.4,1,4,2.7l1.7,4.7c0.4,1.1,1.3,1.9,2.4,2.1l11.1,1.5c1.4,0.2,2.8-0.6,3.4-1.8l2.6-4.9c0.7-1.3,2.1-2.2,3.6-2.2
	l11-0.2c1.6,0,3.1,0.9,3.8,2.3l2,4c0.6,1.2,1.8,2,3.1,2l10.9-0.4c1.8-0.1,3.4,1,4,2.7l1.7,4.7c0.4,1.1,1.3,1.9,2.4,2.1l11.1,1.5
	c1.4,0.2,2.8-0.6,3.4-1.8l2.6-4.9c0.7-1.3,2.1-2.2,3.6-2.2l11-0.2c1.6,0,3.1,0.9,3.8,2.3l3.8,7.6c0.6,1.2,1.8,2,3.1,2l10.9-0.4
	c1.8-0.1,3.4,1,4,2.7l1.7,4.7c0.4,1.1,1.3,1.9,2.4,2.1l11.1,1.5c1.4,0.2,2.8-0.6,3.4-1.8l2.6-4.9c0.7-1.3,2.1-2.2,3.6-2.2l11-0.2
	c1.6,0,3.1,0.9,3.8,2.3l2.8,5.7c0.6,1.2,1.8,2,3.1,2l10.9-0.4c1.8-0.1,3.4,1,4,2.7l1.7,4.7c0.4,1.1,1.3,1.9,2.4,2.1l11.1,1.5
	c1.4,0.2,2.8-0.6,3.4-1.8l2.6-4.9c0.7-1.3,2.1-2.2,3.6-2.2l11-0.2c1.6,0,3.1,0.9,3.8,2.3l3.8,7.6c0.6,1.2,1.8,2,3.1,2l10.9-0.4
	c1.8-0.1,3.4,1,4,2.7l1.7,4.7c0.4,1.1,1.3,1.9,2.4,2.1L480,217.1c0.8,0.1,1.6-0.2,2.2-0.8l7.2-7.2c1.6-1.6,2.5-3.8,2.5-6.1v-8
	c0-2-0.6-3.8-1.7-5.4l-11.4-16.7c-0.9-1.3-2.4-2.2-4-2.2l-10.9,0.4c-1.3,0.1-2.5-0.6-3.1-1.7l-2.3-4.3c-0.6-1.1-1.8-1.8-3-1.8
	l-10.9,0.4c-1.1,0-2.1-0.7-2.6-1.7l-1.8-3.7c-0.6-1.2-1.9-2-3.3-2l-10.7,0.7c-1.6,0.1-3.1-0.8-3.8-2.2l-1.3-2.7
	c-0.6-1.2-1.8-1.9-3.1-1.9l-10.9,0.4c-1.3,0.1-2.5-0.6-3.1-1.7l-2.3-4.3c-0.6-1.1-1.8-1.8-3-1.8l-10.9,0.4c-1.1,0-2.1-0.7-2.6-1.7
	l-1.8-3.7c-0.6-1.2-1.9-2-3.3-2l-10.7,0.7c-1.6,0.1-3.1-0.8-3.8-2.2L304,115.8c-0.6-1.2-1.8-1.9-3.1-1.9l-10.9,0.4
	c-1.3,0.1-2.5-0.6-3.1-1.7l-2.3-4.3c-0.6-1.1-1.8-1.8-3-1.8l-10.9,0.4c-1.1,0-2.1-0.7-2.6-1.7l-1.8-3.7c-0.6-1.2-1.9-2-3.3-2
	l-10.7,0.7c-1.6,0.1-3.1-0.8-3.8-2.2l-1.3-2.7c-0.6-1.2-1.8-1.9-3.1-1.9l-10.9,0.4c-1.3,0.1-2.5-0.6-3.1-1.7L181,81.4
	c-1.1-1.7-3-2.8-5-2.8h-10.5c-2.4,0-4.6,1.4-5.6,3.6l-4.5,9.9c-0.6,1.3-1.9,2.2-3.3,2.2l-10.9-0.4c-1.3-0.1-2.5,0.6-3.1,1.7
	l-2.3,4.3c-0.6,1.1-1.8,1.8-3,1.8l-10.9-0.4c-1.1,0-2.1,0.7-2.6,1.7l-1.8,3.7c-0.6,1.2-1.9,2-3.3,2l-10.7-0.7
	c-1.6-0.1-3.1,0.8-3.8,2.2l-1.3,2.7c-0.6,1.2-1.8,1.9-3.1,1.9l-10.9-0.4c-1.3-0.1-2.5,0.6-3.1,1.7l-2.3,4.3
	c-0.6,1.1-1.8,1.8-3,1.8l-10.9-0.4c-1.1,0-2.1,0.7-2.6,1.7l-1.8,3.7c-0.6,1.2-1.9,2-3.3,2l-10.7-0.7c-1.6-0.1-3.1,0.8-3.8,2.2
	l-1.3,2.7c-0.6,1.2-1.8,1.9-3.1,1.9H12.6c-2.1,0-4,1.2-4.9,3.1l-1,2c-0.6,1.2-1.8,2-3.1,2H0v12.4c0,2.1,1.2,4,3.1,4.9l2,1
	c1.2,0.6,2,1.8,2,3.1v10.9c0,1.3,0.6,2.5,1.7,3.1l4.3,2.3c1.1,0.6,1.8,1.8,1.8,3v10.9c0,1.1,0.7,2.1,1.7,2.6l3.7,1.8
	c1.2,0.6,2,1.9,2,3.3v10.7c0,1.6,0.8,3.1,2.2,3.8l2.7,1.3c1.2,0.6,1.9,1.8,1.9,3.1v10.9c0,1.3,0.6,2.5,1.7,3.1l4.3,2.3
	c1.1,0.6,1.8,1.8,1.8,3v10.9c0,1.1,0.7,2.1,1.7,2.6l3.7,1.8c1.2,0.6,2,1.9,2,3.3v10.7c0,1.6,0.8,3.1,2.2,3.8l2.7,1.3
	c1.2,0.6,1.9,1.8,1.9,3.1v10.9c0,1.3,0.6,2.5,1.7,3.1l4.3,2.3c1.1,0.6,1.8,1.8,1.8,3l0.4,10.9c0.1,1.3,1.1,2.3,2.4,2.3h4.3
	c0.6,0,1.2-0.2,1.6-0.6l12.4-10c0.9-0.7,1.4-1.8,1.4-2.9l-0.4-10.9c-0.1-1.8,1-3.4,2.7-4l4.7-1.7c1.1-0.4,1.9-1.3,2.1-2.4l1.5-11.1
	c0.2-1.4-0.6-2.8-1.8-3.4l-4.9-2.6c-1.3-0.7-2.2-2.1-2.2-3.6l-0.2-11c0-1.6,0.9-3.1,2.3-3.8l4-2c1.2-0.6,2-1.8,2-3.1l-0.4-10.9
	c-0.1-1.8,1-3.4,2.7-4l4.7-1.7c1.1-0.4,1.9-1.3,2.1-2.4l1.5-11.1c0.2-1.4-0.6-2.8-1.8-3.4l-4.9-2.6c-1.3-0.7-2.2-2.1-2.2-3.6
	l-0.2-11c0-1.6,0.9-3.1,2.3-3.8l4-2c1.2-0.6,2-1.8,2-3.1l-0.4-10.9c-0.1-1.8,1-3.4,2.7-4l4.7-1.7c1.1-0.4,1.9-1.3,2.1-2.4l1.5-11.1
	c0.2-1.4-0.6-2.8-1.8-3.4l-4.9-2.6c-1.3-0.7-2.2-2.1-2.2-3.6l-0.2-11c0-1.6,0.9-3.1,2.3-3.8l4-2c1.2-0.6,2-1.8,2-3.1l-0.4-10.9
	c-0.1-1.8,1-3.4,2.7-4l4.7-1.7c1.1-0.4,1.9-1.3,2.1-2.4l1.5-11.1c0.2-1.4-0.6-2.8-1.8-3.4l-4.9-2.6c-1.3-0.7-2.2-2.1-2.2-3.6
	l-0.2-11c0-1.6,0.9-3.1,2.3-3.8l4-2c1.2-0.6,2-1.8,2-3.1l0.2-10.9c0-1.8,1.2-3.3,2.9-3.8l4.7-1.3c1.4-0.4,2.7-1.4,3.3-2.7
	l2.6-5.1c0.8-1.5,2.4-2.5,4.2-2.5l10.7-0.2c2.1-0.1,4-1.3,4.9-3.2l2.8-5.9c0.8-1.6,2.3-2.7,4.1-2.9l10.9-1.1
	c2.3-0.3,4.4-1.9,5.4-4l2-4.1c0.9-1.8,2.7-3,4.7-3h8.6c1.1,0,2.1-0.5,2.8-1.3l8.8-10.9c1.6-2,3.9-3.2,6.4-3.2h8
	c1.8,0,3.5-0.9,4.6-2.4L485.6,83.3z" fill="#E0E0E0"/>
    </svg>
);


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
                        <div 
                            className="relative w-full aspect-[16/10] bg-muted/30 rounded-lg overflow-hidden"
                        >
                           <div className="absolute inset-0">
                                <AssamMapSVG />
                           </div>
                           {mockAlerts.map((alert, index) => (
                             <div key={index} className="absolute z-10" style={{ top: alert.coordinates.top, left: alert.coordinates.left, transform: 'translate(-50%, -50%)' }}>
                                <div className={`relative group flex items-center justify-center`}>
                                    <Siren className={`h-6 w-6 animate-pulse ${alert.severity === 'High' ? 'text-red-500' : 'text-yellow-500'}`} />
                                    <div className="absolute bottom-full mb-2 w-max hidden group-hover:block bg-background p-2 rounded-md shadow-lg text-xs z-20">
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
