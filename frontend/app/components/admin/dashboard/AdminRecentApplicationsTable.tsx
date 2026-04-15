"use client";

import Image from "next/image";

type Row = {
  id: string;
  applicantName: string;
  jobTitle: string;
  department: string;
  experience: string;
  status: "Shortlisted" | "Under Review" | "Rejected";
  avatar: string;
};

function statusClasses(status: Row["status"]) {
  if (status === "Shortlisted") return "bg-green-100 text-green-700";
  if (status === "Rejected") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
}

export default function AdminRecentApplicationsTable({ rows }: { rows: Row[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-[#25324B]">Candidate Status</p>
          <p className="text-sm text-[#7C8493]">Recent applications</p>
        </div>
        <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-[#25324B] hover:bg-gray-50">
          Filter &amp; Sort
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="text-left text-xs font-semibold text-[#7C8493]">
              <th className="pb-3">Employee Name</th>
              <th className="pb-3">Department</th>
              <th className="pb-3">Experience</th>
              <th className="pb-3">Discipline</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gray-100">
                      <Image
                        src={row.avatar}
                        alt={row.applicantName}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#25324B]">{row.applicantName}</p>
                      <p className="text-xs text-[#7C8493]">{row.jobTitle}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-[#25324B]">{row.department}</td>
                <td className="py-4 text-[#25324B]">{row.experience}</td>
                <td className="py-4 text-[#10B981]">+{Math.floor(80 + Math.random() * 25)}%</td>
                <td className="py-4">
                  <span className={`rounded-md px-3 py-1 text-xs font-semibold ${statusClasses(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
