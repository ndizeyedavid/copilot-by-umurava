"use client";

import AdminKpiCards from "@/app/components/admin/dashboard/AdminKpiCards";
import AdminRecentApplicationsTable from "@/app/components/admin/dashboard/AdminRecentApplicationsTable";
import AdminCandidateCompositionChart from "@/app/components/admin/charts/AdminCandidateCompositionChart";
import AdminJobStatisticsChart from "@/app/components/admin/charts/AdminJobStatisticsChart";

export default function AdminDashboard() {
  const kpis = {
    totalJobs: 54,
    openJobs: 32,
    closedJobs: 22,
  };

  const jobStats = [
    { label: "Jan", views: 52, applications: 28 },
    { label: "Feb", views: 62, applications: 34 },
    { label: "Mar", views: 76, applications: 43 },
    { label: "Apr", views: 58, applications: 31 },
    { label: "May", views: 44, applications: 22 },
    { label: "Jun", views: 57, applications: 30 },
    { label: "Jul", views: 64, applications: 36 },
    { label: "Aug", views: 82, applications: 49 },
    { label: "Sep", views: 70, applications: 41 },
    { label: "Oct", views: 60, applications: 33 },
    { label: "Nov", views: 50, applications: 27 },
    { label: "Dec", views: 74, applications: 45 },
  ];

  const composition = [
    { label: "Junior", value: 312, color: "#4F46E5", icon: "single" as const },
    { label: "Mid-level", value: 401, color: "#10B981", icon: "group" as const },
    { label: "Senior", value: 143, color: "#F59E0B", icon: "single" as const },
  ];

  const applications = [
    {
      id: "1",
      applicantName: "Justin Lipshutz",
      jobTitle: "Product Designer",
      department: "Design",
      experience: "3 yrs",
      status: "Shortlisted" as const,
      avatar: "/images/companies/dummy.png",
    },
    {
      id: "2",
      applicantName: "Marcus Culhane",
      jobTitle: "Frontend Engineer",
      department: "Engineering",
      experience: "2 yrs",
      status: "Under Review" as const,
      avatar: "/images/companies/dummy.png",
    },
    {
      id: "3",
      applicantName: "Leo Stanton",
      jobTitle: "Data Analyst",
      department: "Data",
      experience: "4 yrs",
      status: "Rejected" as const,
      avatar: "/images/companies/dummy.png",
    },
  ];

  return (
    <div className="space-y-6">
      <AdminKpiCards
        totalJobs={kpis.totalJobs}
        openJobs={kpis.openJobs}
        closedJobs={kpis.closedJobs}
      />

      <AdminJobStatisticsChart data={jobStats} rangeLabel="This Month" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AdminRecentApplicationsTable rows={applications} />
        </div>
        <div className="xl:col-span-1">
          <AdminCandidateCompositionChart
            data={composition}
            totalLabel="856 candidates total"
          />
        </div>
      </div>
    </div>
  );
}
