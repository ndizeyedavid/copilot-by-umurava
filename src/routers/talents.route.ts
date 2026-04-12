import express, { type Router } from "express";
import { jobsController } from "../controllers/jobs.controller";

const talentRouter: Router = express.Router();

talentRouter.get("/", jobsController.getAll);
talentRouter.get("/:id", jobsController.getOne);
talentRouter.post("/", jobsController.createJob);
talentRouter.put("/", jobsController.updateJob);
talentRouter.delete("/", jobsController.deleteJob);

export default talentRouter;
