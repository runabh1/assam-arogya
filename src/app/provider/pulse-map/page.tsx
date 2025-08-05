
'use client';

import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
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
  position: { lat: number; lng: number };
  action: string;
}

const allAlerts: Alert[] = [
    { id: 1, district: 'Sivasagar', symptom: 'Mouth Ulcers', count: 6, severity: 'High', position: { lat: 26.98, lng: 94.63 }, action: 'Check water quality' },
    { id: 2, district: 'Barpeta', symptom: 'Fever', count: 3, severity: 'Medium', position: { lat: 26.32, lng: 91.00 }, action: 'Monitor trend' },
    { id: 3, district: 'Guwahati', symptom: 'Chest Pain', count: 7, severity: 'High', position: { lat: 26.14, lng: 91.73 }, action: 'Alert cardiologists' },
    { id: 4, district: 'Dibrugarh', symptom: 'Cough', count: 2, severity: 'Normal', position: { lat: 27.47, lng: 94.91 }, action: 'Continue monitoring' },
];

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.5rem',
};

const center = {
  lat: 26.4,
  lng: 92.9
};

const severityIcons = {
  High: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  Medium: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  Normal: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
}

export default function PulseMapPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  const [filteredAlerts, setFilteredAlerts] = useState(allAlerts);
  const [districtFilter, setDistrictFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState({ High: true, Medium: true, Normal: true });
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
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

  const handleMarkerClick = (id: number) => {
    setActiveMarker(id);
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

        <Card>
            <CardHeader>
                <CardTitle>Community Health Heatmap</CardTitle>
                <CardDescription>Live visualization of symptom clusters across Assam.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={7}
                    >
                        {filteredAlerts.map((alert) => (
                            <Marker
                                key={alert.id}
                                position={alert.position}
                                icon={{
                                  url: severityIcons[alert.severity],
                                  scaledSize: new window.google.maps.Size(32, 32),
                                }}
                                onClick={() => handleMarkerClick(alert.id)}
                            >
                                {activeMarker === alert.id && (
                                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                        <div className="text-sm">
                                            <p className="font-bold">{alert.district}</p>
                                            <p><span className="font-semibold">Symptom:</span> {alert.symptom}</p>
                                            <p><span className="font-semibold">Reports:</span> {alert.count}</p>
                                            <p><span className="font-semibold">Action:</span> {alert.action}</p>
                                        </div>
                                    </InfoWindow>
                                )}
                            </Marker>
                        ))}
                    </GoogleMap>
                ) : (
                  <div style={containerStyle} className="flex items-center justify-center bg-muted rounded-lg">
                    <p>Loading map...</p>
                  </div>
                )}
            </CardContent>
        </Card>
    </main>
  );
}
