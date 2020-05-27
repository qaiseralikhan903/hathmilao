//Imports
import FYP from "../../../models/fyp.model";
import User from "../../../models/user.model";
import Student from "../../../models/studentProfile.model";

//FYP Information Added start
const AddFYP = (req, res) => {
  const data = req.body;
  const fyp = new FYP(data);

  User.findOne({ _id: data.userid })
    .then(doc => {
      fyp.save((err, informationAdded) => {
        if (err) {
          return res.status(500).json({
            error: err,
            informationAdded: false
          });
        } else if (informationAdded) {
          return res.status(200).json({
            error: null,
            informationAdded: true,
            fypInfo: informationAdded
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
//FYP Information Added End

//ALL FYP Information View start
const ViewAllFYP = (req, res) => {
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
  FYP.paginate({ userid: userid, status: "active" }, options)
    .then(fyp => {
      return res.status(200).json({
        error: null,
        fyps: fyp
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "User id not Found"
      });
    });
};
//ALL FYP Information View End

//FYP Information Update start
const UpdateFYP = (req, res) => {
  const data = req.body;

  const { fypid } = req.params;

  const UpdateFYP = {
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

  FYP.findOneAndUpdate({ _id: fypid }, { $set: UpdateFYP }, { new: true })
    .then(newFYP => {
      if (newFYP) {
        return res.status(200).json({
          error: null,
          updatedFYP: newFYP
        });
      } else {
        return res.status(500).json({
          error: "FYP Not Updated"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "FYP Id Not Exist"
      });
    });
};
//Job Information Update End

// FYP Delete Start
const DeleteFYP = (req, res) => {
  const { fypid } = req.params;

  const updateFYP = {
    status: "inactive"
  };

  FYP.findOneAndUpdate({ _id: fypid }, { $set: updateFYP }, { new: true })
    .then(newFYP => {
      if (newFYP) {
        return res.status(200).json({
          error: null
        });
      } else {
        return res.status(500).json({
          error: "FYP Not Updated"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "FYP Id Not Exist"
      });
    });
};
// FYP Delete End

// FYP Applicant API Start
const FYPApplicants = (req, res) => {
  const { pageNumber, fypid } = req.params;

  const options = {
    page: pageNumber,
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  FYP.find({ _id: fypid }, "fypapplicants")
    .then(FYPApplicant => {
      if (FYPApplicant) {
        let getFYPApplicantArray = FYPApplicant[0].fypapplicants;

        Student.paginate({ userid: { $in: getFYPApplicantArray } }, options)
          .then(AllStudents => {
            if (AllStudents) {
              return res.status(200).json({
                error: null,
                students: AllStudents
              });
            } else {
              return res.status(500).json({
                error: "Students Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "FYP ID  Not Exist"
            });
          });
      } else {
        return res.status(500).json({
          error: "FYP Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "FYP Id Not Exist"
      });
    });
};
// FYP Applicant API End

//Search FYP Information View start
const SearchFYP = (req, res) => {
  const { userid, pageNumber, date, title, field } = req.params;
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

  FYP.paginate(filter_object, options)
    .then(FYP => {
      return res.status(200).json({
        error: null,
        fyps: FYP
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "User id not Found",
        fyp: null
      });
    });
};
//Search FYP Information View End

//Exports
export { AddFYP, ViewAllFYP, UpdateFYP, DeleteFYP, FYPApplicants, SearchFYP };
