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
  name: Joi.string(),
  imageurl: Joi.string(),
  websiteurl: Joi.string(),
  description: Joi.string(),
  phonenumber: Joi.string(),
  field: Joi.array().items(Joi.string()),
  city: Joi.string(),
  country: Joi.string(),

  companyContacts: Joi.array().items(
    Joi.string().meta({
      type: "ObjectId",
      ref: "User"
    })
  ),
  studentContacts: Joi.array().items(
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

const University = Mongoose.model("University", mongooseProfileSchema);

export default University;
