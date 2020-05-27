import Joi from "@hapi/joi";

const EducationSchema = Joi.object().keys({
  userid: Joi.string(),
  institution: Joi.string()
    .min(5)
    .max(100)
    .required(),
  campus: Joi.string()
    .min(4)
    .max(50)
    .required(),
  degree: Joi.string()
    .min(3)
    .max(30)
    .required(),
  field: Joi.string()
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
  EducationOption: Joi.string(),
  id: Joi.string(),
  buttonDisabled: Joi.boolean()
});

export default EducationSchema;
