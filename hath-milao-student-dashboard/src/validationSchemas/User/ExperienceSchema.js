import Joi from "@hapi/joi";

const ExperienceSchema = Joi.object().keys({
  userid: Joi.string(),
  title: Joi.string()
    .min(5)
    .max(50)
    .required(),
  company: Joi.string()
    .min(3)
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
  startdate: Joi.date().required(),
  enddate: Joi.date()
    .greater(Joi.ref("startdate"))
    .required(),
  description: Joi.string()
    .min(5)
    .max(200)
    .required(),
  error: Joi.string(),
  visible: Joi.boolean(),
  loading: Joi.boolean(),
  ExperienceOption: Joi.string(),
  id: Joi.string(),
  buttonDisabled: Joi.boolean()
});

export default ExperienceSchema;
