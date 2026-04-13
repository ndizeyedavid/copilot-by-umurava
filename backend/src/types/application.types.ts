import { Document } from "mongoose";

export interface IApplication extends Document {
  jobId: string;
  talentId: string;
  status: "pending" | "reviewing" | "shortlisted" | "rejected" | "hired";
  coverLetter?: string;
  resumeUrl?: string;
  appliedAt: Date;
  updatedAt: Date;
  notes?: string;
  screeningId?: string;
}
