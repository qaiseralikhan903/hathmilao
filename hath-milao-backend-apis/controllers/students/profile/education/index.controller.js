//Imports
import Student from "../../../../models/studentProfile.model";

//Education Information Add start
const AddEducation = (req, res) => {
  const data = req.body;

  const { userid } = data;

  const addEducation = {
    institution: data.institution,
    campus: data.campus,
    degree: data.degree,
    field: data.field,
    startdate: data.startdate,
    enddate: data.enddate,
    description: data.description
  };

  Student.findOneAndUpdate(
    { userid: userid },
    { $push: { education: addEducation } },
    { new: true }
  )
    .then(newEducation => {
      if (newEducation) {
        return res.status(200).json({
          error: null,
          newEducation: newEducation
        });
      } else {
        return res.status(500).json({
          error: "User Not Exist",
          newEducation: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "User Id Not Exist",
        newEducation: null
      });
    });
};
//Education Information Add End

//Education Information update Start
const UpdateEducation = (req, res) => {
  const data = req.body;

  const { educationid } = req.params;

  const UpdateEducation = {
    "education.$.institution": data.institution,
    "education.$.campus": data.campus,
    "education.$.degree": data.degree,
    "education.$.field": data.field,
    "education.$.startdate": data.startdate,
    "education.$.enddate": data.enddate,
    "education.$.description": data.description
  };

  Student.findOneAndUpdate(
    { "education._id": educationid },
    { $set: UpdateEducation },
    { new: true }
  )
    .then(updateEducation => {
      if (updateEducation) {
        return res.status(200).json({
          error: null,
          updateEducation: updateEducation
        });
      } else {
        return res.status(500).json({
          error: "User Not Exist",
          updateEducation: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Education id Not Exist",
        updateEducation: null
      });
    });
};
//Education Information update End

//Education Information Delete Start
const DeleteEducation = (req, res) => {
  const { userid } = req.params;
  const { educationid } = req.params;

  Student.findOneAndUpdate(
    { userid: userid },
    { $pull: { education: { _id: educationid } } },
    { new: true }
  )
    .then(updateEducation => {
      if (updateEducation) {
        return res.status(200).json({
          error: null,
          updateEducation: updateEducation
        });
      } else {
        return res.status(500).json({
          error: "User Not Exist",
          updateEducation: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "User id Not Exist",
        updateEducation: null
      });
    });
};
//Education Information update End

//Exports
export { AddEducation, UpdateEducation, DeleteEducation };
