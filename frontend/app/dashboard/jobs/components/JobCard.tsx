"use client";

import React from "react";
import {
  Building2,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { BsCash } from "react-icons/bs";

export interface Job {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  postedAt: string;
  description: string;
  tags: string[];
  status?: "Open" | "Closed" | "Applied";
}

interface JobCardProps {
  job: Job;
  onClick: (id: string) => void;
}

export default function JobCard({ job, onClick }: JobCardProps) {
  return (
    <Card
      className="group relative bg-white border border-gray-100 rounded-[10px] p-6 hover:border-[#286ef0] transition-all duration-500 cursor-pointer shadow-none"
      onClick={() => onClick(job.id)}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#F8F9FD] border border-gray-50 flex items-center justify-center overflow-hidden">
            <img
              src="/images/companies/umurava.png"
              alt="Umurava Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#25324B] group-hover:text-[#286ef0] transition-colors leading-tight">
              {job.title}
            </h3>
            <p className="text-sm font-semibold text-[#7C8493] mt-1">
              {job.company}
            </p>
          </div>
        </div>
        <button className="p-2 text-gray-300 hover:text-[#286ef0]  transition-all">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-y-3 gap-x-6 mb-6">
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#444]">
          <MapPin className="w-4 h-4 text-gray-400" />
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#444]">
          <Briefcase className="w-4 h-4 text-gray-400" />
          {job.type}
        </div>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#444]">
          <BsCash className="w-4 h-4 text-gray-400" />
          {job.salary}
        </div>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#7C8493]">
          <Clock className="w-4 h-4 text-gray-400" />
          {job.postedAt}
        </div>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-gray-50">
        <div className="flex flex-wrap gap-2">
          {job.tags.slice(0, 3).map((tag, i) => (
            <Badge
              key={i}
              className="bg-[#F8F9FD] text-[#444] border-none px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg"
            >
              {tag}
            </Badge>
          ))}
          {job.tags.length > 3 && (
            <span className="text-[11px] font-bold text-gray-400 flex items-center">
              +{job.tags.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-sm font-bold text-[#286ef0]">
          View Details
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {job.status === "Applied" && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white p-0 px-2 rounded-full">
          <span className="text-xs">Applied</span>
        </div>
      )}
    </Card>
  );
}
