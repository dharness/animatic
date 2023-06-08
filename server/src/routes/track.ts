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
/**
 * Save the frames to s3 and return the urls
 * @param rawFrames - frames with image data
 * @returns frames with image urls
 */
export async function saveFrames(rawFrames: RawFrame[]) {
  const allimgData = rawFrames.map((frame) => frame.imgData);
  const imgUrls = await saveImageBulk(allimgData);
  const framesWithUrls = rawFrames.map((frame, i) => {
    const nextFrame: Frame = _.omit(frame, "imgData");
    nextFrame.imgUrl = imgUrls[i]?.url;
    return nextFrame;
  });
  return framesWithUrls;
}

trackRouter.get("/", async (req, res) => {
  const tracks = await prisma.track.findMany({
    where: { userId: req.user.id },
  });

  if (!tracks) return res.status(404).send("No tracks found");
  res.status(200).send(tracks);
});

trackRouter.get("/:trackId", loadTrack, async (req, res) => {
  res.status(200).send(req.track);
});

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
    await deleteImageBulk(oldFrames.map((frame) => frame.imgUrl));

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
