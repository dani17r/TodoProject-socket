import Joi from "joi";

const str = () => Joi.string().trim().lowercase();
const str_length = (min: Number, max: Number, joi: any) =>
  joi.min(min).max(max);

export const rules = {
  created: Joi.object().keys({
    _author: Joi.string(),
    title: str_length(3, 30, str()),
    description: Joi.allow(null),
  }),
  updated: Joi.object().keys({
    title: str_length(3, 30, str()),
    description: Joi.allow(null),
  }),
  removed: Joi.object().keys({
    _id: Joi.string().required(),
  }),
};
