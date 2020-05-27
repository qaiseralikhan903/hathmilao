const Joi = require("@hapi/joi");
const Mongoose = require("mongoose");
const Joigoose = require("joigoose")(Mongoose);
const mongoosePaginate = require("mongoose-paginate-v2");

const ProfileSchema = Joi.object({
  userid: Joi.string().meta({
    type: "ObjectId",
    ref: "User"
  }),
  imageurl: Joi.string(),
  name: Joi.string(),
  headline: Joi.string(),
  summary: Joi.string(),
  phonenumber: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  githublink: Joi.string(),
  education: Joi.array().items({
    institution: Joi.string(),
    campus: Joi.string(),
    degree: Joi.string(),
    field: Joi.string(),
    startdate: Joi.date(),
    enddate: Joi.date(),
    description: Joi.string()
  }),
  experience: Joi.array().items({
    title: Joi.string(),
    company: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    startdate: Joi.date(),
    enddate: Joi.date(),
    description: Joi.string()
  }),
  skill: Joi.array().items(Joi.string()),
  language: Joi.array().items(Joi.string()),
  cvurl: Joi.string(),
  looking: Joi.boolean(),
  desiredjob: Joi.string(),
  appliedjob: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "Job"
    })
  ),
  savedjob: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "Job"
    })
  ),
  appliedfyp: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "FYP"
    })
  ),
  registeredevents: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "Event"
    })
  ),
  attemptchallenges: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "Challenge"
    })
  ),
  companyContacts: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "User"
    })
  ),
  universityContacts: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "User"
    })
  ),
  expoToken: Joi.array().items(Joi.string()),
  fcm: Joi.array().items(Joi.string())
});

const mongooseProfileSchema = new Mongoose.Schema(
  Joigoose.convert(ProfileSchema),
  {
    timestamps: true
  }
);

mongooseProfileSchema.plugin(mongoosePaginate);

const Student = Mongoose.model("Student", mongooseProfileSchema);

export default Student;
