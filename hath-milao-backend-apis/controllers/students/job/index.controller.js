//Imports

import Job from "../../../models/job.model";
import Student from "../../../models/studentProfile.model";

import ContentBasedRecommender from "../../../recommendation_engine/index.js";

//View All Jobs start
const ViewAllJob = (req, res) => {
  const { pageNumber, userid } = req.params;
  const options = {
    page: pageNumber,
    limit: 5,
    sort: { postingdate: -1 },
    collation: {
      locale: "en"
    }
  };
  Job.paginate({ status: "active" }, options)
    .then(jobs => {
      if (jobs) {
        Student.find({ userid: userid }, "appliedjob savedjob")
          .then(studentDoc => {
            if (studentDoc) {
              return res.status(200).json({
                error: null,
                jobs: jobs,
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
        error: "Job Not Found"
      });
    });
};
//View All Jobs End

//Search Job Information View start
const SearchJob = (req, res) => {
  const { pageNumber, title, city, company, type, userid } = req.params;

  let filter_object = { status: "active" };
  if (city !== "null") {
    let pair = { city: { $regex: city, $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }
  if (company !== "null") {
    const companyRegex = new RegExp(company, "i");
    let pair = { company: companyRegex };

    filter_object = { ...filter_object, ...pair };
  }
  if (title !== "null") {
    let pair = { title: { $regex: ".*" + title + ".*", $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }
  if (type !== "null") {
    let pair = { jobType: type };
    filter_object = { ...filter_object, ...pair };
  }

  const options = {
    page: pageNumber,
    limit: 20,
    collation: {
      locale: "en"
    }
  };

  Job.paginate(filter_object, options)
    .then(jobs => {
      if (jobs) {
        Student.find({ userid: userid }, "appliedjob savedjob")
          .then(studentDoc => {
            if (studentDoc) {
              return res.status(200).json({
                error: null,
                jobs: jobs,
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
        job: null
      });
    });
};
//Search Job Information View End

// Apply Job API Start
const ApplyJob = (req, res) => {
  const data = req.body;

  const { userid, jobid } = data;

  Student.findOneAndUpdate(
    { userid: userid },
    { $push: { appliedjob: jobid } },
    { new: true }
  )
    .then(UpdatedAppliedJob => {
      if (UpdatedAppliedJob) {
        Job.findOneAndUpdate(
          { _id: jobid },
          { $push: { jobapplicants: userid } },
          { new: true }
        )
          .then(UpdatedCompanyJobApplicants => {
            if (UpdatedCompanyJobApplicants) {
              return res.status(200).json({
                error: null,
                UpdatedAppliedJob: UpdatedAppliedJob,
                UpdatedCompanyJobApplicants: UpdatedCompanyJobApplicants
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
// Apply Job API End

// Saved Job API Start
const SaveJob = (req, res) => {
  const data = req.body;

  const { userid, jobid } = data;

  Student.findOneAndUpdate(
    { userid: userid },
    { $push: { savedjob: jobid } },
    { new: true }
  )
    .then(UpdatedSavedJob => {
      if (UpdatedSavedJob) {
        return res.status(200).json({
          error: null,
          UpdatedSavedJob: UpdatedSavedJob
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
// Saved Job API End

// ALL Saved Job  Return API Start
const AllSavedJob = (req, res) => {
  const { pageNumber, userid } = req.params;

  const options = {
    page: pageNumber,
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  Student.find({ userid: userid }, "savedjob appliedjob")
    .then(SavedJob => {
      if (SavedJob) {
        let getJobArray = SavedJob[0].savedjob;

        Job.paginate({ _id: { $in: getJobArray } }, options)
          .then(AllJobs => {
            if (AllJobs) {
              return res.status(200).json({
                error: null,
                jobs: AllJobs,
                studentDoc: SavedJob
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
// ALL Saved Job Return API End

// ALL Applied Job  Return API Start
const AllAppliedJob = (req, res) => {
  const { pageNumber, userid } = req.params;

  const options = {
    page: pageNumber,
    limit: 5,
    sort: { postingdate: -1 },

    collation: {
      locale: "en"
    }
  };

  Student.find({ userid: userid }, "appliedjob")
    .then(AppliedJob => {
      if (AppliedJob) {
        let getJobArray = AppliedJob[0].appliedjob;

        Job.paginate({ _id: { $in: getJobArray } }, options)
          .then(AllJobs => {
            if (AllJobs) {
              return res.status(200).json({
                error: null,
                jobs: AllJobs
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

// Unsaved API Start
const UnSavedJob = (req, res) => {
  const data = req.body;

  const { userid, jobid } = data;

  Student.findOneAndUpdate(
    { userid: userid },
    { $pull: { savedjob: jobid } },
    { new: true }
  )
    .then(UpdatedSavedJob => {
      if (UpdatedSavedJob) {
        return res.status(200).json({
          error: null,
          UpdatedSavedJob: UpdatedSavedJob
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
// UnsavedReturn API End

// Cancel API Start
const CancelAppliedJob = (req, res) => {
  const data = req.body;

  const { userid, jobid } = data;

  Job.findOneAndUpdate(
    { _id: jobid },
    { $pull: { jobapplicants: userid } },
    { new: true }
  )
    .then(UpdatedAppliedJob => {
      if (UpdatedAppliedJob) {
        Student.findOneAndUpdate(
          { userid: userid },
          { $pull: { appliedjob: jobid } },
          { new: true }
        )
          .then(UpdatedSAppliedJob => {
            if (UpdatedSAppliedJob) {
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

// Recommend API START
const recommendedJobs = (req, res) => {
  const { userid, pageNumber } = req.params;
  const options = {
    page: pageNumber,
    limit: 5,
    sort: { postingdate: -1 },
    collation: {
      locale: "en"
    }
  };
  Student.find({ userid: userid })
    .then(student => {
      const { skill, experience, headline, summary } = student[0];
      let predication_data = [];
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
            student_content + " " + element.title + " " + element.description;
        });
      }

      predication_data.push({ id: userid, content: student_content });

      Job.find()
        .then(jobs => {
          jobs.forEach(job => {
            let job_content = "";
            const { field, requiredSkill, description, title, _id } = job;
            job_content = field.join(" ");
            job_content = job_content + " " + requiredSkill.join(" ");
            job_content = job_content + " " + title;
            job_content = job_content + " " + description;
            predication_data.push({ id: _id, content: job_content });
          });
          const recommender = new ContentBasedRecommender();
          recommender.predicate(predication_data);
          const recommended_jobs = recommender.getSimilarDocuments(
            userid,
            0,
            10
          );

          let get_jobs = [];
          if (recommended_jobs) {
            recommended_jobs.forEach(job => {
              get_jobs.push(job.id);
            });
          }

          Job.paginate({ _id: { $in: get_jobs }, status: "active" }, options)
            .then(jobs => {
              if (jobs) {
                Student.find({ userid: userid }, "appliedjob savedjob")
                  .then(studentDoc => {
                    if (studentDoc) {
                      return res.status(200).json({
                        error: null,
                        jobs: jobs,
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
                error: "Jobs Not Exist"
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
        error: "Student Id Not Exist"
      });
    });
};
// Recommend API End

//Exports
export {
  ViewAllJob,
  SearchJob,
  ApplyJob,
  SaveJob,
  AllSavedJob,
  AllAppliedJob,
  UnSavedJob,
  CancelAppliedJob,
  recommendedJobs
};
