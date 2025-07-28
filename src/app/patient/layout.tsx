"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  FileText,
  HeartPulse,
  Home,
  LayoutDashboard,
  Search,
  Users,
  Bell,
} from "lucide-react";

import {
  Sidebar,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard-header";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-lg">Unified Health Hub</span>
              </Link>
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
            <main className="flex-1 flex flex-col">
              {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
