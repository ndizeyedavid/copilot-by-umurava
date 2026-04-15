"use client";

import React, { useState } from "react";
import { 
  User, MapPin, Briefcase, Award, BookOpen, Languages, 
  Link, Users, Globe, Edit3, Save, X, Plus, Calendar,
  Building, Clock, Star, TrendingUp, CheckCircle, ExternalLink
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

// TypeScript Interfaces - Structured Schema for AI
interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience: number;
}

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  role: string;
  link: string;
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface Language {
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
}

interface SocialLink {
  platform: 'GitHub' | 'LinkedIn' | 'Portfolio';
  url: string;
}

interface TalentProfile {
  // Header Section
  fullName: string;
  headline: string;
  location: string;
  availability: 'Available' | 'Open' | 'Not Available';
  avatar?: string;
  
  // Structured Data for AI
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
  socialLinks: SocialLink[];
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<TalentProfile>({
    fullName: "Ndizeye David",
    headline: "Frontend Developer - React & AI Systems",
    location: "Kigali, Rwanda",
    availability: "Available",
    skills: [
      { name: "React", level: "Advanced", yearsOfExperience: 3 },
      { name: "TypeScript", level: "Advanced", yearsOfExperience: 2 },
      { name: "Node.js", level: "Intermediate", yearsOfExperience: 2 },
      { name: "Tailwind CSS", level: "Advanced", yearsOfExperience: 3 },
      { name: "Python", level: "Intermediate", yearsOfExperience: 1 },
      { name: "GraphQL", level: "Intermediate", yearsOfExperience: 1 },
    ],
    experience: [
      {
        company: "TechCorp Rwanda",
        role: "Frontend Developer",
        startDate: "2022-01",
        endDate: "Present",
        description: "Developed and maintained responsive web applications using React and TypeScript. Implemented AI-powered features that improved user engagement by 40%.",
        technologies: ["React", "TypeScript", "GraphQL", "AWS"]
      },
      {
        company: "StartHub Labs",
        role: "Junior Frontend Developer",
        startDate: "2021-06",
        endDate: "2021-12",
        description: "Built responsive UI components and collaborated with backend team to integrate RESTful APIs.",
        technologies: ["JavaScript", "Vue.js", "CSS", "Git"]
      }
    ],
    projects: [
      {
        name: "AI Recruitment Platform",
        description: "Built an AI-powered recruitment platform that matches candidates with jobs based on skills and experience using machine learning algorithms.",
        technologies: ["React", "Node.js", "MongoDB", "OpenAI API"],
        role: "Frontend Developer",
        link: "https://github.com/ndizeyedavid/ai-recruitment"
      },
      {
        name: "E-Learning Dashboard",
        description: "Created a comprehensive dashboard for online learning with real-time progress tracking and interactive charts.",
        technologies: ["Next.js", "D3.js", "PostgreSQL", "Tailwind"],
        role: "Full Stack Developer",
        link: "https://github.com/ndizeyedavid/learning-dashboard"
      },
      {
        name: "Rwanda Tourism App",
        description: "Mobile-first web application showcasing Rwanda's tourist destinations with booking functionality.",
        technologies: ["React Native", "Firebase", "Redux", "Maps API"],
        role: "Frontend Developer",
        link: "https://github.com/ndizeyedavid/rwanda-tourism"
      }
    ],
    education: [
      {
        institution: "University of Rwanda",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2018",
        endDate: "2022"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023-06"
      },
      {
        name: "React Advanced Patterns",
        issuer: "Udemy",
        date: "2023-03"
      }
    ],
    languages: [
      { name: "English", proficiency: "Fluent" },
      { name: "Kinyarwanda", proficiency: "Native" },
      { name: "French", proficiency: "Conversational" }
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/sarahmugisha" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/sarahmugisha" },
      { platform: "Portfolio", url: "https://sarahmugisha.dev" }
    ]
  });

  // Calculate profile completion for AI scoring
  const calculateProfileCompletion = () => {
    const fields = [
      profile.fullName,
      profile.headline,
      profile.location,
      profile.skills.length >= 5,
      profile.experience.length >= 2,
      profile.projects.length >= 3,
      profile.education.length >= 1,
      profile.certifications.length >= 1,
      profile.languages.length >= 2,
      profile.socialLinks.length >= 2
    ];
    
    const completedFields = fields.filter(field => field === true || (typeof field === 'string' && field.length > 0)).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const getProfileSuggestions = () => {
    const suggestions = [];
    if (profile.skills.length < 5) suggestions.push("Add more skills to improve match score");
    if (profile.experience.length < 2) suggestions.push("Add more work experience");
    if (profile.projects.length < 3) suggestions.push("Add more projects (critical for AI ranking)");
    if (profile.certifications.length < 2) suggestions.push("Add certifications to boost credibility");
    if (!profile.experience.some(exp => exp.description.includes('achieved') || exp.description.includes('improved'))) {
      suggestions.push("Add measurable achievements to experience");
    }
    return suggestions;
  };

  const getAIScore = () => {
    let score = 65; // Base score
    
    // Skills contribution
    score += Math.min(profile.skills.length * 5, 20);
    
    // Projects contribution (highest weight)
    score += Math.min(profile.projects.length * 8, 25);
    
    // Experience contribution
    score += Math.min(profile.experience.length * 6, 15);
    
    // Education and certifications
    score += Math.min((profile.education.length + profile.certifications.length) * 3, 10);
    
    return Math.min(score, 95);
  };

  const getAvailabilityColor = (availability: string) => {
    const colors = {
      'Available': 'bg-green-100 text-green-800 border-green-200',
      'Open': 'bg-blue-100 text-blue-800 border-blue-200',
      'Not Available': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[availability as keyof typeof colors];
  };

  const getSocialIcon = (platform: string) => {
    const icons = {
      'GitHub': <Link className="w-5 h-5" />,
      'LinkedIn': <Users className="w-5 h-5" />,
      'Portfolio': <Globe className="w-5 h-5" />
    };
    return icons[platform as keyof typeof icons] || <Globe className="w-5 h-5" />;
  };

  const completionPercentage = calculateProfileCompletion();
  const aiScore = getAIScore();
  const suggestions = getProfileSuggestions();

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Simple Header */}
        <div className="text-center py-8 border-b border-slate-200">
          <div className="w-28 h-28 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-sm">
            {profile.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <h1 className="text-3xl font-light text-[#0F172A] mb-2">
            {profile.fullName}
          </h1>
          <p className="text-[#475569] mb-3 text-lg">{profile.headline}</p>
          <div className="flex items-center justify-center space-x-4 text-sm text-[#475569] mb-6">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
              {profile.availability}
            </span>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2 bg-[#F97316] text-white rounded-lg hover:bg-[#ea580c] transition-colors shadow-sm"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Profile Strength Analytics Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-[#0F172A]">Profile Analytics</h2>
                  <p className="text-sm text-[#475569]">Complete profile for better matches</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#14B8A6]">{completionPercentage}%</div>
                  <div className="text-xs text-[#475569] uppercase tracking-wide">Score</div>
                </div>
              </div>
              
              {/* Progress Metrics */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {[
                  { label: 'Basic', value: 100, color: 'bg-[#14B8A6]' },
                  { label: 'Skills', value: 85, color: 'bg-[#0F172A]' },
                  { label: 'Projects', value: 90, color: 'bg-[#F97316]' },
                  { label: 'Experience', value: 75, color: 'bg-[#64748b]' },
                  { label: 'Education', value: 95, color: 'bg-[#14B8A6]' }
                ].map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-full h-20 bg-slate-100 rounded-lg mb-2 overflow-hidden">
                      <div 
                        className={`absolute bottom-0 w-full ${metric.color} transition-all duration-500`}
                        style={{ height: `${metric.value}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{metric.value}%</span>
                      </div>
                    </div>
                    <span className="text-xs text-[#475569]">{metric.label}</span>
                  </div>
                ))}
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-xl font-bold text-[#0F172A]">{profile.skills.length}</div>
                  <div className="text-xs text-[#475569]">Skills</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-xl font-bold text-[#0F172A]">{profile.projects.length}</div>
                  <div className="text-xs text-[#475569]">Projects</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-xl font-bold text-[#0F172A]">{profile.experience.length}</div>
                  <div className="text-xs text-[#475569]">Experience</div>
                </div>
              </div>
              
              {/* Overall Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#475569]">Overall Completion</span>
                  <span className="font-medium text-[#0F172A]">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#14B8A6] to-[#0F172A] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
              
              {suggestions.length > 0 && (
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#0F172A]">Improvement Areas</span>
                    <span className="text-xs text-[#475569]">{suggestions.length} items</span>
                  </div>
                  <div className="space-y-2">
                    {suggestions.slice(0, 2).map((suggestion, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-[#F97316] rounded-full" />
                        <span className="text-[#475569]">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Simple Skills */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-[#0F172A] mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Simple Experience */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-[#0F172A] mb-4">Experience</h2>
              <div className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="border-l-3 border-teal-200 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-[#0F172A]">{exp.role}</h3>
                        <p className="text-[#475569] text-sm">{exp.company}</p>
                        <p className="text-slate-400 text-sm mt-1">{exp.startDate} - {exp.endDate}</p>
                      </div>
                      <Briefcase className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple Projects */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-[#0F172A] mb-4">Projects</h2>
              <div className="space-y-3">
                {profile.projects.map((project, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-[#0F172A]">{project.name}</h3>
                      <span className="text-xs text-teal-600 font-medium">{project.role}</span>
                    </div>
                    <p className="text-sm text-[#475569] mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-white text-xs text-slate-600 rounded border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple Education & Languages */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-5 h-5 text-slate-600" />
                <h2 className="text-lg font-medium text-[#0F172A]">Education</h2>
              </div>
              <div className="space-y-3">
                {profile.education.map((edu, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#14B8A6] rounded-full mt-2" />
                    <div>
                      <p className="font-medium text-[#0F172A]">{edu.degree} in {edu.field}</p>
                      <p className="text-sm text-[#475569]">{edu.institution}</p>
                      <p className="text-sm text-slate-400">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2 mb-4 mt-6">
                <Languages className="w-5 h-5 text-slate-600" />
                <h2 className="text-lg font-medium text-[#0F172A]">Languages</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Simple AI Score */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm sticky top-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#14B8A6]" />
                <h3 className="text-lg font-medium text-[#0F172A]">AI Score</h3>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-light text-[#14B8A6]">{aiScore}</div>
                <div className="text-sm text-[#475569]">out of 100</div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <p className="font-medium text-teal-900 mb-1">Strengths</p>
                  <p className="text-teal-700">Projects, tech stack, experience</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="font-medium text-orange-900 mb-1">To improve</p>
                  <p className="text-orange-700">Add achievements, more certifications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
