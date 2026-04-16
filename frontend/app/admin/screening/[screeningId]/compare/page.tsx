"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, AlertTriangle, Trophy } from "lucide-react";
import { api } from "@/lib/api/client";

type BackendTalent = {
  _id: string;
  headline: string;
  bio?: string;
  location: string;
  skills?: { name: string; level?: string; yearsOfExperience?: number }[];
  languages?: { name: string; proficiency?: string }[];
  experience?: any[];
  education?: any[];
  projects?: any[];
  availability?: { status?: string; type?: string };
  userId?: { firstName?: string; lastName?: string; email?: string; phone?: string };
  firstName?: string;
  lastName?: string;
};

function fullName(t: BackendTalent | undefined) {
  const first = String(t?.userId?.firstName ?? t?.firstName ?? "").trim();
  const last = String(t?.userId?.lastName ?? t?.lastName ?? "").trim();
  return `${first} ${last}`.trim() || "Unnamed talent";
}

function normSet(values: string[]) {
  return new Set(values.map((v) => v.trim().toLowerCase()).filter(Boolean));
}

function skillList(t: BackendTalent | undefined) {
  const raw = Array.isArray(t?.skills) ? t!.skills : [];
  return raw.map((s) => String(s?.name ?? "")).filter(Boolean);
}

function langList(t: BackendTalent | undefined) {
  const raw = Array.isArray(t?.languages) ? t!.languages : [];
  return raw.map((l) => String(l?.name ?? "")).filter(Boolean);
}

function countArr(v: any) {
  return Array.isArray(v) ? v.length : 0;
}

function winsLabel(a: number, b: number) {
  if (a === b) return "Tie";
  return a > b ? "Wins" : "Loses";
}

function DiffSection({
  title,
  left,
  right,
}: {
  title: string;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="text-sm font-bold text-[#25324B] mb-4">{title}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-4">
          {left}
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-4">
          {right}
        </div>
      </div>
    </section>
  );
}

