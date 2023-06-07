import express, { Request, Response } from "express";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { saveImage } from "../utils/imageStorage";
import prisma from "../utils/prisma";
import { loadFrame, loadTrack } from "../middleware/loaders";
import { postBodyFrameSchema } from "./frameSchemas";

const frameRouter = express.Router({ mergeParams: true });
frameRouter.use(requireAuth);
frameRouter.use(loadTrack);

frameRouter.get("/", async (req, res) => {
  const frames = req.track.frames;
  res.status(200).send(frames);
});

frameRouter.get("/:frameId", loadFrame, async (req, res) => {
  res.status(200).send(req.frame);
});

interface TypedRequestBody<T> extends Express.Request {
  body: T;
}
frameRouter.post("/", validate(postBodyFrameSchema), async (req, res) => {
  const { url } = await saveImage(req.body.image);
  const { start, end } = req.body;
  const prismaArgs = {
    data: {
      imageUrl: url,
      start,
      end,
      trackId: req.track.id,
    },
  };

  const frame = await prisma.frame.create(prismaArgs);
  if (!frame) return res.status(400).send("Failed to create frame");
  res.status(200).send(frame);
});

export { frameRouter };
