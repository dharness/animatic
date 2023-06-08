import Joi from "joi";

export const postTrackSchema = Joi.object({
  frames: Joi.array().items({
    imageData: Joi.string().base64().required(),
    duration: Joi.number().required(),
  }),
});