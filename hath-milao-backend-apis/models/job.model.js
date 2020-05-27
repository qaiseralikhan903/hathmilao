const Joi = require("@hapi/joi");

const Mongoose = require("mongoose");
const Joigoose = require("joigoose")(Mongoose);
const mongoosePaginate = require("mongoose-paginate-v2");

const JobSchema = Joi.object({
  userid: Joi.string().meta({
    type: "ObjectId",
    ref: "User",
    index: true
  }),
  title: Joi.string(),
  company: Joi.string(),
  field: Joi.array().items(Joi.string()),
  jobType: Joi.string().valid("internship", "fulltime"),
  minexperience: Joi.number(),
  maxexperience: Joi.number(),
  requireddegree: Joi.string(),
  city: Joi.array().items(Joi.string()),
  country: Joi.array().items(Joi.string()),
  totalposition: Joi.number(),
  description: Joi.string(),
  requiredSkill: Joi.array().items(Joi.string()),
  applybefore: Joi.date(),
  postingdate: Joi.date(),
  minsalary: Joi.number(),
  maxsalary: Joi.number(),
  status: Joi.string().valid("active", "inactive"),
  jobapplicants: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "User"
    })
  )
});

const mongooseJobSchema = new Mongoose.Schema(Joigoose.convert(JobSchema));

mongooseJobSchema.plugin(mongoosePaginate);

const Job = Mongoose.model("Job", mongooseJobSchema);

export default Job;
