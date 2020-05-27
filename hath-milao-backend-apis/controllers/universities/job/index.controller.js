import Student from "../../../models/studentProfile.model";
import University from "../../../models/universityProfile.model";

const JoblessStudent = (req, res) => {
  const { userid, pageNumber, univeristy } = req.params;

  University.findOne({ userid: userid })
    .then(universityFound => {
      const options = {
        page: pageNumber,
        limit: 5,
        collation: {
          locale: "en"
        }
      };

      Student.paginate(
        {
          looking: true,
          "education.institution": {
            $regex: ".*" + univeristy.substring(0, 4) + ".*",
            $options: "i"
          },
          "education.campus": {
            $regex: ".*" + universityFound.city + ".*",
            $options: "i"
          }
        },
        options
      )
        .then(JoblessStudent => {
          if (JoblessStudent) {
            return res.status(200).json({
              JoblessStudent: JoblessStudent,
              studentContacts: universityFound.studentContacts,
              error: null
            });
          } else {
            return res.status(500).json({
              error: "Job Id Not Exist"
            });
          }
        })
        .catch(err => {
          return res.status(500).json({
            error: "Job Id Not Exist"
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        error: "University ID not Found",
        userData: null
      });
    });
};

const SearchStudent = (req, res) => {
  const {
    userid,
    pageNumber,
    univeristy,
    headline,
    degree,
    city,
    skill
  } = req.params;

  University.findOne({ userid: userid })
    .then(universityFound => {
      const options = {
        page: pageNumber,
        limit: 5,
        collation: {
          locale: "en"
        }
      };

      let filter_object = {
        looking: true,
        "education.institution": {
          $regex: ".*" + univeristy.substring(0, 4) + ".*",
          $options: "i"
        },
        "education.campus": {
          $regex: ".*" + universityFound.city + ".*",
          $options: "i"
        }
      };

      if (headline !== "null") {
        let pair = {
          headline: { $regex: ".*" + headline + ".*", $options: "i" }
        };
        filter_object = { ...filter_object, ...pair };
      }

      if (city !== "null") {
        let pair = { city: { $regex: ".*" + city + ".*", $options: "i" } };
        filter_object = { ...filter_object, ...pair };
      }

      if (degree !== "null") {
        let pair = {
          "education.degree": { $regex: ".*" + degree + ".*", $options: "i" }
        };
        filter_object = { ...filter_object, ...pair };
      }

      if (skill !== "null") {
        let pair = {
          skill: { $elemMatch: { $regex: skill, $options: "i" } }
        };
        filter_object = { ...filter_object, ...pair };
      }

      Student.paginate(filter_object, options)
        .then(JoblessStudent => {
          if (JoblessStudent) {
            return res.status(200).json({
              JoblessStudent: JoblessStudent,
              studentContacts: universityFound.studentContacts,
              error: null
            });
          } else {
            return res.status(500).json({
              error: "Job Id Not Exist"
            });
          }
        })
        .catch(err => {
          return res.status(500).json({
            error: "Job Id Not Exist"
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        error: "University ID not Found",
        userData: null
      });
    });
};

//Exports
export { JoblessStudent, SearchStudent };
