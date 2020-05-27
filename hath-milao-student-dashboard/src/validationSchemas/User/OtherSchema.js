import Joi from "@hapi/joi";

const OtherSchema = Joi.object().keys({
  skill: Joi.array()
    .items(
      Joi.string()
        .min(2)
        .max(20)
        .required()
    )
    .min(2)
    .max(10)
    .required(),
  language: Joi.array()
    .items(
      Joi.string()
        .min(2)
        .max(20)
        .required()
    )
    .min(2)
    .max(10)
    .required(),
  cvurl: Joi.string(),
  looking: Joi.boolean(),
  desiredjob: Joi.string()
    .min(4)
    .max(200)
    .required(),
  loading: Joi.any(),
  error: Joi.any(),
  visible: Joi.any(),
  buttonDisabled: Joi.boolean()
});

export default OtherSchema;
