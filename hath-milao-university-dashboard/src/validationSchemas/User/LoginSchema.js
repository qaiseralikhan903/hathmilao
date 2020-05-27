import Joi from "@hapi/joi";

const LoginSchema = Joi.object().keys({
  username: Joi.string()
    .min(5)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .min(5)
    .max(30)
    .required(),
  error: Joi.string(),
  visible: Joi.boolean(),
  buttonDisabled: Joi.boolean()
});

export default LoginSchema;
