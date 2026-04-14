"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  FileText,
  Plus,
} from "lucide-react";

type Card = {
  label: string;
  value: number;
  href?: string;
  variant: "blue" | "navy" | "green" | "sky";
  icon: ReactNode;
  right?: ReactNode;
};

function variantClasses(variant: Card["variant"]) {
  if (variant === "blue") return "bg-[#286ef0]";
  if (variant === "navy") return "bg-[#0B1B3A]";
  if (variant === "green") return "bg-[#16A34A]";
  return "bg-[#60A5FA]";
}

export default function AdminKpiCards({
  totalJobs,
  openJobs,
  closedJobs,
}: {
  totalJobs: number;
  openJobs: number;
  closedJobs: number;
}) {
  const cards: Card[] = [
    {
      label: "Total Jobs",
      value: totalJobs,
      href: "/admin/jobs",
      variant: "blue",
      icon: <Briefcase className="h-6 w-6 text-white/90" />,
      right: <ArrowUpRight className="h-5 w-5 text-white/90" />,
    },
    {
      label: "Open Jobs",
      value: openJobs,
      href: "/admin/jobs?status=open",
      variant: "navy",
      icon: <FileText className="h-6 w-6 text-white/90" />,
      right: <ArrowUpRight className="h-5 w-5 text-white/90" />,
    },
    {
      label: "Closed Jobs",
      value: closedJobs,
      href: "/admin/jobs?status=closed",
      variant: "green",
      icon: <CheckCircle2 className="h-6 w-6 text-white/90" />,
      right: <ArrowUpRight className="h-5 w-5 text-white/90" />,
    },
    {
      label: "Create New Job",
      value: 0,
      href: "/admin/jobs/new",
      variant: "sky",
      icon: <Plus className="h-6 w-6 text-white/90" />,
      right: (
        <span className="rounded-lg bg-white/15 px-4 py-2 text-xs font-semibold text-white">
          Create Job
        </span>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const content = (
          <div
            className={`${variantClasses(card.variant)} relative overflow-hidden rounded-2xl p-6 text-white shadow-sm`}
          >
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
                {card.icon}
              </div>
              {card.right}
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium text-white/80">{card.label}</p>
              {card.label === "Create New Job" ? (
                <p className="mt-1 text-2xl font-bold">&nbsp;</p>
              ) : (
                <p className="mt-1 text-3xl font-bold">{card.value}</p>
              )}
            </div>
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-white/10" />
          </div>
        );

        return card.href ? (
          <Link key={card.label} href={card.href} className="block">
            {content}
          </Link>
        ) : (
          <div key={card.label}>{content}</div>
        );
      })}
    </div>
  );
}
