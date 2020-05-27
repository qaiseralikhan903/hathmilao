//Imports
import Student from "../../../../models/studentProfile.model";

//Oher Information Add start
const UpdateOther = (req, res) => {
  const data = req.body;

  const { userid } = req.params;

  const UpdateOther = {
    skill: data.skill,
    language: data.language,
    cvurl: data.cvurl,
    looking: data.looking,
    desiredjob: data.desiredjob
  };

  Student.findOneAndUpdate(
    { userid: userid },
    { $set: UpdateOther },
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
          error: "User Not Exist",
          updatedUser: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "User Id Not Exist",
        updatedUser: null
      });
    });
};
//Other Information Add End

//Exports
export { UpdateOther };
