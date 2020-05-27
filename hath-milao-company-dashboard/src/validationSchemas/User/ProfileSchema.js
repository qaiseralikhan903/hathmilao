import Joi from "@hapi/joi";

const ProfileSchema = Joi.object().keys({
  name: Joi.string()
    .min(5)
    .max(30)
    .required(),
  industry: Joi.string()
    .min(5)
    .max(30)
    .required(),
  minemployees: Joi.number()
    .min(10)
    .max(10000)
    .required(),
  maxemployees: Joi.number()
    .min(10)
    .max(10000)
    .required(),
  city: Joi.array()
    .items(
      Joi.string()
        .min(2)
        .max(20)
        .required()
    )
    .min(1)
    .max(10)
    .required(),
  country: Joi.array()
    .items(
      Joi.string()
        .min(2)
        .max(20)
        .required()
    )
    .min(1)
    .max(10)
    .required(),
  websiteurl: Joi.string()
    .min(5)
    .max(30)
    .required(),
  description: Joi.string()
    .min(5)
    .required(),
  phonenumber: Joi.string()
    .min(12)
    .max(12),
  specialties: Joi.array()
    .items(
      Joi.string()
        .min(2)
        .max(20)
        .required()
    )
    .min(2)
    .max(10)
    .required(),
  error: Joi.string(),
  visible: Joi.boolean(),
  image: Joi.any(),
  selectedImage: Joi.any(),
  image_meta: Joi.any(),
  loading: Joi.any(),
  editorState: Joi.any(),
  buttonDisabled: Joi.boolean()
});

export default ProfileSchema;
