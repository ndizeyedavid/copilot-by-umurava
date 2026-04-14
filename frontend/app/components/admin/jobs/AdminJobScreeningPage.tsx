"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ScreeningStepper from "./screening/ScreeningStepper";
import ScreeningHistoryStep, {
  SavedScreening,
} from "./screening/ScreeningHistoryStep";
import JobSelectionStep, { JobSummary } from "./screening/JobSelectionStep";
import SourceSelectionStep from "./screening/SourceSelectionStep";
import ProcessingStep from "./screening/ProcessingStep";

type ScreeningStep = "history" | "select_job" | "select_source" | "processing";

const STEPS = [
  { id: "select_job", label: "Select Job" },
  { id: "select_source", label: "Source" },
  { id: "processing", label: "Screening" },
];

const LOADING_MESSAGES = [
  "Fetching candidate applications...",
  "Analyzing resumes with AI...",
  "Calculating match scores based on job weights...",
  "Ranking candidates by experience and skills...",
  "Evaluating cultural fit indicators...",
  "Checking for skill gaps...",
  "Cooking up the final leaderboard...",
  "Counting stars in the sky while AI thinks...",
  "Finalizing recommendations...",
];

export default function AdminJobScreeningPage({
  jobId: initialJobId,
}: {
  jobId?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState<ScreeningStep>(
    initialJobId ? "select_source" : "history",
  );
  const [selectedJobId, setSelectedJobId] = useState<string>(
    initialJobId || "",
  );
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  // Mock History
  const screeningHistory: SavedScreening[] = [
    {
      id: "scr_1",
      jobTitle: "Senior Frontend Engineer",
      date: "Apr 12, 2026",
      candidateCount: 48,
      topScore: 94,
      confidence: "high",
    },
    {
      id: "scr_2",
      jobTitle: "Product Designer",
      date: "Apr 10, 2026",
      candidateCount: 31,
      topScore: 88,
      confidence: "high",
    },
  ];

  // Mock jobs list
  const jobs: JobSummary[] = [
    {
      id: "job_1",
      title: "Senior Frontend Engineer",
      company: "Umurava",
      applicants: 48,
    },
    {
      id: "job_2",
      title: "Product Designer",
      company: "Copilot Team",
      applicants: 31,
    },
    {
      id: "job_3",
      title: "Backend Developer",
      company: "TechCorp Solutions",
      applicants: 64,
    },
  ];

  useEffect(() => {
    if (step === "processing") {
      const interval = setInterval(() => {
        setLoadingMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);

      const timer = setTimeout(() => {
        // Redirect to results page instead of staying on same page
        const mockScreeningId =
          "scr_" + Math.random().toString(36).substr(2, 9);
        router.push(`/admin/screening/${mockScreeningId}`);
        clearInterval(interval);
      }, 10000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [step, router]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[#25324B]">
          AI Candidate Screening
        </h1>
        <p className="text-sm text-[#7C8493]">
          Automated ranking and analysis for{" "}
          <span className="font-semibold text-[#25324B]">
            {selectedJobId
              ? jobs.find((j) => j.id === selectedJobId)?.title
              : "Selected Job"}
          </span>
        </p>
      </div>

      {step !== "history" && (
        <ScreeningStepper steps={STEPS} currentStep={step} />
      )}

      {step === "history" && (
        <ScreeningHistoryStep
          screenings={screeningHistory}
          onView={(id) => router.push(`/admin/screening/${id}`)}
          onReRun={(id) => setStep("processing")}
          onStartNew={() => setStep("select_job")}
        />
      )}

      {step === "select_job" && (
        <JobSelectionStep
          jobs={jobs}
          onSelect={(id) => {
            setSelectedJobId(id);
            setStep("select_source");
          }}
          onBack={() => setStep("history")}
        />
      )}

      {step === "select_source" && (
        <SourceSelectionStep
          onSelect={() => setStep("processing")}
          onBack={() => setStep("select_job")}
        />
      )}

      {step === "processing" && (
        <ProcessingStep
          message={LOADING_MESSAGES[loadingMsgIndex]}
          progress={((loadingMsgIndex + 1) * 100) / LOADING_MESSAGES.length}
        />
      )}
    </div>
  );
}
