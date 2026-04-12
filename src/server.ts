import express from "express";
// @ts-ignore
import cors from "cors";
import helmet from "helmet";
// @ts-ignore
import morgan from "morgan";
import healthRouter from "./routers/health.route";
import dbConnect from "./config/dbConnect";
import jobsRouter from "./routers/jobs.route";
import talentRouter from "./routers/talents.route";

const app = express();
dbConnect();

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// routers
app.use("/health", healthRouter);
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/talents", talentRouter);

export { app };
