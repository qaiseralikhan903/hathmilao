//Imports
import Student from "../../../models/studentProfile.model";
import Challenge from "../../../models/challenge.model";

//View All Challenge start
const ViewAllChallenge = (req, res) => {
  const { pageNumber, userid } = req.params;
  const options = {
    page: pageNumber,
    limit: 5,
    sort: { postingdate: -1 },

    collation: {
      locale: "en"
    }
  };
  Challenge.paginate({ status: "active" }, options)
    .then(challenges => {
      if (challenges) {
        Student.find({ userid: userid }, "attemptchallenges")
          .then(studentDoc => {
            if (studentDoc) {
              return res.status(200).json({
                error: null,
                challenges: challenges,
                studentDoc: studentDoc
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
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Challenge Not Found"
      });
    });
};
//View All Challenge End

// Attempt Challenge API Start
const AttemptChallenge = (req, res) => {
  const data = req.body;

  const { userid, challengeid } = data;

  const createSubmissionObject = {
    studentid: data.userid,
    description: "none",
    rating: 0
  };

  Student.findOneAndUpdate(
    { userid: userid },
    { $push: { attemptchallenges: challengeid } },
    { new: true }
  )
    .then(UpdatedAttemptChallenge => {
      if (UpdatedAttemptChallenge) {
        Challenge.findOneAndUpdate(
          { _id: challengeid },
          { $push: { challengesubmission: createSubmissionObject } },
          { new: true }
        )
          .then(UpdateChallengeSubmission => {
            if (UpdateChallengeSubmission) {
              return res.status(200).json({
                error: null,
                UpdatedAttemptChallenge: UpdatedAttemptChallenge,
                UpdateChallengeSubmission: UpdateChallengeSubmission
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
// Attempt Challenge API End

// ALL Attempted Challenges Return API Start
const AllAttemptChallenge = (req, res) => {
  const { pageNumber, userid } = req.params;

  const options = {
    page: pageNumber,
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  Student.find({ userid: userid }, "attemptchallenges")
    .then(AttemptedChallenge => {
      if (AttemptedChallenge) {
        let getAttemptArray = AttemptedChallenge[0].attemptchallenges;

        Challenge.paginate({ _id: { $in: getAttemptArray } }, options)
          .then(AllChallenges => {
            if (AllChallenges) {
              return res.status(200).json({
                error: null,
                challenges: AllChallenges
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
// ALL Attempted Challenges Return API End

// Cancel API Start
const CancelAttemptChallenge = (req, res) => {
  const data = req.body;

  const { userid, challengeid } = data;

  Challenge.findOneAndUpdate(
    { _id: challengeid },
    { $pull: { challengesubmission: { studentid: userid } } },
    { new: true }
  )
    .then(UpdatedAttemptChallenge => {
      if (UpdatedAttemptChallenge) {
        Student.findOneAndUpdate(
          { userid: userid },
          { $pull: { attemptchallenges: challengeid } },
          { new: true }
        )
          .then(UpdatedSAttemptChallenge => {
            if (UpdatedSAttemptChallenge) {
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
// Cancel API End

// Upload Solution Api Start
const UploadSolution = (req, res) => {
  const data = req.body;

  const { userid, description, challengeSubmissionid } = data;

  const createSubmissionObject = {
    "challengesubmission.$.description": description
  };

  Challenge.findOneAndUpdate(
    { _id: challengeSubmissionid, "challengesubmission.studentid": userid },
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
// Upload Solution Api End

//Search Challenge Information View start
const SearchChallenge = (req, res) => {
  const {
    pageNumber,
    field,
    city,
    company,
    requireddegree,
    userid
  } = req.params;

  let filter_object = { status: "active" };
  if (city !== "null") {
    let pair = { city: { $regex: city, $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }
  if (requireddegree !== "null") {
    let pair = { requireddegree: { $regex: requireddegree, $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }
  if (company !== "null") {
    let pair = { company: { $regex: company, $options: "i" } };
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
    limit: 20,
    collation: {
      locale: "en"
    }
  };

  Challenge.paginate(filter_object, options)
    .then(challenges => {
      if (challenges) {
        Student.find({ userid: userid }, "attemptchallenges")
          .then(studentDoc => {
            if (studentDoc) {
              return res.status(200).json({
                error: null,
                challenges: challenges,
                studentDoc: studentDoc
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
      }
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
  ViewAllChallenge,
  AttemptChallenge,
  AllAttemptChallenge,
  CancelAttemptChallenge,
  UploadSolution,
  SearchChallenge
};
