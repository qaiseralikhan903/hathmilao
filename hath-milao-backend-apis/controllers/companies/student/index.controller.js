//Imports
import Student from "../../../models/studentProfile.model";
import Company from "../../../models/companyProfile.model";
import Job from "../../../models/job.model";
import ContentBasedRecommender from "../../../recommendation_engine/index.js";

//View All Students start
const ViewAllStudents = (req, res) => {
  const { pageNumber, companyid } = req.params;
  const options = {
    page: pageNumber,
    limit: 10,
    collation: {
      locale: "en"
    }
  };
  Student.paginate({}, options)
    .then(students => {
      if (students) {
        Company.findOne({ userid: companyid })
          .then(company => {
            if (company) {
              return res.status(200).json({
                students: students,
                studentContacts: company.studentContacts
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
        error: "Students Not Found"
      });
    });
};
//View All Students End

//Search Student Information View start
const SearchStudent = (req, res) => {
  const { pageNumber, headline, city, country, skill, companyid } = req.params;
  let filter_object = {};

  if (headline !== "null") {
    let pair = { headline: { $regex: ".*" + headline + ".*", $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }

  if (city !== "null") {
    let pair = { city: { $regex: ".*" + city + ".*", $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }

  if (country !== "null") {
    let pair = { country: { $regex: ".*" + country + ".*", $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }

  if (skill !== "null") {
    let pair = {
      skill: { $elemMatch: { $regex: skill, $options: "i" } }
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

  Student.paginate(filter_object, options)
    .then(students => {
      if (students) {
        Company.findOne({ userid: companyid })
          .then(company => {
            if (company) {
              return res.status(200).json({
                students: students,
                studentContacts: company.studentContacts
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
        error: "Students Not Found",
        student: null
      });
    });
};
//Search Student Information View End

// Recommend Students API START
const recommendedStudent = (req, res) => {
  const { userid, pageNumber } = req.params;
  const options = {
    page: pageNumber,
    limit: 10,
    collation: {
      locale: "en"
    }
  };

  Company.findOne({ userid: userid })
    .then(company => {
      const { specialties, industry } = company;

      let predication_data = [];
      let company_content = "";
      if (specialties) {
        company_content = specialties.join(" ");
      }

      if (industry) {
        company_content = company_content + " " + industry;
      }

      Job.find({ userid: userid })
        .then(jobs => {
          if (jobs) {
            jobs.forEach(job => {
              const { requiredSkill, title } = job;
              if (requiredSkill) {
                company_content =
                  company_content + " " + requiredSkill.join(" ");
              }
              if (title) {
                company_content = company_content + " " + title;
              }
            });
          }

          predication_data.push({
            id: userid,
            content: company_content
          });

          Student.find()
            .then(students => {
              if (students) {
                students.forEach(student => {
                  const {
                    userid,
                    skill,
                    experience,
                    headline,
                    summary
                  } = student;
                  let student_content = "";
                  if (skill) {
                    student_content = skill.join(" ");
                  }

                  if (headline) {
                    student_content = student_content + " " + headline;
                  }

                  if (summary) {
                    student_content = student_content + " " + summary;
                  }

                  if (experience) {
                    experience.forEach(element => {
                      student_content =
                        student_content +
                        " " +
                        element.title +
                        " " +
                        element.description;
                    });
                  }

                  predication_data.push({
                    id: userid,
                    content: student_content
                  });
                });

                const recommender = new ContentBasedRecommender();
                recommender.predicate(predication_data);
                const recommended_students = recommender.getSimilarDocuments(
                  userid,
                  0.1,
                  100
                );

                let get_students = [];
                if (recommended_students) {
                  recommended_students.forEach(student => {
                    if (student.score >= 0.04) {
                      get_students.push(student.id);
                    }
                  });
                }

                Student.paginate({ userid: { $in: get_students } }, options)
                  .then(students => {
                    if (students) {
                      Company.findOne({ userid: userid })
                        .then(company => {
                          if (company) {
                            return res.status(200).json({
                              students: students,
                              studentContacts: company.studentContacts
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
                      error: "Students Not Exist"
                    });
                  });
              }
            })
            .catch(err => {
              return res.status(500).json({
                error: "Student Not Exist"
              });
            });
        })
        .catch(err => {
          return res.status(500).json({
            error: "Jobs Not Exist"
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        error: "Company Not Exist"
      });
    });
};
// Recommend Students API End

//Exports
export { ViewAllStudents, SearchStudent, recommendedStudent };
