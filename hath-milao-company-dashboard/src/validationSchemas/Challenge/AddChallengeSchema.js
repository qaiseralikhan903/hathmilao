import Joi from "@hapi/joi";

const ChallengeSchema = Joi.object().keys({
  userid: Joi.string(),
  title: Joi.string()
    .min(5)
    .max(40)
    .required(),
  requireddegree: Joi.string()
    .min(5)
    .max(50)
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
  city: Joi.string()
    .min(4)
    .max(40)
    .required(),
  country: Joi.string()
    .min(4)
    .max(40)
    .required(),
  field: Joi.array()
    .items(
      Joi.string()
        .min(2)
        .max(20)
        .required()
    )
    .min(2)
    .max(10)
    .required(),
  teamMember: Joi.number()
    .min(1)
    .max(10)
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
  challengeid: Joi.string(),
  company: Joi.any(),
  editorState: Joi.any(),
  buttonDisabled: Joi.boolean()
});

export default ChallengeSchema;
