"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/app/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.includes("/auth/");

  if (isAuthRoute) {
    return <div className="min-h-screen bg-[#F8F8FD]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      <DashboardHeader />
      <div className="flex pt-[72px]">
        <DashboardSidebar />
        <main className="flex-1 px-4 py-8">{children}</main>
      </div>
    </div>
  );
}
