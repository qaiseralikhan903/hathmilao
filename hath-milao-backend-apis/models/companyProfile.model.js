const Joi = require("@hapi/joi");

const Mongoose = require("mongoose");
const Joigoose = require("joigoose")(Mongoose);
const mongoosePaginate = require("mongoose-paginate-v2");

const ProfileSchema = Joi.object({
  userid: Joi.string().meta({
    type: "ObjectId",
    ref: "User",
    index: true,
    unique: true
  }),
  imageurl: Joi.string(),
  name: Joi.string(),
  industry: Joi.string(),
  minemployees: Joi.number(),
  maxemployees: Joi.number(),
  city: Joi.array().items(Joi.string()),
  country: Joi.array().items(Joi.string()),
  websiteurl: Joi.string(),
  description: Joi.string(),
  phonenumber: Joi.string(),

  specialties: Joi.array().items(Joi.string()),
  studentContacts: Joi.array().items(
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
  followers: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "User"
    })
  )
});

const mongooseProfileSchema = new Mongoose.Schema(
  Joigoose.convert(ProfileSchema),
  {
    timestamps: true
  }
);

mongooseProfileSchema.plugin(mongoosePaginate);

const Company = Mongoose.model("Company", mongooseProfileSchema);

export default Company;
