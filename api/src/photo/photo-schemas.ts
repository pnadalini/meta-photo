import Joi from "joi";

const photoFiltersSchema = Joi.object().keys({
  title: Joi.string(),
  "album.title": Joi.string(),
  "album.user.email": Joi.string().email(),
  limit: Joi.number(),
  offset: Joi.number(),
});

export { photoFiltersSchema };
