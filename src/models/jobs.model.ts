import { Schema, model, Document } from "mongoose";

interface IJob extends Document {
  title: string;
  description: string;
  requirements: string[];
  weights: {
    skills: number;
    experience: number;
    education: "A2" | "A1" | "PhD" | "A0";
  };
}

const jobsSchema = new Schema<IJob>(
  {
    title: String,
    description: String,
    requirements: [String],
    weights: {
      skills: Number,
      experience: Number,
      education: {
        type: String,
        enum: ["A2", "A1", "PhD", "A0"],
      },
    },
  },
  {
    timestamps: true,
  },
);

const Job = model<IJob>("Job", jobsSchema);

export default Job;
