
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Calendar,
  LayoutDashboard,
  Menu,
  Users,
  User,
  Map,
  Send,
} from "lucide-react";

import { Logo } from "@/components/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const pageTitles: { [key: string]: string } = {
  "/provider/dashboard": "Dashboard",
  "/provider/analytics": "Predictive Analytics",
  "/provider/patients": "Patient Management",
  "/provider/patients/send-report": "Send Report",
  "/provider/calendar": "Calendar",
  "/provider/pulse-map": "Arogya PulseMap™",
};

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };
  
  const title = pageTitles[pathname] || "Dashboard";

  return (
     <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6 text-primary" />
              <span className="">Arogya Mitra</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
               <Link
                href="/provider/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive("/provider/dashboard") ? "bg-muted text-primary" : ""}`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/provider/pulse-map"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive("/provider/pulse-map") ? "bg-muted text-primary" : ""}`}
              >
                <Map className="h-4 w-4" />
                PulseMap
              </Link>
              <Link
                href="/provider/analytics"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive("/provider/analytics") ? "bg-muted text-primary" : ""}`}
              >
                <BarChart2 className="h-4 w-4" />
                Predictive Analytics
              </Link>
              <Link
                href="/provider/patients"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive("/provider/patients") ? "bg-muted text-primary" : ""}`}
              >
                <Users className="h-4 w-4" />
                Patients
              </Link>
              <Link
                href="/provider/calendar"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive("/provider/calendar") ? "bg-muted text-primary" : ""}`}
              >
                <Calendar className="h-4 w-4" />
                Calendar
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="sr-only">Arogya Mitra</span>
                </Link>
                <Link
                  href="/provider/dashboard"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isActive("/provider/dashboard") ? "bg-muted text-foreground" : ""}`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/provider/pulse-map"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isActive("/provider/pulse-map") ? "bg-muted text-foreground" : ""}`}
                >
                  <Map className="h-5 w-5" />
                  PulseMap
                </Link>
                 <Link
                  href="/provider/analytics"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isActive("/provider/analytics") ? "bg-muted text-foreground" : ""}`}
                >
                  <BarChart2 className="h-5 w-5" />
                  Predictive Analytics
                </Link>
                <Link
                  href="/provider/patients"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isActive("/provider/patients") ? "bg-muted text-foreground" : ""}`}
                >
                  <Users className="h-5 w-5" />
                  Patients
                </Link>
                <Link
                  href="/provider/calendar"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isActive("/provider/calendar") ? "bg-muted text-foreground" : ""}`}
                >
                  <Calendar className="h-5 w-5" />
                  Calendar
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
           <div className="w-full flex-1">
             <h1 className="font-semibold text-lg">{title}</h1>
           </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
