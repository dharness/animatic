import express from "express";
import { requireAuth } from "../middleware/auth";
import { validateParameters } from "../middleware/validateParamaters";
import Joi from "joi";
import { storeImage } from "../utils/imageStorage";

const imageRouter = express.Router();
imageRouter.use(requireAuth);

const schema = Joi.object({
  image: Joi.string().base64().required(),
  id: Joi.number().required(),
  start: Joi.number().integer().required(),
  end: Joi.number().integer().required(),
});

imageRouter.post("/", validateParameters(schema), async (req, res) => {
  const { id } = req.user;
  const result = await storeImage(`${id}-${req.body.id}.png`, req.body.image);
  console.log(result);

  res.sendStatus(200);
});

export { imageRouter };
