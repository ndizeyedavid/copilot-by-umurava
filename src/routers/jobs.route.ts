import express, { type Router } from "express";
import { jobsController } from "../controllers/jobs.controller";

const jobsRouter: Router = express.Router();

jobsRouter.get("/", jobsController.getAll);
jobsRouter.get("/:id", jobsController.getOne);
jobsRouter.post("/", jobsController.createJob);
jobsRouter.put("/", jobsController.updateJob);
jobsRouter.delete("/", jobsController.deleteJob);

export default jobsRouter;
