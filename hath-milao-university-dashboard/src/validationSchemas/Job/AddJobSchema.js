import Joi from "@hapi/joi";

const JobSchema = Joi.object().keys({
  userid: Joi.string(),
  title: Joi.string()
    .min(5)
    .max(40)
    .required(),
  requireddegree: Joi.string()
    .min(5)
    .max(50)
    .required(),
  jobType: Joi.string()
    .valid("internship", "fulltime")
    .required(),

  requiredSkill: Joi.array()
    .items(
      Joi.string()
        .min(2)
        .max(20)
        .required()
    )
    .min(5)
    .max(10)
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
  field: Joi.array()
    .items(
      Joi.string()
        .min(2)
        .max(30)
        .required()
    )
    .min(2)
    .max(10)
    .required(),
  minsalary: Joi.number()
    .min(0)
    .max(1000000)
    .required(),
  maxsalary: Joi.number()
    .min(0)
    .max(1000000)
    .greater(Joi.ref("minsalary"))
    .required(),
  minexperience: Joi.number()
    .min(0)
    .max(10)
    .required(),
  maxexperience: Joi.number()
    .min(1)
    .max(30)
    .positive()
    .greater(Joi.ref("minexperience"))
    .required(),

  totalposition: Joi.number()
    .min(1)
    .max(50)
    .required(),
  description: Joi.string().required(),
  applybefore: Joi.date()
    .greater("now")
    .required(),
  postingdate: Joi.any(),
  status: Joi.string().valid("active", "inactive"),
  error: Joi.string(),
  visible: Joi.boolean(),
  Loading: Joi.boolean(),
  jobid: Joi.string(),
  company: Joi.any()
});

export default JobSchema;
