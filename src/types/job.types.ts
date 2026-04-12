import { Document } from "mongoose";
export interface IJob extends Document {
  title: string;
  description: string;
  requirements: string[];
  weights: {
    skills: number;
    experience: number;
    education: "A2" | "A1" | "PhD" | "A0";
  };
}
