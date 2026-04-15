import { Document } from "mongoose";

export type JobType = "full-time" | "part-time";
export type LocationType = "on-site" | "hybrid" | "remote";
export type Currency = "USD" | "RWF";

export interface IJob extends Document {
  title: string;
  description: string;
  requirements: string[];
  weights: {
    skills: number;
    experience: number;
    education: number;
  };
  deadline: Date;
  jobType: JobType;
  locationType: LocationType;
  salary: {
    amount: number;
    currency: Currency;
  };
  benefits: string[];
}
