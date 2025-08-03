
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Siren, Send } from 'lucide-react';
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

const allAlerts = [
    { id: 1, district: 'Nalbari', symptom: 'Fatigue', count: 6, severity: 'High', coordinates: { top: '65%', left: '42%' } },
    { id: 2, district: 'Sivasagar', symptom: 'Ulcers', count: 5, severity: 'High', coordinates: { top: '42%', left: '82%' } },
    { id: 3, district: 'Barpeta', symptom: 'Fever', count: 3, severity: 'Medium', coordinates: { top: '70%', left: '35%' } },
    { id: 4, district: 'Dibrugarh', symptom: 'Fever', count: 8, severity: 'High', coordinates: { top: '30%', left: '88%' } },
    { id: 5, district: 'Kamrup', symptom: 'Fever', count: 4, severity: 'Medium', coordinates: { top: '60%', left: '50%' } },
    { id: 6, district: 'Dhubri', symptom: 'Rash', count: 12, severity: 'High', coordinates: { top: '80%', left: '22%' } },
];

const AssamMapSVG = () => (
    <svg viewBox="0 0 900 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path d="M855.2 148.8L852.8 148.1C851.9 147.9 851.1 148.3 850.7 149.1L845.1 160.8L824.2 159.4L821.5 152.9L809.9 152.7C808.9 152.7 808.1 152.2 807.6 151.4L802.4 143.1L791.1 143.3L788.8 138.9L777.6 139.3L774.4 137.5L769.4 128.8L758.8 129.2L756.2 124.9L745.3 125.3L742.6 121L731.8 121.4L729.8 117.7L718.9 118.1L717.1 114.4L706.4 114.9L704.4 111.1L693.8 111.6L692 107.8L681.4 108.3L679.5 104.6L668.9 105.1L667.1 101.4L656.5 101.8L645.1 102.4L642.5 98.2L631.7 98.6L629.4 94.2L618.6 94.6L616.4 90.3L605.5 90.7L594.1 91.3L591.5 87L580.7 87.4L578.4 83.1L567.6 83.5L565.3 79.1L554.5 79.5L552.3 75.2L541.4 75.6L529.8 76.2L527.1 71.8L516.3 72.2L513.8 67.8L503 68.2L500.5 63.8L489.7 64.2L487.2 59.9L476.4 60.3L473.9 55.9L463.1 56.3L460.6 52L449.8 52.4L447.3 48L436.4 48.4L433.8 44.1L423 44.5L420.4 40.1L409.6 40.5L407.1 36.2L396.3 36.6L393.8 32.2L383 32.6L380.4 28.3L369.6 28.7L367.1 24.3L356.3 24.7L353.8 20.4L343 20.8L340.4 16.4L329.6 16.8L327.1 12.5L316.3 12.9L313.8 8.5L303 8.9L293.4 9.4L290.3 4.9L226.7 10.6L219.7 1.4L208.6 7.4L196.4 8.6L185.8 11.2L171.3 15.1L156.9 20L150.3 20.8L139.7 21.6L129.2 23L115.1 25.1L107.5 25.9L98.6 28L89.8 30.8L83.8 32.5L68.4 34.6L57.5 35.6L44.1 37.8L35.2 41.2L28.1 44.3L23.4 48.2L16.2 55.1L13.1 57.8L9.9 63.1L8.3 65.9L8.3 71.7L9.1 74L15.3 84.1L19.3 87.2L25.1 88.5L35.2 88.1L40.2 90.9L42.2 95.8L53.1 97.4L56.5 95.5L62.7 100.2L66.3 98L77.2 97.8L80.6 100.2L82.9 104L86.6 101.8L97.5 101.6L101 104L103.4 108.9L114.4 110.4L117.8 108.5L120.4 113.4L131.5 113.2L135.2 115.7L137.6 120.1L148.6 119.9L152.3 122.3L154.7 126.7L165.7 126.5L169.4 128.9L171.8 133.3L182.8 133.1L186.5 135.5L188.9 140L199.9 139.8L210.8 139.6L214.3 142.2L216.5 146.4L227.4 146.2L230.9 148.8L233.1 153L244 152.8L247.5 155.4L249.7 159.7L260.6 159.5L271.5 159.3L274.9 161.8L278.8 168.8L289.7 168.4L293.2 171L295.4 175.2L306.3 175L309.8 177.6L312 181.8L322.9 181.6L326.4 184.2L328.6 188.4L339.5 188.2L343 190.8L345.2 195.1L356.1 194.9L367.1 194.7L370.4 197.2L372.6 201.4L383.5 201.2L386.9 203.7L389.1 207.9L399.9 207.7L410.8 207.5L414.2 210.1L416.4 214.3L427.3 214.1L430.7 216.6L432.9 220.8L443.8 220.6L454.7 220.4L458.1 223L460.3 227.2L471.2 227L482.1 226.8L485.5 229.3L487.6 233.5L498.5 233.3L509.4 233.1L512.8 235.6L516.7 242.6L527.6 242.2L531.1 244.8L533.3 249L544.2 248.8L547.7 251.4L549.9 255.6L560.8 255.4L571.7 255.2L575.1 257.7L577.3 261.9L588.2 261.7L599.1 261.5L602.5 264.1L604.7 268.3L615.6 268.1L626.5 267.9L629.9 270.4L632.1 274.6L643 274.4L653.9 274.2L657.3 276.7L659.5 281L670.4 280.8L681.3 280.6L684.7 283.1L686.9 287.3L697.8 287.1L708.7 286.9L712.1 289.4L714.3 293.6L725.2 293.4L736.1 293.2L739.5 295.7L741.7 300L752.6 299.8L763.5 299.6L766.9 302.1L769.1 306.3L780 306.1L782.4 308.2L791.1 307.7L793.5 309.8L797.9 309.4L800.3 311.5L807.5 311.1L810 313.2L815.1 312.8L817.5 314.9L827.4 314.4L830 316.5L838.2 316.1L840.8 318.2L851.3 317.7L854 319.8L862.6 319.3L865.3 321.4L873.3 321L876 323.1L882.2 322.6L884.9 324.7L890.3 324.2L893.1 326.3L895.8 325.9L898.6 328L900 327.5L899.6 318.1L898.6 309.5L896.7 298.5L896.3 294.9L893.8 290.6L883 291L880.6 286.7L869.8 287.1L867.3 282.8L856.5 283.2L854 278.8L843.2 279.2L840.8 274.9L830 275.3L827.5 271L816.7 271.4L814.2 267L803.4 267.4L800.9 263.1L790.1 263.5L787.6 259.2L776.8 259.6L774.3 255.2L763.5 255.6L761 251.3L750.2 251.7L747.7 247.4L736.9 247.8L734.4 243.4L723.6 243.8L721.1 239.5L710.3 239.9L707.8 235.6L697 236L694.5 231.6L683.7 232L681.2 227.7L670.4 228.1L667.9 223.8L657.1 224.2L654.6 219.8L643.8 220.2L641.3 215.9L630.5 216.3L628.1 212L617.3 212.4L614.8 208L604 208.4L601.5 204.1L590.7 204.5L588.2 200.2L577.4 200.6L574.9 196.2L564.1 196.6L561.6 192.3L550.8 192.7L548.3 188.4L537.5 188.8L535.1 184.4L524.3 184.8L521.8 180.5L511 180.9L508.5 176.6L497.7 177L495.2 172.6L484.4 173L481.9 168.7L471.1 169.1L468.6 164.8L457.8 165.2L455.3 160.8L444.5 161.2L442 156.9L431.2 157.3L428.7 153L417.9 153.4L415.4 149L404.6 149.4L393.9 149.8L390.8 145.2L380.1 145.6L377.1 141L366.4 141.4L363.3 136.8L352.6 137.2L349.5 132.6L338.8 133L335.8 128.4L325.1 128.8L322.1 124.2L311.4 124.6L308.3 120L297.6 120.4L286.9 120.8L284.1 116.4L273.4 116.8L270.6 112.4L260 112.8L257.2 108.4L246.5 108.8L243.7 104.4L233 104.8L221.7 105.2L219.2 101L208.5 101.4L206 97.2L195.3 97.6L192.8 93.4L182.1 93.8L179.6 89.6L168.9 90L166.4 85.8L155.7 86.2L153.2 82L142.5 82.4L140.2 78.4L128.7 78.8L124.9 72.8L113.6 74L109.1 65.1L99.5 66.8L95 75.7L85.4 77.2L81.2 68.8L71.6 70.3L67.4 62L58.7 63.8L54.2 72.7L45.4 74.2L41.3 65.9L32.5 67.8L27.2 77.3L16.4 76.2L11.7 84.8L2.1 82.7L1.2 101L3 113.4L6.9 123.6L12.5 130.6L18.7 135L24.8 137.9L33.7 141.5L44.8 145.4L57.2 148.8L66.7 150.9L73.9 152.2L78.6 151.7L87.8 150.1L96.9 147.9L106.1 145.1L115.3 141.8L124.5 138L133.6 133.8L142.8 129.2L152 124.2L161.1 119L170.3 113.5L179.5 107.8L188.7 102L197.8 96.1L207 90.1L216.2 84L225.3 77.9L234.5 71.9L243.7 66L252.8 60.3L262 54.8L271.2 49.6L280.3 44.6L289.5 40L298.7 35.8L307.8 32L317 28.6L326.2 25.6L335.3 23L344.5 20.8L353.7 19.1L362.8 17.8L372 16.9L381.2 16.4L390.3 16.4L399.5 16.8L408.7 17.5L417.8 18.7L427 20.2L436.2 22L445.3 24.3L454.5 26.9L463.7 29.8L472.8 33.1L482 36.8L491.2 40.8L500.3 45.2L509.5 49.9L518.7 54.9L527.8 60.3L537 65.9L546.2 71.8L555.3 77.9L564.5 84.3L573.7 90.8L582.8 97.6L592 104.5L601.2 111.6L610.3 118.8L619.5 126.1L628.7 133.5L637.8 140.9L647 148.2L656.2 155.4L665.3 162.5L674.5 169.4L683.7 176.1L692.8 182.5L702 188.7L711.2 194.5L720.3 200L729.5 205.1L738.7 209.9L747.8 214.3L757 218.4L766.2 222L775.3 225.3L784.5 228.2L793.7 230.7L802.8 232.8L812 234.6L821.2 236.1L830.3 237.2L839.5 238L848.7 238.5L855.2 238.5L861.3 234.1L862.9 224.2L860.2 216.5L857.4 208.2L854.7 200L851.9 191.8L849.2 183.5L846.4 175.3L843.7 167L840.9 158.8L855.2 148.8Z" fill="#E0E0E0" stroke="#BDBDBD" strokeWidth="1"/>
    </svg>
);

