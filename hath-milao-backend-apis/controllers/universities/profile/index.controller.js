//Imports
import University from "../../../models/universityProfile.model";
import User from "../../../models/user.model";
import Storage from "../../../util/minio";

//Profile Information Added start
const AddProfile = (req, res) => {
  const data = req.body;
  const university = new University(data);

  User.findOne({ _id: data.userid })
    .then(doc => {
      university.save((err, informationAdded) => {
        if (err) {
          return res.status(500).json({
            error: err,
            informationAdded: false
          });
        } else if (informationAdded) {
          return res.status(200).json({
            error: null,
            informationAdded: true,
            profileInfo: informationAdded
          });
        }
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "University ID not found",
        informationAdded: false
      });
    });
};
//Profile Information Added End

//Profile Information View start
const ViewProfile = (req, res) => {
  const { userid } = req.params;

  University.findOne({ userid: userid })
    .then(university => {
      return res.status(200).json({
        error: null,
        userData: university
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "University ID not Found",
        userData: null
      });
    });
};
//Profile Information View End

//Profile Information Update start
const UpdateProfile = async (req, res) => {
  const data = await JSON.parse(req.body.data);

  const image_meta = data.image_meta;
  const image = req.files.image;

  let imagePath = "";

  if (image) {
    imagePath = `public/university/${data.name}/profile.${image_meta.extension}`;
    const uploaded = await Storage.client.putObject(
      process.env.MINIO_BUCKET,
      imagePath,
      image,
      image_meta.size
    );
    if (!uploaded) {
      return res.status(500).json({
        error: "University Not Exist"
      });
    }
  }

  const { userid } = req.params;
  let updateProfile = {};
  if (image) {
    updateProfile = {
      name: data.name,
      imageurl: imagePath,
      websiteurl: data.websiteurl,
      description: data.description,
      phonenumber: data.phonenumber,
      city: data.city,
      country: data.country,
      field: data.field
    };
  } else {
    updateProfile = {
      name: data.name,
      websiteurl: data.websiteurl,
      description: data.description,
      phonenumber: data.phonenumber,
      city: data.city,
      country: data.country,
      field: data.field
    };
  }

  University.findOneAndUpdate(
    { userid: userid },
    { $set: updateProfile },
    { new: true }
  )
    .then(newUniversity => {
      if (newUniversity) {
        return res.status(200).json({
          error: null,
          newUniversity: newUniversity
        });
      } else {
        return res.status(500).json({
          error: "University Not Exist",
          updatedUniversity: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "University Id Not Exist",
        updatedUniversity: null
      });
    });
};
//Profile Information Update End

//Exports
export { AddProfile, ViewProfile, UpdateProfile };
