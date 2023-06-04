import express from "express";
import { requireAuth } from "./middleware/auth";

const framesRouter = express.Router();
framesRouter.use(requireAuth);

framesRouter.get("/", (_req, res) => {
  res.sendStatus(200);
});

export { framesRouter };
