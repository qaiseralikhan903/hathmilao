const Joi = require("@hapi/joi");

const Mongoose = require("mongoose");
const Joigoose = require("joigoose")(Mongoose);
const mongoosePaginate = require("mongoose-paginate-v2");

const NotificationSchema = Joi.object({
  notification: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    jobid: Joi.string()
  }),
  receivers: Joi.array()
});

const mongooseNotificationSchema = new Mongoose.Schema(
  Joigoose.convert(NotificationSchema)
);

mongooseNotificationSchema.plugin(mongoosePaginate);

const Notification = Mongoose.model("Notification", mongooseNotificationSchema);

export default Notification;
