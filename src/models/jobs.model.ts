import { Schema, model } from "mongoose";
import { IJob } from "../types/job.types";

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

const Jobs = model<IJob>("Job", jobsSchema);

export default Jobs;
