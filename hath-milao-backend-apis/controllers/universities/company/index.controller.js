//Imports

import Company from "../../../models/companyProfile.model";
import University from "../../../models/universityProfile.model";

//View All Companies start
const ViewAllCompanies = (req, res) => {
  const { pageNumber, universityid } = req.params;
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
        University.findOne({ userid: universityid })
          .then(university => {
            if (university) {
              return res.status(200).json({
                companies: Companies,
                companyContacts: university.companyContacts
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "University Not Found"
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

// Search Company Start
const SearchCompany = (req, res) => {
  const { pageNumber, name, city, field, universityid } = req.params;

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
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  Company.paginate(filter_object, options)
    .then(Companies => {
      if (Companies) {
        University.findOne({ userid: universityid })
          .then(university => {
            if (university) {
              return res.status(200).json({
                companies: Companies,
                companyContacts: university.companyContacts
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "University Not Found"
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
export { ViewAllCompanies, SearchCompany };
