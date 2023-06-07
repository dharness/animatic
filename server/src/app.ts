import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv-flow";
dotenv.config({ silent: false });

import { imageRouter } from "./routes/image";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/image", imageRouter);

app.get("/", (_req, res) => {
  const resp: string = "Hello creep";
  res.send(resp);
});

app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

export default app;