export default function PulseMapPage() {
  const [filteredAlerts, setFilteredAlerts] = useState(allAlerts);
  const [districtFilter, setDistrictFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState({ High: true, Medium: true });
  const { toast } = useToast();

  React.useEffect(() => {
    let alerts = allAlerts;
    if (districtFilter !== 'all') {
      alerts = alerts.filter(a => a.district === districtFilter);
    }
    alerts = alerts.filter(a => severityFilter[a.severity as keyof typeof severityFilter]);
    setFilteredAlerts(alerts);
  }, [districtFilter, severityFilter]);

  const handleSeverityChange = (severity: 'High' | 'Medium', checked: boolean | 'indeterminate') => {
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
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
             <div className="md:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Community Health Heatmap</CardTitle>
                        <CardDescription>Live visualization of symptom clusters across Assam.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full aspect-[16/9] bg-muted/20 rounded-lg overflow-hidden border">
                           <div className="absolute inset-0">
                                <AssamMapSVG />
                           </div>
                           {filteredAlerts.map((alert) => (
                             <div key={alert.id} className="absolute z-10" style={{ top: alert.coordinates.top, left: alert.coordinates.left, transform: 'translate(-50%, -50%)' }}>
                                <div className="relative group flex items-center justify-center">
                                    <div className={`h-4 w-4 rounded-full ${alert.severity === 'High' ? 'bg-red-500' : 'bg-yellow-500'} animate-pulse`}></div>
                                    <div className={`absolute h-6 w-6 rounded-full ${alert.severity === 'High' ? 'bg-red-500/30' : 'bg-yellow-500/30'} animate-ping`}></div>
                                    <div className="absolute bottom-full mb-2 w-max hidden group-hover:block bg-background p-2 rounded-md shadow-lg text-xs z-20 border">
                                        <p className="font-bold">{alert.district}</p>
                                        <p>{alert.count} cases of {alert.symptom}</p>
                                        <p className="text-muted-foreground">Action: Notify DHO</p>
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
  );
}

    