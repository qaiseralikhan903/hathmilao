import Joi from "@hapi/joi";

const EventSchema = Joi.object().keys({
  userid: Joi.string(),
  title: Joi.string()
    .min(5)
    .max(40)
    .required(),
  startTime: Joi.string()
    .min(5)
    .max(5)
    .required(),
  endTime: Joi.string()
    .min(5)
    .max(5)
    .required(),
  venue: Joi.string()
    .min(5)
    .max(100)
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
  description: Joi.string().required(),
  dateAt: Joi.date()
    .greater("now")
    .required(),
  postingdate: Joi.any(),
  eventType: Joi.string().valid("workshop", "webinar", "networking"),
  status: Joi.string().valid("active", "inactive"),
  error: Joi.string(),
  visible: Joi.boolean(),
  Loading: Joi.boolean(),
  createdBy: Joi.any(),
  eventid: Joi.any(),
  editorState: Joi.any(),
  buttonDisabled: Joi.boolean()
});

export default EventSchema;
