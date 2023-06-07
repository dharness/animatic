import express from "express";
import { requireAuth } from "../middleware/auth";
import { validateParameters } from "../middleware/validateParamaters";
import Joi from "joi";
import { storeImage } from "../utils/imageStorage";
import prisma from "../utils/prisma";

const frameRouter = express.Router();
frameRouter.use(requireAuth);

const schema = Joi.object({
  image: Joi.string().base64().required(),
  trackId: Joi.number().required(),
  start: Joi.number().integer().required(),
  end: Joi.number().integer().required(),
});

frameRouter.post("/", validateParameters(schema), async (req, res) => {
  const { id } = req.user;

  // get the associated track
  const { trackId } = req.body;
  const track = await prisma.track.findUnique({
    where: { id: trackId },
  });
  if (track == null) return res.status(400).send("Invalid track id");

  const { url } = await storeImage(`${req.body.id}.png`, req.body.image);
  const { start, end } = req.body;
  const frame = await prisma.frame.create({
    data: {
      imageUrl: url,
      start,
      end,
      trackId,
    },
  });
  if (!frame) return res.status(400).send("Failed to create frame");
  res.status(200).send(frame);
});

export { frameRouter };
