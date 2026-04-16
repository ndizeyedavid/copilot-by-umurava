"use client";

import React, { useState } from "react";
import {
  User,
  MapPin,
  Edit3,
  Save,
  Globe,
  Mail,
  CheckCircle,
  Camera,
  Plus,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import ExperienceSection, { Experience } from "./components/ExperienceSection";
import SkillsSection, { Skill } from "./components/SkillsSection";
import ProfileStatus from "./components/ProfileStatus";
import { ImGithub, ImLinkedin2 } from "react-icons/im";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Reflected from Talents & Users Schema
  const [userData] = useState({
    firstName: "Ndizeye",
    lastName: "David",
    email: "david@umurava.com",
    picture: null,
  });

  const [talentData] = useState({
    headline: "Frontend Developer - React & AI Systems",
    bio: "Passionate about building scalable web applications with high-quality UI/UX and integrating AI solutions.",
    location: "Kigali, Rwanda",
    skills: [
      { name: "React", level: "Expert" as const, yearsOfExperience: 3 },
      { name: "TypeScript", level: "Advanced" as const, yearsOfExperience: 2 },
      { name: "Node.js", level: "Intermediate" as const, yearsOfExperience: 2 },
      { name: "Tailwind CSS", level: "Expert" as const, yearsOfExperience: 3 },
    ],
    experience: [
      {
        company: "TechCorp Rwanda",
        role: "Senior Frontend Engineer",
        startDate: "2022-01-01",
        description:
          "Led the development of a next-gen dashboard for talent analytics, improving performance by 60%.",
        technologies: ["Next.js", "Tailwind", "Radix UI"],
        IsCurrent: true,
      },
      {
        company: "Umurava",
        role: "Frontend Developer",
        startDate: "2021-06-01",
        endDate: "2021-12-31",
        description:
          "Collaborated on building the landing pages and talent marketplace platform using React.",
        technologies: ["React", "Redux", "SCSS"],
        IsCurrent: false,
      },
    ],
    availability: {
      status: "Available" as const,
      type: "Full-time" as const,
    },
    socialLinks: ["https://linkedin.com/in/david", "https://github.com/david"],
    languages: [
      { name: "English", proficiency: "Fluent" as const },
      { name: "Kinyarwanda", proficiency: "Native" as const },
    ],
  });

  return (
    <div className="min-h-screen bg-[#F8F9FD]">
      <div className="mx-auto space-y-3">
        {/* HEADER SECTION - Beautiful & Clean */}
        <div className="bg-white rounded-[10px] p-6 sm:p-7 border border-gray-100 overflow-hidden relative">
          <div className="flex  flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-32 h-32 sm:w-32 sm:h-32 rounded-full bg-linear-to-tr from-[#286ef0] to-[#5c95ff] p-1 ">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center border-4 border-white">
                    <span className="text-4xl sm:text-5xl font-bold text-[#286ef0]">
                      {userData.firstName[0]}
                      {userData.lastName[0]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left pt-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <h1 className="text-3xl sm:text-3xl font-extrabold text-[#25324B]">
                    {userData.firstName} {userData.lastName}
                  </h1>
                </div>
                <p className="text-lg font-semibold text-[#7C8493] mb-4 max-w-xl">
                  {talentData.headline}
                </p>

                <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#444]">
                    <div className="">
                      <MapPin className="w-4 h-4 text-[#286ef0]" />
                    </div>
                    {talentData.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#444]">
                    <div className=" ">
                      <Mail className="w-4 h-4 text-[#286ef0]" />
                    </div>
                    {userData.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full px-8 py-4 bg-[#286ef0] text-white rounded-2xl hover:bg-[#1f5fe0] shadow-[0_4px_15px_rgba(40,110,240,0.3)] transition-all flex items-center justify-center font-bold text-sm tracking-widest uppercase"
              >
                {isEditing ? (
                  <Save className="w-4 h-4 mr-2" />
                ) : (
                  <Edit3 className="w-4 h-4 mr-2" />
                )}
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
              <div className="flex justify-center gap-2">
                {talentData.socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-[#286ef0] hover:bg-[#F3F4FF] transition-all"
                  >
                    {link.includes("github") ? (
                      <ImGithub className="w-5 h-5" />
                    ) : (
                      <ImLinkedin2 className="w-5 h-5" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-3">
            {/* Bio Section */}
            <Card className="p-8 bg-white rounded-[10px] border border-gray-100 shadow-none">
              <h2 className="text-xl font-bold text-[#25324B] mb-4 flex items-center gap-3">
                <User className="w-5 h-5 text-[#286ef0]" />
                Personal Bio
              </h2>
              <p className="text-sm leading-relaxed text-[#7C8493] font-medium">
                {talentData.bio}
              </p>
            </Card>

            <ExperienceSection
              experience={talentData.experience as Experience[]}
              onAdd={() => console.log("Add Exp")}
            />

            <SkillsSection
              skills={talentData.skills as Skill[]}
              onAdd={() => console.log("Add Skill")}
            />

            {/* Languages Section */}
            <Card className="p-8 bg-white rounded-[10px] border border-gray-100 shadow-none">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#25324B] mb-2 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#286ef0]" />
                  Languages
                </h2>
                <button className="p-2 text-[#286ef0] hover:bg-[#F3F4FF] rounded-xl transition-all">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {talentData.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="px-5 py-3 bg-[#F8F9FD] border border-gray-100 rounded-2xl flex items-center gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-bold text-[#25324B]">
                      {lang.name}
                    </span>
                    <span className="text-[10px] font-bold text-[#286ef0] uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - Profile Status (The MIFOTRA-style card) */}
          <div className="lg:col-span-1 space-y-8 sticky top-[100px]">
            <ProfileStatus />
          </div>
        </div>
      </div>
    </div>
  );
}
