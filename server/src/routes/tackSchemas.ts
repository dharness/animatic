import Joi from "joi";

export const postTrackSchema = Joi.object({
  frames: Joi.array().items({
    imgData: Joi.string().base64().required(),
    duration: Joi.number().required(),
  }),
});

export const putTrackSchema = Joi.object({
  frames: Joi.array().items({
    imgData: Joi.string().base64().required(),
    duration: Joi.number().required(),
  }),
});
