import express from "express";
import cors from "cors";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  const { data, error } = await supabase.auth.getUser(token);
  if (error !== null) return res.sendStatus(401);

  console.log(data);
  next();
});

app.get("/", (_req, res) => {
  const resp: string = "Hello creep";
  res.send(resp);
});

app.get("/protected", (_req, res) => {
  res.sendStatus(200);
});

app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
