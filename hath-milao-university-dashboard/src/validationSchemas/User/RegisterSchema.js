import Joi from "@hapi/joi";

const RegisterSchema = Joi.object().keys({
  username: Joi.string()
    .lowercase()
    .alphanum()
    .min(5)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .min(5)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  role: Joi.string()
    .valid("university")
    .required(),
  error: Joi.string(),
  visible: Joi.boolean(),
  buttonDisabled: Joi.boolean()
});

export default RegisterSchema;
