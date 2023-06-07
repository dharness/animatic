import express from "express";
import { requireAuth } from "../middleware/auth";
import prisma from "../utils/prisma";

const trackRouter = express.Router();
trackRouter.use(requireAuth);

trackRouter.get("/", async (req, res) => {
  const { id } = req.user;
  const tracks = await prisma.track.findMany({
    where: { userId: id },
    include: { frames: false },
  });

  if (tracks == null) return res.status(400).send("Failed to get tracks");
  res.status(200).send(tracks);
});

trackRouter.post("/", async (req, res) => {
  const { id } = req.user;
  const track = await prisma.track.create({
    data: {
      userId: id,
    },
  });

  if (!track) return res.status(400).send("Failed to create track");
  res.status(200).send(track);
});

export { trackRouter };
