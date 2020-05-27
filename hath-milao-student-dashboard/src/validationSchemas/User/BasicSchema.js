import Joi from "@hapi/joi";

const BasicSchema = Joi.object().keys({
  name: Joi.string()
    .min(4)
    .max(30)
    .required(),
  headline: Joi.string()
    .min(4)
    .max(100)
    .required(),
  summary: Joi.string()
    .min(4)
    .max(250)
    .required(),
  phonenumber: Joi.string()
    .min(12)
    .max(12)
    .required(),
  city: Joi.string()
    .min(4)
    .max(30)
    .required(),
  country: Joi.string()
    .min(4)
    .max(30)
    .required(),
  githublink: Joi.string()
    .min(4)
    .max(50)
    .required(),

  loading: Joi.any(),
  error: Joi.any(),
  visible: Joi.any(),
  image: Joi.any(),
  selectedImage: Joi.any(),
  image_meta: Joi.any(),
  buttonDisabled: Joi.boolean()
});

export default BasicSchema;
