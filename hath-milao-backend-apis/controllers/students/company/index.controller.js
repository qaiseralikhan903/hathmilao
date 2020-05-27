//Imports

import Company from "../../../models/companyProfile.model";
import Student from "../../../models/studentProfile.model";

//View All Companies start
const ViewAllCompanies = (req, res) => {
  const { pageNumber, studentid } = req.params;
  const options = {
    page: pageNumber,
    limit: 10,
    collation: {
      locale: "en"
    }
  };
  Company.paginate({}, options)
    .then(Companies => {
      if (Companies) {
        Student.findOne({ userid: studentid })
          .then(student => {
            if (student) {
              return res.status(200).json({
                companies: Companies,
                companyContacts: student.companyContacts
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "Student Not Found"
            });
          });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Company Not Found"
      });
    });
};
//View All Companies End

// Company Follow Job API Start
const FollowCompany = (req, res) => {
  const { companyid, studentid } = req.params;

  Company.findOneAndUpdate(
    { userid: companyid },
    { $push: { followers: studentid } },
    { new: true }
  )
    .then(Updated => {
      if (Updated) {
        return res.status(200).json({
          error: null
        });
      } else {
        return res.status(500).json({
          error: "Company Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Company Id Not Exist"
      });
    });
};
// Company Follow Job API End

// Company UnFollow Job API Start
const UnFollowCompany = (req, res) => {
  const { companyid, studentid } = req.params;

  Company.findOneAndUpdate(
    { userid: companyid },
    { $pull: { followers: studentid } },
    { new: true }
  )
    .then(Updated => {
      if (Updated) {
        return res.status(200).json({
          error: null
        });
      } else {
        return res.status(500).json({
          error: "Company Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Company Id Not Exist"
      });
    });
};
// Company UnFollow Job API End

// Add to Contact API Start
const AddToContact = (req, res) => {
  const { companyid, studentid } = req.params;

  Student.findOneAndUpdate(
    { userid: studentid },
    { $push: { companyContacts: companyid } },
    { new: true }
  )
    .then(Updated => {
      if (Updated) {
        Company.findOneAndUpdate(
          { userid: companyid },
          { $push: { studentContacts: studentid } },
          { new: true }
        )
          .then(Updated => {
            if (Updated) {
              return res.status(200).json({
                error: null
              });
            } else {
              return res.status(500).json({
                error: "Company Id Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "Company Id Not Exist"
            });
          });
      } else {
        return res.status(500).json({
          error: "Student Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Student Id Not Exist"
      });
    });
};
// Add to Contact API End

// Add to Contact API Start
const RemoveContact = (req, res) => {
  const { companyid, studentid } = req.params;

  Student.findOneAndUpdate(
    { userid: studentid },
    { $pull: { companyContacts: companyid } },
    { new: true }
  )
    .then(Updated => {
      if (Updated) {
        return res.status(200).json({
          error: null
        });
      } else {
        return res.status(500).json({
          error: "Student Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Student Id Not Exist"
      });
    });
};
// Add to Contact API End

// Search Company Start
const SearchCompany = (req, res) => {
  const { pageNumber, name, city, field, studentid } = req.params;

  let filter_object = {};
  if (city !== "null") {
    let pair = {
      city: { $elemMatch: { $regex: city, $options: "i" } }
    };
    filter_object = { ...filter_object, ...pair };
  }

  if (name !== "null") {
    let pair = { name: { $regex: name, $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }
  if (field !== "null") {
    let pair = {
      specialties: { $elemMatch: { $regex: field, $options: "i" } }
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

  Company.paginate(filter_object, options)
    .then(Companies => {
      if (Companies) {
        Student.findOne({ userid: studentid })
          .then(student => {
            if (student) {
              return res.status(200).json({
                companies: Companies,
                companyContacts: student.companyContacts
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "Student Not Found"
            });
          });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "User id not Found"
      });
    });
};
// Search Company End

//Exports
export {
  ViewAllCompanies,
  UnFollowCompany,
  FollowCompany,
  AddToContact,
  RemoveContact,
  SearchCompany
};
