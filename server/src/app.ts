import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv-flow";
dotenv.config({ silent: false });

import { frameRouter } from "./routes/frame";
import { requireAuth } from "./middleware/auth";
import { trackRouter } from "./routes/track";

const app = express();
app.all("/api/*", requireAuth);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/track", trackRouter);
app.use("/api/track/:trackId/frame", frameRouter);

app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

export default app;
