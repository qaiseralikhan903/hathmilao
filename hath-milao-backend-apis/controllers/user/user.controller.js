const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
const path = require("path");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const ejs = require("ejs");

import User from "../../models/user.model";
import Company from "../../models/companyProfile.model";
import Student from "../../models/studentProfile.model";
import University from "../../models/universityProfile.model";

export const Roles = ["company", "student", "university"];

const Register = async (req, res) => {
  try {
    const data = req.body;

    const { username, password, role, email } = data;

    if (!username || !password || !role || !email)
      throw new Error("Incomplete user data to register!");

    // 1. Check if username and email already exists along with role.

    let user = await User.findOne({ username, email, role }).exec();

    if (user) {
      throw new Error("User already exists!");
    }

    // 2. user name and email must be unique based on that role.

    user = await User.findOne({ username, role }).exec();

    if (user) throw new Error("User already exists!");

    user = await User.findOne({ email, role }).exec();

    if (user) throw new Error("User already exists!");

    const newUser = new User(data);

    newUser.save((err, addedUser) => {
      if (err) {
        return res.status(500).json({
          err: err,
          registered: false
        });
      } else if (addedUser) {
        if (role === "company") {
          const company = new Company({
            userid: addedUser._id
          });

          company.save((err, addedCompany) => {
            if (err) {
              return res.status(500).json({
                err: err,
                registered: false
              });
            } else if (addedCompany) {
              return res.status(200).json({
                err: null,
                registered: true
              });
            }
          });
        } else if (role === "university") {
          const university = new University({
            userid: addedUser._id
          });

          university.save((err, addedUniversity) => {
            if (err) {
              return res.status(500).json({
                err: err,
                registered: false
              });
            } else if (addedUniversity) {
              return res.status(200).json({
                err: null,
                registered: true
              });
            }
          });
        } else if (role === "student") {
          const student = new Student({
            userid: addedUser._id
          });

          student.save((err, addedStudent) => {
            if (err) {
              return res.status(500).json({
                err: err,
                registered: false
              });
            } else if (addedStudent) {
              return res.status(200).json({
                err: null,
                registered: true
              });
            }
          });
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) throw new Error("Incomplete Credentials!");

    let user = await User.findOne({ username: username, role: role }).exec();

    if (!user) {
      user = await User.findOne({ email: username, role: role }).exec();
    }

    // Here we will know if the user is found with email (or username) or not.

    if (!user) throw new Error("Invalid Credentials!");

    // THE USER is FOUND. Checking for the password.
    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) throw new Error("Invalid Credentials!");

    const token = jwt.sign({ uid: user._id }, process.env.AUTH_SECRET);

    return res.json({
      access_token: token,
      user: { username: user.username, email: user.email, id: user._id }
    });
  } catch (err) {
    return res.status(403).json({ err: err.message });
  }
};

const Profile = (req, res) => {
  res.json({
    user: req.user
  });
};

const ForgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) throw new Error("Email was not provided!");
    const role = req.body.role;
    if (!role || !Roles.includes(role))
      throw new Error("Incomplete Data Provided!");

    const user = await User.findOne({ email, role });
    if (!user)
      throw new Error("An account with this email address doesn't exist!");
    let transporter = nodemailer.createTransport(
      sgTransport({
        auth: {
          api_key: process.env.SENDGRID_API_KEY_SECRET
        }
      })
    );

    const filePath = path.join(
      process.cwd(),
      "email-templates",
      "reset-pass.ejs"
    );

    const reset_token = jwt.sign({ email, role }, process.env.AUTH_SECRET, {
      expiresIn: "1h"
    });

    await User.findOneAndUpdate(
      { email, role },
      {
        reset_token
      }
    );

    const htmlData = await ejs.renderFile(filePath, {
      resetLink: `http://localhost:2500/user/reset-password/${reset_token}`,
      orgName: "Hath Milao"
    });

    const info = await transporter.sendMail({
      from: "Hath Milao <support@hathmilao.com>", // sender address
      to: email, // list of receivers
      subject: "Hath Milao | Reset You Account Password", // Subject line
      html: htmlData // html body
    });

    return res.status(200).json({
      message:
        "Please check your email address for further instructions to reset your password!"
    });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

const GetResetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) throw new Error("Invalid Password Reset Token Provided!");

    const user = await User.findOne({ reset_token: token });

    if (!user) throw new Error("Invalid Password Reset Token Provided!");

    jwt.verify(token, process.env.AUTH_SECRET);

    return res.render(__dirname + "/reset-password.ejs");
  } catch (e) {
    if (e.name === "TokenExpiredError")
      return res
        .status(500)
        .send(
          "Reset token is expired. Re-submit the Forgot Password form in order to get a new password reset link."
        );
    return res.status(500).send(e.message);
  }
};

const PostResetPassword = async (req, res) => {
  try {
    const { pass } = req.body;
    const token = req.params.token;
    if (!token) throw new Error("Invalid Password Reset Token Provided!");
    if (!pass) throw new Error("New password was not provided!");

    const user = await User.findOne({ reset_token: token });

    if (!user) throw new Error("Invalid Password Reset Token Provided!");

    jwt.verify(token, process.env.AUTH_SECRET);

    user.password = pass;
    user.reset_token = null;
    user.save(err => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("Error Resetting the password. Please try again later!");
      }
      return res.status(200).send("Password has been reset!");
    });
  } catch (e) {
    if (e.name === "TokenExpiredError")
      return res
        .status(500)
        .send(
          "Reset token is expired. Re-submit the Forgot Password form in order to get a new password reset link."
        );
    return res.status(500).send(e.message);
  }
};

export {
  Login,
  Register,
  Profile,
  ForgotPassword,
  GetResetPassword,
  PostResetPassword
};
