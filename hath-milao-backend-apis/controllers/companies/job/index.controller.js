//Imports
import Job from "../../../models/job.model";
import User from "../../../models/user.model";
import Student from "../../../models/studentProfile.model";
import Company from "../../../models/companyProfile.model";
import Notification from "../../../models/notification.model";
import {
  SendNotifications,
  SendMobileNotification
} from "../../../util/notification";

//Job Information Added start
const AddJob = (req, res) => {
  const data = req.body;
  const job = new Job(data);

  User.findOne({ _id: data.userid })
    .then(doc => {
      job.save((err, informationAdded) => {
        if (err) {
          return res.status(500).json({
            error: err,
            informationAdded: false
          });
        } else if (informationAdded) {
          Company.findOne({ userid: data.userid })
            .then(company => {
              let new_notificaiton = {
                notification: {
                  title: informationAdded.title,
                  content: informationAdded.company,
                  jobid: informationAdded._id
                },
                receivers: company.followers
              };
              let notification = new Notification(new_notificaiton);

              notification.save(async (err, addednotification) => {
                const followers = await Student.find({
                  userid: {
                    $in: addednotification.receivers
                  }
                });

                if (followers) {
                  const web_receivers = followers.map(follower => follower.fcm);
                  const mobile_receivers = followers.map(
                    follower => follower.expoToken
                  );

                  SendNotifications(
                    addednotification.notification,
                    web_receivers
                  );
                  SendMobileNotification(
                    addednotification.notification,
                    mobile_receivers
                  );
                }

                return res.status(200).json({
                  error: null,
                  informationAdded: true,
                  jobInfo: informationAdded,
                  notification: addednotification
                });
              });
            })
            .catch(err => {
              return res.status(500).json({
                error: "Job ID not Found",
                job: null
              });
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
//Job Information Added End

//Job Information View start
const ViewJob = (req, res) => {
  const { jobid } = req.params;

  Job.findOne({ _id: jobid })
    .then(job => {
      return res.status(200).json({
        error: null,
        job: job
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "Job ID not Found",
        job: null
      });
    });
};
//Job Information View End

//ALL Job Information View start
const ViewAllJob = (req, res) => {
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
  Job.paginate({ userid: userid, status: "active" }, options)
    .then(job => {
      return res.status(200).json({
        error: null,
        jobs: job
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "User id not Found",
        job: null
      });
    });
};
//ALL Job Information View End

//Search Job Information View start
const SearchJob = (req, res) => {
  const { userid, pageNumber, date, title, type } = req.params;
  let filter_object = { userid: userid, status: "active" };
  if (date !== "null") {
    let pair = { postingdate: new Date(date) };
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
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  Job.paginate(filter_object, options)
    .then(job => {
      return res.status(200).json({
        error: null,
        jobs: job
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "User id not Found",
        job: null
      });
    });
};
//Search Job Information View End

//Job Information Update start
const UpdateJob = (req, res) => {
  const data = req.body;

  const { jobid } = req.params;

  const updateJob = {
    title: data.title,
    field: data.field,
    jobType: data.jobType,
    minexperience: data.minexperience,
    maxexperience: data.maxexperience,
    requireddegree: data.requireddegree,
    city: data.city,
    country: data.country,
    totalposition: data.totalposition,
    description: data.description,
    requiredSkill: data.requiredSkill,
    applybefore: data.applybefore,
    postingdate: data.postingdate,
    minsalary: data.minsalary,
    maxsalary: data.maxsalary,
    status: data.status
  };

  Job.findOneAndUpdate({ _id: jobid }, { $set: updateJob }, { new: true })
    .then(newJob => {
      if (newJob) {
        return res.status(200).json({
          error: null,
          updatedJob: newJob
        });
      } else {
        return res.status(500).json({
          error: "Job Not Exist",
          updatedJob: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Job Id Not Exist",
        updatedJob: null
      });
    });
};
//Job Information Update End

// Job Delete Start

const DeleteJob = (req, res) => {
  const { jobid } = req.params;

  const updateJob = {
    status: "inactive"
  };

  Job.findOneAndUpdate({ _id: jobid }, { $set: updateJob }, { new: true })
    .then(newJob => {
      if (newJob) {
        Notification.deleteOne({ "notification.jobid": jobid })
          .then(newJob => {
            if (newJob) {
              return res.status(200).json({
                error: null,
                deleteJob: newJob
              });
            } else {
              return res.status(500).json({
                error: "Job Not Exist",
                deleteJob: null
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "Job Id Not Exist",
              deleteJob: null
            });
          });
      } else {
        return res.status(500).json({
          error: "Job Not Exist",
          updatedJob: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Job Id Not Exist",
        updatedJob: null
      });
    });
};

// const DeleteJob = (req, res) => {
//   const { jobid } = req.params;

//   Job.deleteOne({ _id: jobid })
//     .then(newJob => {
//       if (newJob) {
//         return res.status(200).json({
//           error: null,
//           deleteJob: newJob
//         });
//       } else {
//         return res.status(500).json({
//           error: "Job Not Exist",
//           deleteJob: null
//         });
//       }
//     })
//     .catch(err => {
//       return res.status(500).json({
//         error: "Job Id Not Exist",
//         deleteJob: null
//       });
//     });
// };

// Job Delete End

// Job Applicant Start
const JobApplicants = (req, res) => {
  const { pageNumber, jobid } = req.params;

  const options = {
    page: pageNumber,
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  Job.find({ _id: jobid }, "jobapplicants")
    .then(JobApplicant => {
      if (JobApplicant) {
        let getJobApplicantArray = JobApplicant[0].jobapplicants;

        Student.paginate({ userid: { $in: getJobApplicantArray } }, options)
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
              error: "Job  Not Exist"
            });
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
};
// Job Applicant End

// Search Job Applicant Start
const SearchJobApplicants = (req, res) => {
  const { pageNumber, jobid, headline, city, country, skill } = req.params;

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

  Job.find({ _id: jobid }, "jobapplicants")
    .then(JobApplicant => {
      if (JobApplicant) {
        let getJobApplicantArray = JobApplicant[0].jobapplicants;

        let pair = { userid: { $in: getJobApplicantArray } };
        filter_object = { ...filter_object, ...pair };
        Student.paginate(filter_object, options)
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
              error: "Job  Not Exist"
            });
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
};
// Job Applicant End

//Exports
export {
  AddJob,
  UpdateJob,
  ViewJob,
  ViewAllJob,
  SearchJob,
  DeleteJob,
  JobApplicants,
  SearchJobApplicants
};
