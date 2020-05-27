//Imports
import Student from "../../../../models/studentProfile.model";

//Experience Information Add start
const AddExperience = (req, res) => {
  const data = req.body;

  const { userid } = data;

  const addExperience = {
    title: data.title,
    company: data.company,
    city: data.city,
    country: data.country,
    startdate: data.startdate,
    enddate: data.enddate,
    description: data.description
  };

  Student.findOneAndUpdate(
    { userid: userid },
    { $push: { experience: addExperience } },
    { new: true }
  )
    .then(newExperience => {
      if (newExperience) {
        return res.status(200).json({
          error: null,
          newExperience: newExperience
        });
      } else {
        return res.status(500).json({
          error: "User Not Exist",
          newExperience: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "User Id Not Exist",
        newExperience: null
      });
    });
};
//Experience Information Add End

//Experience Information update Start
const UpdateExperience = (req, res) => {
  const data = req.body;
  const { experienceid } = req.params;

  const UpdateExperience = {
    "experience.$.title": data.title,
    "experience.$.company": data.company,
    "experience.$.city": data.city,
    "experience.$.country": data.country,
    "experience.$.startdate": data.startdate,
    "experience.$.enddate": data.enddate,
    "experience.$.description": data.description
  };

  Student.findOneAndUpdate(
    { "experience._id": experienceid },
    { $set: UpdateExperience },
    { new: true }
  )
    .then(updateExperience => {
      if (updateExperience) {
        return res.status(200).json({
          error: null,
          updateExperience: updateExperience
        });
      } else {
        return res.status(500).json({
          error: "User Not Exist",
          updateExperience: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Experience id Not Exist",
        updateExperience: null
      });
    });
};
//Experience Information update End

//Experience Information Delete Start
const DeleteExperience = (req, res) => {
  const { userid } = req.params;
  const { experienceid } = req.params;

  Student.findOneAndUpdate(
    { userid: userid },
    { $pull: { experience: { _id: experienceid } } },
    { new: true }
  )
    .then(updateExperience => {
      if (updateExperience) {
        return res.status(200).json({
          error: null,
          updateExperience: updateExperience
        });
      } else {
        return res.status(500).json({
          error: "User Not Exist",
          updateExperience: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Experience id Not Exist",
        updateExperience: null
      });
    });
};
//Experience Information update End

//Exports
export { AddExperience, UpdateExperience, DeleteExperience };
