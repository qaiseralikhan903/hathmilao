import Joi from "@hapi/joi";

const ProfileSchema = Joi.object().keys({
  name: Joi.string()
    .min(5)
    .max(30)
    .required(),
  city: Joi.string()
    .min(5)
    .max(30)
    .required(),
  country: Joi.string()
    .min(5)
    .max(30)
    .required(),
  websiteurl: Joi.string()
    .min(5)
    .max(50)
    .required(),
  description: Joi.string()
    .min(5)
    .required(),
  phonenumber: Joi.string()
    .min(12)
    .max(12),
  field: Joi.array()
    .items(
      Joi.string()
        .min(2)
        .max(30)
        .required()
    )
    .min(2)
    .max(20)
    .required(),
  error: Joi.string(),
  visible: Joi.boolean(),
  image: Joi.any(),
  selectedImage: Joi.any(),
  image_meta: Joi.any(),
  editorState: Joi.any(),
  loading: Joi.any(),
  buttonDisabled: Joi.boolean()
});

export default ProfileSchema;
