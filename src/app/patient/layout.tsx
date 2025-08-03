

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  FileText,
  FileCheck,
  LayoutDashboard,
  Search,
  Users,
  Bell,
  User,
  Beaker,
  ShieldCheck,
  GitCommitVertical,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { Menu } from "lucide-react";

const pageTitles: { [key: string]: string } = {
  "/patient/dashboard": "Dashboard",
  "/patient/profile": "My Profiles",
  "/patient/navigator": "AI Health Navigator",
  "/patient/find-provider": "Find a Provider",
  "/patient/records": "Medical Records",
  "/patient/report-analyzer": "AI Report Analyzer",
  "/patient/reminders": "Health Reminders",
  "/patient/book-test": "Book a Diagnostic Test",
  "/patient/predictive-health": "Predictive Health",
  "/patient/genome-guardian": "Genome Guardian",
};

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const title = pageTitles[pathname] || "Dashboard";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6 text-primary" />
              <span className="">Arogya Assam</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/patient/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive("/patient/dashboard") ? "bg-muted text-primary" : ""
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/patient/profile"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive("/patient/profile") ? "bg-muted text-primary" : ""
                }`}
              >
                <Users className="h-4 w-4" />
                My Profiles
              </Link>
              <Link
                href="/patient/navigator"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive("/patient/navigator") ? "bg-muted text-primary" : ""
                }`}
              >
                <Bot className="h-4 w-4" />
                AI Health Navigator
              </Link>
              <Link
                href="/patient/report-analyzer"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive("/patient/report-analyzer")
                    ? "bg-muted text-primary"
                    : ""
                }`}
              >
                <FileCheck className="h-4 w-4" />
                AI Report Analyzer
              </Link>
               <Link
                href="/patient/predictive-health"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive("/patient/predictive-health")
                    ? "bg-muted text-primary"
                    : ""
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                Predictive Health
              </Link>
               <Link
                href="/patient/genome-guardian"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive("/patient/genome-guardian")
                    ? "bg-muted text-primary"
                    : ""
                }`}
              >
                <GitCommitVertical className="h-4 w-4" />
                Genome Guardian
              </Link>
              <Link
                href="/patient/find-provider"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive("/patient/find-provider")
                    ? "bg-muted text-primary"
                    : ""
                }`}
              >
                <Search className="h-4 w-4" />
                Find a Provider
              </Link>
              <Link
                href="/patient/book-test"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive("/patient/book-test") ? "bg-muted text-primary" : ""
                }`}
              >
                <Beaker className="h-4 w-4" />
                Book a Test
              </Link>
              <Link
                href="/patient/records"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive("/patient/records") ? "bg-muted text-primary" : ""
                }`}
              >
                <FileText className="h-4 w-4" />
                Medical Records
              </Link>
              <Link
                href="/patient/reminders"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive("/patient/reminders") ? "bg-muted text-primary" : ""
                }`}
              >
                <Bell className="h-4 w-4" />
                Reminders
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
                  <span className="sr-only">Arogya Assam</span>
                </Link>
                <Link
                  href="/patient/dashboard"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive("/patient/dashboard")
                      ? "bg-muted text-foreground"
                      : ""
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/patient/profile"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive("/patient/profile")
                      ? "bg-muted text-foreground"
                      : ""
                  }`}
                >
                  <Users className="h-5 w-5" />
                  My Profiles
                </Link>
                <Link
                  href="/patient/navigator"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive("/patient/navigator")
                      ? "bg-muted text-foreground"
                      : ""
                  }`}
                >
                  <Bot className="h-5 w-5" />
                  AI Health Navigator
                </Link>
                <Link
                  href="/patient/report-analyzer"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive("/patient/report-analyzer")
                      ? "bg-muted text-foreground"
                      : ""
                  }`}
                >
                  <FileCheck className="h-5 w-5" />
                  AI Report Analyzer
                </Link>
                 <Link
                  href="/patient/predictive-health"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive("/patient/predictive-health")
                      ? "bg-muted text-foreground"
                      : ""
                  }`}
                >
                  <ShieldCheck className="h-5 w-5" />
                  Predictive Health
                </Link>
                <Link
                  href="/patient/genome-guardian"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive("/patient/genome-guardian")
                      ? "bg-muted text-foreground"
                      : ""
                  }`}
                >
                  <GitCommitVertical className="h-5 w-5" />
                  Genome Guardian
                </Link>
                <Link
                  href="/patient/find-provider"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive("/patient/find-provider")
                      ? "bg-muted text-foreground"
                      : ""
                  }`}
                >
                  <Search className="h-5 w-5" />
                  Find a Provider
                </Link>
                 <Link
                  href="/patient/book-test"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive("/patient/book-test") ? "bg-muted text-foreground" : ""
                  }`}
                >
                  <Beaker className="h-5 w-5" />
                  Book a Test
                </Link>
                <Link
                  href="/patient/records"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive("/patient/records")
                      ? "bg-muted text-foreground"
                      : ""
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  Medical Records
                </Link>
                <Link
                  href="/patient/reminders"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive("/patient/reminders")
                      ? "bg-muted text-foreground"
                      : ""
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  Reminders
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
