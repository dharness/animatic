import express from "express";
import cors from "cors";
import dotenv from "dotenv-flow";
dotenv.config({ silent: false });

import { framesRouter } from "./frames";

const app = express();
app.use(cors());

app.use("/protected", framesRouter);

app.get("/", (_req, res) => {
  const resp: string = "Hello creep";
  res.send(resp);
});

app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

export default app;
