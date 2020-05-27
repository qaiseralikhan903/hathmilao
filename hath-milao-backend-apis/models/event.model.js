const Joi = require("@hapi/joi");

const Mongoose = require("mongoose");
const Joigoose = require("joigoose")(Mongoose);
const mongoosePaginate = require("mongoose-paginate-v2");

const EventSchema = Joi.object({
  userid: Joi.string().meta({
    type: "ObjectId",
    ref: "User",
    index: true
  }),
  title: Joi.string(),
  createdBy: Joi.string(),
  startTime: Joi.string(),
  endTime: Joi.string(),
  venue: Joi.string(),
  field: Joi.array().items(Joi.string()),
  description: Joi.string(),
  dateAt: Joi.date(),
  postingdate: Joi.date(),
  eventType: Joi.string().valid("workshop", "webinar", "networking", "jobfair"),

  status: Joi.string().valid("active", "inactive"),
  eventparticipants: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "User"
    })
  )
});

const mongooseEventSchema = new Mongoose.Schema(Joigoose.convert(EventSchema));

mongooseEventSchema.plugin(mongoosePaginate);

const Event = Mongoose.model("Event", mongooseEventSchema);

export default Event;