export default function ScreeningComparePage() {
  const params = useParams<{ screeningId: string }>();
  const screeningId = params?.screeningId ?? "";
  const sp = useSearchParams();
  const a = sp.get("a") ?? "";
  const b = sp.get("b") ?? "";

  const canLoad = !!screeningId && !!a && !!b && a !== b;

  const aQuery = useQuery({
    queryKey: ["admin", "screening", screeningId, "compare", "talent", a],
    enabled: canLoad,
    queryFn: async () => {
      const res = await api.get(`/talents/${a}`);
      return res.data?.fetchedTalent as BackendTalent;
    },
  });

  const bQuery = useQuery({
    queryKey: ["admin", "screening", screeningId, "compare", "talent", b],
    enabled: canLoad,
    queryFn: async () => {
      const res = await api.get(`/talents/${b}`);
      return res.data?.fetchedTalent as BackendTalent;
    },
  });

  const isLoading = aQuery.isLoading || bQuery.isLoading;
  const talentA = aQuery.data;
  const talentB = bQuery.data;

  const computed = useMemo(() => {
    const aSkills = skillList(talentA);
    const bSkills = skillList(talentB);
    const aSet = normSet(aSkills);
    const bSet = normSet(bSkills);

    const sharedSkills = aSkills.filter((s) => bSet.has(s.trim().toLowerCase()));
    const aOnlySkills = aSkills.filter((s) => !bSet.has(s.trim().toLowerCase()));
    const bOnlySkills = bSkills.filter((s) => !aSet.has(s.trim().toLowerCase()));

    const aLang = langList(talentA);
    const bLang = langList(talentB);
    const aLangSet = normSet(aLang);
    const bLangSet = normSet(bLang);

    const sharedLang = aLang.filter((l) => bLangSet.has(l.trim().toLowerCase()));
    const aOnlyLang = aLang.filter((l) => !bLangSet.has(l.trim().toLowerCase()));
    const bOnlyLang = bLang.filter((l) => !aLangSet.has(l.trim().toLowerCase()));

    return {
      sharedSkills,
      aOnlySkills,
      bOnlySkills,
      sharedLang,
      aOnlyLang,
      bOnlyLang,
      aExp: countArr(talentA?.experience),
      bExp: countArr(talentB?.experience),
      aEdu: countArr(talentA?.education),
      bEdu: countArr(talentB?.education),
      aProj: countArr(talentA?.projects),
      bProj: countArr(talentB?.projects),
      aSkillCount: aSkills.length,
      bSkillCount: bSkills.length,
    };
  }, [talentA, talentB]);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/admin/screening/${screeningId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#286ef0] hover:underline mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Results
        </Link>
        <h1 className="text-2xl font-bold text-[#25324B]">Compare Candidates</h1>
        <p className="text-sm text-[#7C8493]">Diff layout, gaps, wins.</p>
      </div>

      {!canLoad ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="h-4 w-4" />
            Need 2 different candidates.
          </div>
          <p className="mt-1 text-xs">Go back, pick 2 compare checkboxes, click Vs.</p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-20">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-2" />
          <p className="text-sm text-[#7C8493]">Loading comparison...</p>
        </div>
      ) : !talentA || !talentB ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          Failed load one or both talent profiles.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#7C8493]">A</p>
              <p className="mt-1 text-lg font-bold text-[#25324B]">{fullName(talentA)}</p>
              <p className="text-sm text-[#7C8493]">{talentA.headline}</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-3">
                  <p className="text-[10px] font-bold uppercase text-[#7C8493]">Skills</p>
                  <p className="text-sm font-bold text-[#25324B]">{computed.aSkillCount}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-3">
                  <p className="text-[10px] font-bold uppercase text-[#7C8493]">Experience</p>
                  <p className="text-sm font-bold text-[#25324B]">{computed.aExp}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-3">
                  <p className="text-[10px] font-bold uppercase text-[#7C8493]">Projects</p>
                  <p className="text-sm font-bold text-[#25324B]">{computed.aProj}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#7C8493]">B</p>
              <p className="mt-1 text-lg font-bold text-[#25324B]">{fullName(talentB)}</p>
              <p className="text-sm text-[#7C8493]">{talentB.headline}</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-3">
                  <p className="text-[10px] font-bold uppercase text-[#7C8493]">Skills</p>
                  <p className="text-sm font-bold text-[#25324B]">{computed.bSkillCount}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-3">
                  <p className="text-[10px] font-bold uppercase text-[#7C8493]">Experience</p>
                  <p className="text-sm font-bold text-[#25324B]">{computed.bExp}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-3">
                  <p className="text-[10px] font-bold uppercase text-[#7C8493]">Projects</p>
                  <p className="text-sm font-bold text-[#25324B]">{computed.bProj}</p>
                </div>
              </div>
            </div>
          </div>

          <section className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5">
            <div className="flex items-center gap-2 text-indigo-700">
              <Trophy className="h-5 w-5" />
              <h2 className="text-sm font-bold uppercase tracking-wider">Quick Wins</h2>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-white border border-indigo-100 p-4">
                <p className="text-[10px] font-bold uppercase text-[#7C8493]">Experience entries</p>
                <p className="mt-1 text-sm font-bold text-[#25324B]">
                  A: {computed.aExp} ({winsLabel(computed.aExp, computed.bExp)})
                </p>
                <p className="text-sm font-bold text-[#25324B]">
                  B: {computed.bExp} ({winsLabel(computed.bExp, computed.aExp)})
                </p>
              </div>
              <div className="rounded-xl bg-white border border-indigo-100 p-4">
                <p className="text-[10px] font-bold uppercase text-[#7C8493]">Skills count</p>
                <p className="mt-1 text-sm font-bold text-[#25324B]">
                  A: {computed.aSkillCount} ({winsLabel(computed.aSkillCount, computed.bSkillCount)})
                </p>
                <p className="text-sm font-bold text-[#25324B]">
                  B: {computed.bSkillCount} ({winsLabel(computed.bSkillCount, computed.aSkillCount)})
                </p>
              </div>
              <div className="rounded-xl bg-white border border-indigo-100 p-4">
                <p className="text-[10px] font-bold uppercase text-[#7C8493]">Projects count</p>
                <p className="mt-1 text-sm font-bold text-[#25324B]">
                  A: {computed.aProj} ({winsLabel(computed.aProj, computed.bProj)})
                </p>
                <p className="text-sm font-bold text-[#25324B]">
                  B: {computed.bProj} ({winsLabel(computed.bProj, computed.aProj)})
                </p>
              </div>
            </div>
          </section>

          <DiffSection
            title="Skills Diff"
            left={
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-[#25324B]">Shared</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {computed.sharedSkills.length ? (
                      computed.sharedSkills.map((s) => (
                        <span
                          key={`shared-a-${s}`}
                          className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700"
                        >
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#7C8493]">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#25324B]">A only (gaps vs B)</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {computed.aOnlySkills.length ? (
                      computed.aOnlySkills.map((s) => (
                        <span
                          key={`aonly-${s}`}
                          className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-700"
                        >
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#7C8493]">None</span>
                    )}
                  </div>
                </div>
              </div>
            }
            right={
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-[#25324B]">Shared</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {computed.sharedSkills.length ? (
                      computed.sharedSkills.map((s) => (
                        <span
                          key={`shared-b-${s}`}
                          className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700"
                        >
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#7C8493]">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#25324B]">B only (gaps vs A)</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {computed.bOnlySkills.length ? (
                      computed.bOnlySkills.map((s) => (
                        <span
                          key={`bonly-${s}`}
                          className="rounded-full bg-violet-50 border border-violet-200 px-2.5 py-0.5 text-[10px] font-semibold text-violet-700"
                        >
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#7C8493]">None</span>
                    )}
                  </div>
                </div>
              </div>
            }
          />

          <DiffSection
            title="Languages Diff"
            left={
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-[#25324B]">Shared</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {computed.sharedLang.length ? (
                      computed.sharedLang.map((l) => (
                        <span
                          key={`lshared-a-${l}`}
                          className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700"
                        >
                          {l}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#7C8493]">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#25324B]">A only</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {computed.aOnlyLang.length ? (
                      computed.aOnlyLang.map((l) => (
                        <span
                          key={`laonly-${l}`}
                          className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-700"
                        >
                          {l}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#7C8493]">None</span>
                    )}
                  </div>
                </div>
              </div>
            }
            right={
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-[#25324B]">Shared</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {computed.sharedLang.length ? (
                      computed.sharedLang.map((l) => (
                        <span
                          key={`lshared-b-${l}`}
                          className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700"
                        >
                          {l}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#7C8493]">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#25324B]">B only</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {computed.bOnlyLang.length ? (
                      computed.bOnlyLang.map((l) => (
                        <span
                          key={`lbonly-${l}`}
                          className="rounded-full bg-violet-50 border border-violet-200 px-2.5 py-0.5 text-[10px] font-semibold text-violet-700"
                        >
                          {l}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#7C8493]">None</span>
                    )}
                  </div>
                </div>
              </div>
            }
          />

          <DiffSection
            title="Education / Availability"
            left={
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#25324B]">Education entries</span>
                  <span className="text-xs font-bold text-[#25324B]">{computed.aEdu}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#25324B]">Availability</p>
                  <p className="mt-1 text-xs text-[#7C8493]">
                    {talentA.availability?.type ?? "—"} • {talentA.availability?.status ?? "—"}
                  </p>
                </div>
              </div>
            }
            right={
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#25324B]">Education entries</span>
                  <span className="text-xs font-bold text-[#25324B]">{computed.bEdu}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#25324B]">Availability</p>
                  <p className="mt-1 text-xs text-[#7C8493]">
                    {talentB.availability?.type ?? "—"} • {talentB.availability?.status ?? "—"}
                  </p>
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
