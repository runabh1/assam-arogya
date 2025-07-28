
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
} from "lucide-react";

import {
  Sidebar,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
import { Input } from "@/components/ui/input";

const pageTitles: { [key: string]: string } = {
  "/patient/dashboard": "Dashboard",
  "/patient/profile": "My Profiles",
  "/patient/navigator": "AI Health Navigator",
  "/patient/find-provider": "Find a Provider",
  "/patient/records": "Medical Records",
  "/patient/report-analyzer": "AI Report Analyzer",
  "/patient/reminders": "Health Reminders",
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar>
          <SidebarContent>
            <SidebarHeader className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-lg">Unified Health Hub</span>
              </Link>
               <SidebarTrigger />
            </SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/patient/dashboard"
                  asChild
                  isActive={isActive("/patient/dashboard")}
                >
                  <Link href="/patient/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/patient/profile"
                  asChild
                  isActive={isActive("/patient/profile")}
                >
                  <Link href="/patient/profile">
                    <Users />
                    <span>My Profiles</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/patient/navigator"
                  asChild
                  isActive={isActive("/patient/navigator")}
                >
                  <Link href="/patient/navigator">
                    <Bot />
                    <span>AI Health Navigator</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton
                  href="/patient/report-analyzer"
                  asChild
                  isActive={isActive("/patient/report-analyzer")}
                >
                  <Link href="/patient/report-analyzer">
                    <FileCheck />
                    <span>AI Report Analyzer</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/patient/find-provider"
                  asChild
                  isActive={isActive("/patient/find-provider")}
                >
                  <Link href="/patient/find-provider">
                    <Search />
                    <span>Find a Provider</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/patient/records"
                  asChild
                  isActive={isActive("/patient/records")}
                >
                  <Link href="/patient/records">
                    <FileText />
                    <span>Medical Records</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton
                  href="/patient/reminders"
                  asChild
                  isActive={isActive("/patient/reminders")}
                >
                  <Link href="/patient/reminders">
                    <Bell />
                    <span>Reminders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <SidebarTrigger className="md:hidden" />
                 <h1 className="font-semibold text-lg">{title}</h1>
                 <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    />
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
            <main className="flex-1 flex flex-col">
              {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
