import express from "express";
import { requireAuth } from "../middleware/auth";
import prisma from "../utils/prisma";
import { loadTrack } from "../middleware/loaders";
import { validate } from "../middleware/validate";
import { postTrackSchema } from "./tackSchemas";
import { saveImageBulk } from "../utils/imageStorage";

const trackRouter = express.Router();
trackRouter.use(requireAuth);

trackRouter.get("/:trackId", loadTrack, async (req, res) => {
  res.status(200).send(req.track);
});

trackRouter.post("/", validate(postTrackSchema), async (req, res) => {
  const { id } = req.user;
  const frames = req.body.frames || [];
  const allImageData = frames.map((frame) => frame.imageData);

  // Save the images to s3 and get the urls
  const imageUrls = await saveImageBulk(allImageData);
  const framesWithUrls = frames.map((frame, i) => {
    delete frame.imageData;
    frame.imageUrl = imageUrls[i];
    return frame;
  });

  const track = await prisma.track.create({
    data: {
      userId: id,
      frames: framesWithUrls,
    },
  });

  if (!track) return res.status(400).send("Failed to create track");
  res.status(200).send(track);
});

export { trackRouter };
