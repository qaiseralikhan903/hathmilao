//Imports
import Company from "../../../models/companyProfile.model";
import User from "../../../models/user.model";
import Storage from "../../../util/minio";

//Profile Information Added start
const AddProfile = (req, res) => {
  const data = req.body;
  const company = new Company(data);

  User.findOne({ _id: data.userid })
    .then(doc => {
      company.save((err, informationAdded) => {
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
        error: "Company ID not found",
        informationAdded: false
      });
    });
};
//Profile Information Added End

//Basic Information View start
const ViewProfile = (req, res) => {
  const { userid } = req.params;

  Company.findOne({ userid: userid })
    .then(user => {
      return res.status(200).json({
        error: null,
        userData: user
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "Company ID not Found",
        userData: null
      });
    });
};
//Basic Information View End

//Profile Information Update start
const UpdateProfile = async (req, res) => {
  const data = await JSON.parse(req.body.data);

  const image_meta = data.image_meta;
  const image = req.files.image;

  let imagePath = "";

  if (image) {
    imagePath = `public/company/${data.name}/profile.${image_meta.extension}`;
    const uploaded = await Storage.client.putObject(
      process.env.MINIO_BUCKET,
      imagePath,
      image,
      image_meta.size
    );
    if (!uploaded) {
      return res.status(500).json({
        error: "Company Not Exist",
        updatedCompany: null
      });
    }
  }

  const { userid } = req.params;
  let updateCompany = {};
  if (image) {
    updateCompany = {
      imageurl: imagePath,
      name: data.name,
      industry: data.industry,
      city: data.city,
      country: data.country,
      websiteurl: data.websiteurl,
      description: data.description,
      phonenumber: data.phonenumber,
      specialties: data.specialties,
      minemployees: data.minemployees,
      maxemployees: data.maxemployees
    };
  } else {
    updateCompany = {
      name: data.name,
      industry: data.industry,
      city: data.city,
      country: data.country,
      websiteurl: data.websiteurl,
      description: data.description,
      phonenumber: data.phonenumber,
      specialties: data.specialties,
      minemployees: data.minemployees,
      maxemployees: data.maxemployees
    };
  }
  Company.findOneAndUpdate(
    { userid: userid },
    { $set: updateCompany },
    { new: true }
  )
    .then(newCompany => {
      if (newCompany) {
        return res.status(200).json({
          error: null,
          updatedCompany: newCompany
        });
      } else {
        return res.status(500).json({
          error: "Company Not Exist",
          updatedCompany: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Company Id Not Exist",
        updatedCompany: null
      });
    });
};
//Profile Information Update End

//Exports
export { AddProfile, ViewProfile, UpdateProfile };
