import express from "express";
import _ from "lodash";
import { requireAuth } from "../middleware/auth";
import prisma from "../utils/prisma";
import { loadTrack } from "../middleware/loaders";
import { validate } from "../middleware/validate";
import { postTrackSchema, putTrackSchema } from "./tackSchemas";
import { deleteImageBulk, saveImageBulk } from "../utils/imageStorage";
import { Frame, RawFrame } from "../types/custom";
import { Prisma } from "@prisma/client";

const trackRouter = express.Router();
trackRouter.use(requireAuth);

trackRouter.get("/:trackId", loadTrack, async (req, res) => {
  res.status(200).send(req.track);
});

/**
 * Save the frames to s3 and return the urls
 * @param rawFrames - frames with image data
 * @returns frames with image urls
 */
export async function saveFrames(rawFrames: RawFrame[]) {
  const allImageData = rawFrames.map((frame) => frame.imageData);
  const imageUrls = await saveImageBulk(allImageData);
  const framesWithUrls = rawFrames.map((frame, i) => {
    const nextFrame: Frame = _.omit(frame, "imageData");
    nextFrame.imageUrl = imageUrls[i]?.url;
    return nextFrame;
  });
  return framesWithUrls;
}

trackRouter.put(
  "/:trackId",
  [validate(putTrackSchema), loadTrack],
  async (req, res) => {
    const rawFrames = req.body.frames || [];

    const nextFrames = (await saveFrames(rawFrames)) as any;
    const data = {
      frames: nextFrames as any,
    };
    const track = await prisma.track.update({
      where: { id: req.track.id },
      data,
    });

    if (!track) return res.status(400).send("Failed to update track");

    // delete the old images from s3
    const oldFrames = req.track.frames;
    await deleteImageBulk(oldFrames.map((frame) => frame.imageUrl));

    res.status(200).send(track);
  }
);

trackRouter.post("/", validate(postTrackSchema), async (req, res) => {
  const { id } = req.user;
  const rawFrames = req.body.frames || [];
  const nextFrames = (await saveFrames(rawFrames)) as any;

  const data = {
    userId: id,
    frames: nextFrames,
  };
  const track = await prisma.track.create({ data });

  if (!track) return res.status(400).send("Failed to create track");
  res.status(200).send(track);
});

export { trackRouter };
