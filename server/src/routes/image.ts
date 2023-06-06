import express from "express";
import { requireAuth } from "../middleware/auth";
import { validateParameters } from "../middleware/validateParamaters";
import Joi from "joi";

const imageRouter = express.Router();
imageRouter.use(requireAuth);

const schema = Joi.object({
  a: Joi.string(),
});

imageRouter.get("/", validateParameters(schema), (req, res) => {
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
