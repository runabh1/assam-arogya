"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Calendar,
  LayoutDashboard,
  Stethoscope,
  Users,
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

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
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
                  href="/provider/dashboard"
                  asChild
                  isActive={isActive("/provider/dashboard")}
                >
                  <Link href="/provider/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/provider/analytics"
                  asChild
                  isActive={isActive("/provider/analytics")}
                >
                  <Link href="/provider/analytics">
                    <BarChart2 />
                    <span>Predictive Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/provider/patients"
                  asChild
                  isActive={isActive("/provider/patients")}
                >
                  <Link href="/provider/patients">
                    <Users />
                    <span>Patients</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton
                  href="/provider/calendar"
                  asChild
                  isActive={isActive("/provider/calendar")}
                >
                  <Link href="/provider/calendar">
                    <Calendar />
                    <span>Calendar</span>
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
