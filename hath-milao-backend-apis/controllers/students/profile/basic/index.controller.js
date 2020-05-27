//Imports
import Student from "../../../../models/studentProfile.model";
import Storage from "../../../../util/minio";

//Basic Information Added start
const AddBasic = (req, res) => {
  const data = req.body;
  const student = new Student(data);

  Student.findOne({ _id: data.userid })
    .then(doc => {
      student.save((err, basicInformationAdded) => {
        if (err) {
          return res.status(500).json({
            error: err,
            basicInformationAddded: false
          });
        } else if (basicInformationAdded) {
          return res.status(200).json({
            error: null,
            basicInformationAddded: true
          });
        }
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "User ID not found",
        basicInformationAddded: false
      });
    });
};
//Basic Information Added End

//Basic Information View start
const ViewBasic = (req, res) => {
  const { userid } = req.params;

  Student.findOne({ userid: userid })
    .then(user => {
      return res.status(200).json({
        error: null,
        userData: user
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "user id not found",
        userData: null
      });
    });
};
//Basic Information View End

//Basic Information Update start
const UpdateBasic = async (req, res) => {
  const data = await JSON.parse(req.body.data);

  const image_meta = data.image_meta;
  const image = req.files.image;

  let imagePath = "";

  if (image) {
    imagePath = `public/student/${data.name}/profile.${image_meta.extension}`;
    const uploaded = await Storage.client.putObject(
      process.env.MINIO_BUCKET,
      imagePath,
      image,
      image_meta.size
    );
    if (!uploaded) {
      return res.status(500).json({
        error: "Student Not Exist",
        updatedCompany: null
      });
    }
  }

  const { userid } = req.params;

  let updateStudent = {};

  if (image) {
    updateStudent = {
      imageurl: imagePath,
      name: data.name,
      headline: data.headline,
      summary: data.summary,
      phonenumber: data.phonenumber,
      city: data.city,
      country: data.country,
      githublink: data.githublink
    };
  } else {
    updateStudent = {
      name: data.name,
      headline: data.headline,
      summary: data.summary,
      phonenumber: data.phonenumber,
      city: data.city,
      country: data.country,
      githublink: data.githublink
    };
  }

  Student.findOneAndUpdate(
    { userid: userid },
    { $set: updateStudent },
    { new: true }
  )
    .then(newUser => {
      if (newUser) {
        return res.status(200).json({
          error: null,
          updatedUser: newUser
        });
      } else {
        return res.status(500).json({
          error: "Student Not Exist",
          updatedUser: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Student Id Not Exist",
        updatedUser: null
      });
    });
};
//Basic Information Update End

//Basic Information Update From Mobile start
const MobileUpdateBasic = async (req, res) => {
  const data = await JSON.parse(req.body.data);

  const image_meta = data.image_meta;
  const image = req.body.image;

  let imagePath = "";

  if (image) {
    imagePath = `public/student/${data.name}/profile.${image_meta.extension}`;
    const uploaded = await Storage.client.putObject(
      process.env.MINIO_BUCKET,
      imagePath,
      Buffer.from(image, "base64")
    );
    if (!uploaded) {
      return res.status(500).json({
        error: "Student Not Exist",
        updatedCompany: null
      });
    }
  }

  const { userid } = req.params;

  let updateStudent = {};

  if (image) {
    updateStudent = {
      imageurl: imagePath,
      name: data.name,
      headline: data.headline,
      summary: data.summary,
      phonenumber: data.phonenumber,
      city: data.city,
      country: data.country,
      githublink: data.githublink
    };
  } else {
    updateStudent = {
      name: data.name,
      headline: data.headline,
      summary: data.summary,
      phonenumber: data.phonenumber,
      city: data.city,
      country: data.country,
      githublink: data.githublink
    };
  }

  Student.findOneAndUpdate(
    { userid: userid },
    { $set: updateStudent },
    { new: true }
  )
    .then(newUser => {
      if (newUser) {
        return res.status(200).json({
          error: null,
          updatedUser: newUser
        });
      } else {
        return res.status(500).json({
          error: "Student Not Exist",
          updatedUser: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Student Id Not Exist",
        updatedUser: null
      });
    });
};
//Basic Information Update From Mobile End

//Exports
export { AddBasic, ViewBasic, UpdateBasic, MobileUpdateBasic };
