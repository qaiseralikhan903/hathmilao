//Imports
import User from "../../../models/user.model";
import Student from "../../../models/studentProfile.model";
import Challenge from "../../../models/challenge.model";

//Challenge Information Added start
const AddChallenge = (req, res) => {
  const data = req.body;
  const challenge = new Challenge(data);

  User.findOne({ _id: data.userid })
    .then(doc => {
      challenge.save((err, informationAdded) => {
        if (err) {
          return res.status(500).json({
            error: err,
            informationAdded: false
          });
        } else if (informationAdded) {
          return res.status(200).json({
            error: null,
            informationAdded: true,
            challengeInfo: informationAdded
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
//Challenge Information Added End

//ALL Challenge Information View start
const ViewAllChallenge = (req, res) => {
  const { userid } = req.params;
  const { pageNumber } = req.params;
  const options = {
    page: pageNumber,
    limit: 5,
    sort: { postingdate: -1 },
    collation: {
      locale: "en"
    }
  };
  Challenge.paginate({ userid: userid, status: "active" }, options)
    .then(challenge => {
      return res.status(200).json({
        error: null,
        challenges: challenge
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "User id not Found"
      });
    });
};
//ALL Challenge Information View End

//Challenge Information Update start
const UpdateChallenge = (req, res) => {
  const data = req.body;

  const { challengeid } = req.params;

  const UpdateChallenge = {
    title: data.title,
    field: data.field,
    requireddegree: data.requireddegree,
    city: data.city,
    country: data.country,
    teamMember: data.teamMember,
    description: data.description,
    requiredSkill: data.requiredSkill,
    applybefore: data.applybefore
  };

  Challenge.findOneAndUpdate(
    { _id: challengeid },
    { $set: UpdateChallenge },
    { new: true }
  )
    .then(newChallenge => {
      if (newChallenge) {
        return res.status(200).json({
          error: null,
          updatedChallenge: newChallenge
        });
      } else {
        return res.status(500).json({
          error: "Challenge Not Updated"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Challenge Id Not Exist"
      });
    });
};
//Challenge Information Update End

// Challenge Delete Start
const DeleteChallenge = (req, res) => {
  const { challengeid } = req.params;

  const UpdateChallenge = {
    status: "inactive"
  };

  Challenge.findOneAndUpdate(
    { _id: challengeid },
    { $set: UpdateChallenge },
    { new: true }
  )
    .then(newChallenge => {
      if (newChallenge) {
        return res.status(200).json({
          error: null
        });
      } else {
        return res.status(500).json({
          error: "Challenge Not Updated"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Challenge Id Not Exist"
      });
    });
};
// Challenge Delete End

// Challenge Applicant API Start
const ChallengeApplicants = (req, res) => {
  const { pageNumber, challengeid } = req.params;

  const options = {
    page: pageNumber,
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  Challenge.find({ _id: challengeid }, "challengesubmission")
    .then(ChallengeApplicant => {
      if (ChallengeApplicant) {
        let getChallengeApplicantArray =
          ChallengeApplicant[0].challengesubmission;

        let studentIdsArray = [];

        for (let i = 0; i < getChallengeApplicantArray.length; i++) {
          studentIdsArray.push(getChallengeApplicantArray[i].studentid);
        }

        Student.paginate({ userid: { $in: studentIdsArray } }, options)
          .then(AllStudents => {
            if (AllStudents) {
              return res.status(200).json({
                error: null,
                students: AllStudents,
                challengeArray: getChallengeApplicantArray
              });
            } else {
              return res.status(500).json({
                error: "Students Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "Challenge ID  Not Exist"
            });
          });
      } else {
        return res.status(500).json({
          error: "Challenge Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Challenge Id Not Exist"
      });
    });
};
// Challenge Applicant API End

// Upload Rating Api Start
const UploadRating = (req, res) => {
  const data = req.body;

  const { challengeSubmissionId, rating } = data;

  const createSubmissionObject = {
    "challengesubmission.$.rating": rating
  };

  Challenge.findOneAndUpdate(
    { "challengesubmission._id": challengeSubmissionId },
    { $set: createSubmissionObject },
    { new: true }
  )
    .then(UpdateChallengeSubmission => {
      if (UpdateChallengeSubmission) {
        return res.status(200).json({
          error: null
        });
      } else {
        return res.status(500).json({
          error: "User Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "User Id Not Exist"
      });
    });
};
// Upload Rating Api End

//Search Challenge Information View start
const SearchChallenge = (req, res) => {
  const { userid, pageNumber, title, date, field } = req.params;
  let filter_object = { userid: userid, status: "active" };
  if (date !== "null") {
    let pair = { postingdate: new Date(date) };
    filter_object = { ...filter_object, ...pair };
  }
  if (title !== "null") {
    let pair = { title: { $regex: ".*" + title + ".*", $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }
  if (field !== "null") {
    let pair = {
      field: { $elemMatch: { $regex: field, $options: "i" } }
    };
    filter_object = { ...filter_object, ...pair };
  }
  const options = {
    page: pageNumber,
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  Challenge.paginate(filter_object, options)
    .then(challenge => {
      return res.status(200).json({
        error: null,
        challenges: challenge
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "User id not Found",
        challenge: null
      });
    });
};
//Search Challenge Information View End

//Exports
export {
  AddChallenge,
  ViewAllChallenge,
  UpdateChallenge,
  DeleteChallenge,
  ChallengeApplicants,
  UploadRating,
  SearchChallenge
};
