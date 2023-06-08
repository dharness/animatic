import Joi from "joi";

export const postBodyFrameSchema = Joi.object({
  image: Joi.string().base64().required(),
  start: Joi.number().integer().required(),
  end: Joi.number().integer().required(),
});

export const putBodyFramesBulkSchema = Joi.array().items({
  start: Joi.number().integer().required(),
  end: Joi.number().integer().required(),
});
