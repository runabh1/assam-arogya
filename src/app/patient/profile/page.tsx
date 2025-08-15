
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dog, User } from 'lucide-react';
import Image from 'next/image';
import image5 from '../../../../images/image5.png';
import image3 from '../../../../images/image3.jpg';
import image4 from '../../../../images/image4.jpg';


export default function ProfilePage() {
  return (
    <>
      <main className="flex-1 md:gap-8">
        <div className="grid gap-8">
          {/* Human Profile */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <Image src={image5} alt="Priyaa" className="rounded-full" />
                <AvatarFallback>
                  P
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">Priyaa</CardTitle>
                <CardDescription>
                  Manage your personal information and contact details.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Priyaa" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="priyaa@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" defaultValue="1990-05-15" />
              </div>
              <div className="md:col-span-2">
                 <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* Pet Profiles */}
          <div className="grid gap-8 md:grid-cols-2">
             <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                   <AvatarImage src={image3.src} alt="Buddy" data-ai-hint="dog" />
                   <AvatarFallback>
                    <Dog className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">Buddy</CardTitle>
                    <CardDescription>Golden Retriever</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="buddy-dob">Date of Birth</Label>
                  <Input id="buddy-dob" type="date" defaultValue="2020-01-20" />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="buddy-notes">Health Notes</Label>
                  <Input id="buddy-notes" defaultValue="Allergic to pollen" />
                </div>
                <div>
                    <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                   <AvatarImage src={image4.src} alt="Lucy" data-ai-hint="cat" />
                   <AvatarFallback>
                    <Dog className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                 <div>
                    <CardTitle className="text-2xl">Lucy</CardTitle>
                    <CardDescription>Domestic Shorthair</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                 <div className="grid gap-2">
                  <Label htmlFor="lucy-dob">Date of Birth</Label>
                  <Input id="lucy-dob" type="date" defaultValue="2021-05-10" />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="lucy-notes">Health Notes</Label>
                  <Input id="lucy-notes" defaultValue="Sensitive stomach" />
                </div>
                 <div>
                    <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
