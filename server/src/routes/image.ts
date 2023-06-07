import express from "express";
import { requireAuth } from "../middleware/auth";
import { validateParameters } from "../middleware/validateParamaters";
import Joi from "joi";

const imageRouter = express.Router();
imageRouter.use(requireAuth);

const schema = Joi.object({
  image: Joi.string().required(),
  id: Joi.number().required(),
  start: Joi.number().integer().required(),
  end: Joi.number().integer().required(),
});

imageRouter.post("/", validateParameters(schema), (req, res) => {
  const { id } = req.user;
  console.log(id);
  res.sendStatus(200);
});

/*
body: {
  "frames": [
    {
      id: 1,
      imgBuffer: []
      start: 0,
      end: 1000
    }
  ]
}

*/

export { imageRouter };
