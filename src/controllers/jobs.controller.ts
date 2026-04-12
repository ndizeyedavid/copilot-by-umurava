import { Request, Response } from "express";

const jobsController = {
  getAll(req: Request, res: Response) {
    return res.status(200).json({ message: "MELLOW" });
  },
};

export { jobsController };
