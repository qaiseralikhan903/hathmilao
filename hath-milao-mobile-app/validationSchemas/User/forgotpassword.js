import Joi from "@hapi/joi";

const ForgotSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  error: Joi.string(),
  visible: Joi.boolean(),
  sucessMessage: Joi.any(),
  visibleSucess: Joi.any()
});

export default ForgotSchema;
