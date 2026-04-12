import express, { type Router } from "express";
import { jobsController } from "../controllers/jobs.controller";

const jobsRouter: Router = express.Router();

jobsRouter.get("/", jobsController.getAll);

export default jobsRouter;
