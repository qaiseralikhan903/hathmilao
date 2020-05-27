//Imports
import Student from "../../../models/studentProfile.model";
import Company from "../../../models/companyProfile.model";
import University from "../../../models/universityProfile.model";
import Job from "../../../models/job.model";
import ContentBasedRecommender from "../../../recommendation_engine/index.js";

//View All University start
const ViewAllUniversity = (req, res) => {
  const { pageNumber, companyid } = req.params;
  const options = {
    page: pageNumber,
    limit: 10,
    collation: {
      locale: "en"
    }
  };
  University.paginate({}, options)
    .then(universities => {
      if (universities) {
        Company.findOne({ userid: companyid })
          .then(company => {
            if (company) {
              return res.status(200).json({
                universities: universities,
                universityContacts: company.universityContacts
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
        error: "University Not Found"
      });
    });
};
//View All University End

//Search University Information View start
const SearchUniversity = (req, res) => {
  const { pageNumber, name, city, field, companyid } = req.params;
  let filter_object = {};

  if (name !== "null") {
    let pair = { name: { $regex: ".*" + name + ".*", $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }

  if (city !== "null") {
    let pair = { city: { $regex: ".*" + city + ".*", $options: "i" } };
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

  University.paginate(filter_object, options)
    .then(universities => {
      if (universities) {
        Company.findOne({ userid: companyid })
          .then(company => {
            if (company) {
              return res.status(200).json({
                universities: universities,
                universityContacts: company.universityContacts
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "Company Not Found"
            });
          });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "University Not Found",
        student: null
      });
    });
};
//Search University Information View End

//Exports
export { ViewAllUniversity, SearchUniversity };
