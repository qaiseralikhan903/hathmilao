const Joi = require("@hapi/joi");

const Mongoose = require("mongoose");
const Joigoose = require("joigoose")(Mongoose);
const mongoosePaginate = require("mongoose-paginate-v2");

const FYPSchema = Joi.object({
  userid: Joi.string().meta({
    type: "ObjectId",
    ref: "User",
    index: true
  }),
  title: Joi.string(),
  company: Joi.string(),
  field: Joi.array().items(Joi.string()),
  requireddegree: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  teamMember: Joi.number(),
  description: Joi.string(),
  requiredSkill: Joi.array().items(Joi.string()),
  applybefore: Joi.date(),
  postingdate: Joi.date(),
  status: Joi.string().valid("active", "inactive"),
  fypapplicants: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "User"
    })
  )
});

const mongooseFYPSchema = new Mongoose.Schema(Joigoose.convert(FYPSchema));

mongooseFYPSchema.plugin(mongoosePaginate);

const FYP = Mongoose.model("FYP", mongooseFYPSchema);

export default FYP;
