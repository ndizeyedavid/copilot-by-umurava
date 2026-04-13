"use client";

import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  FileText,
  Briefcase,
  User,
  CalendarDays,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const mainNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutGrid className="h-5 w-5" />,
  },
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    label: "Jobs",
    href: "/dashboard/jobs",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    label: "Applications",
    href: "/dashboard/applications",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    label: "Calendar",
    href: "/dashboard/calendar",
    icon: <CalendarDays className="h-5 w-5" />,
  },
];

const bottomNav: NavItem[] = [
  {
    label: "Setting",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    label: "Help & Support",
    href: "/dashboard/help",
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    label: "Logout",
    href: "/dashboard/logout",
    icon: <LogOut className="h-5 w-5" />,
  },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
        active
          ? "bg-[#F3F4FF] text-[#286ef0]"
          : "text-[#25324B] hover:bg-[#F8F8FD]"
      }`}
    >
      <span
        className={`absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full transition-opacity ${
          active ? "bg-[#286ef0] opacity-100" : "opacity-0"
        }`}
      />
      <span
        className={
          active
            ? "text-[#286ef0]"
            : "text-[#7C8493] group-hover:text-[#25324B]"
        }
      >
        {item.icon}
      </span>
      <span>{item.label}</span>
    </Link>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-[72px] h-[calc(100vh-72px)] w-[240px] shrink-0 bg-white border-r border-gray-100">
      <div className="h-full px-5 py-12 flex flex-col">
        {/* User card */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100">
              <Image
                src="/images/companies/dummy.png"
                alt="User avatar"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-[#25324B]">
                Mellow Junior
              </p>
              <p className="text-xs text-[#7C8493]">UI / UX Designer</p>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <nav className="space-y-2 relative left-[-21px]">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return <NavLink key={item.href} item={item} active={active} />;
          })}
        </nav>

        <div className="my-3 h-px w-full bg-gray-100" />

        {/* Bottom nav */}
        <nav className="space-y-2 relative left-[-21px]">
          {bottomNav.map((item) => {
            const active = pathname === item.href;
            return <NavLink key={item.href} item={item} active={active} />;
          })}
        </nav>

        <div className="flex-1" />
      </div>
    </aside>
  );
}
