//Imports
import FYP from "../../../models/fyp.model";
import Student from "../../../models/studentProfile.model";

//View All FYP start
const ViewAllFYP = (req, res) => {
  const { pageNumber, userid } = req.params;
  const options = {
    page: pageNumber,
    limit: 5,
    sort: { postingdate: -1 },

    collation: {
      locale: "en"
    }
  };
  FYP.paginate({ status: "active" }, options)
    .then(fyps => {
      if (fyps) {
        Student.find({ userid: userid }, "appliedfyp")
          .then(studentDoc => {
            if (studentDoc) {
              return res.status(200).json({
                error: null,
                fyps: fyps,
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
        error: "FYP Not Found"
      });
    });
};
//View All FYP End

//Search FYP Information View start
const SearchFYP = (req, res) => {
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

  FYP.paginate(filter_object, options)
    .then(fyps => {
      if (fyps) {
        Student.find({ userid: userid }, "appliedfyp")
          .then(studentDoc => {
            if (studentDoc) {
              return res.status(200).json({
                error: null,
                fyps: fyps,
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
        fyp: null
      });
    });
};
//Search FYP Information View End

// Apply FYP API Start
const ApplyFYP = (req, res) => {
  const data = req.body;

  const { userid, fypid } = data;

  Student.findOneAndUpdate(
    { userid: userid },
    { $push: { appliedfyp: fypid } },
    { new: true }
  )
    .then(UpdatedAppliedFYP => {
      if (UpdatedAppliedFYP) {
        FYP.findOneAndUpdate(
          { _id: fypid },
          { $push: { fypapplicants: userid } },
          { new: true }
        )
          .then(UpdatedCompanyFYPApplicants => {
            if (UpdatedCompanyFYPApplicants) {
              return res.status(200).json({
                error: null,
                UpdatedAppliedFYP: UpdatedAppliedFYP,
                UpdatedCompanyFYPApplicants: UpdatedCompanyFYPApplicants
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
// Apply FYP API End

// ALL Applied FYP  Return API Start
const AllAppliedFYP = (req, res) => {
  const { pageNumber, userid } = req.params;

  const options = {
    page: pageNumber,
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  Student.find({ userid: userid }, "appliedfyp")
    .then(AppliedFYP => {
      if (AppliedFYP) {
        let getFYPArray = AppliedFYP[0].appliedfyp;

        FYP.paginate({ _id: { $in: getFYPArray } }, options)
          .then(AllFYPs => {
            if (AllFYPs) {
              return res.status(200).json({
                error: null,
                fyps: AllFYPs
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
// ALL Applied Job Return API End

// Cancel API Start
const CancelAppliedFYP = (req, res) => {
  const data = req.body;

  const { userid, fypid } = data;

  FYP.findOneAndUpdate(
    { _id: fypid },
    { $pull: { fypapplicants: userid } },
    { new: true }
  )
    .then(UpdatedAppliedFYP => {
      if (UpdatedAppliedFYP) {
        Student.findOneAndUpdate(
          { userid: userid },
          { $pull: { appliedfyp: fypid } },
          { new: true }
        )
          .then(UpdatedSAppliedFYP => {
            if (UpdatedSAppliedFYP) {
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

//Exports
export { CancelAppliedFYP, AllAppliedFYP, ViewAllFYP, ApplyFYP, SearchFYP };
