const Joi = require("@hapi/joi");
const Mongoose = require("mongoose");
const Joigoose = require("joigoose")(Mongoose);
const bcrypt = require("bcrypt");
const saltRounds = 10;

const JoiUserSchema = Joi.object().keys({
  username: Joi.string()
    .lowercase()
    .alphanum()
    .min(5)
    .max(30)
    .required()
    .meta({ index: true }),
  password: Joi.string()
    // .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .meta({ index: true }),
  role: Joi.string()
    .valid("company", "university", "student")
    .required()
    .meta({ index: true }),
  reset_token: Joi.any()
});

const mongooseUserSchema = new Mongoose.Schema(
  Joigoose.convert(JoiUserSchema),
  {
    timestamps: true
  }
);

mongooseUserSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User = Mongoose.model("User", mongooseUserSchema);

export default User;
