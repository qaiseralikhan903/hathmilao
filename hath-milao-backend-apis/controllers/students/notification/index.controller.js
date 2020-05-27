//Imports
import Student from "../../../models/studentProfile.model";
import Notification from "../../../models/notification.model";
import Job from "../../../models/job.model";
const mongoose = require("mongoose");

//FCM Information Added start
const AddFCM = (req, res) => {
  const data = req.body;

  Student.findOneAndUpdate(
    { userid: data.userid },
    { $push: { fcm: data.fcm } },
    { new: true }
  )
    .then(newUser => {
      if (newUser) {
        return res.status(200).json({
          error: null
        });
      } else {
        return res.status(500).json({
          error: "Student Not Exist",
          updatedUser: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Student Id Not Exist",
        updatedUser: null
      });
    });
};
//FCM Information Added End

//FCM Information Update start
const UpdateFCM = (req, res) => {
  const data = req.body;

  Student.findOneAndUpdate(
    { userid: data.userid },
    { $pull: { fcm: data.fcm } },
    { new: true }
  )
    .then(newUser => {
      if (newUser) {
        return res.status(200).json({
          error: null,
          updatedUser: newUser
        });
      } else {
        return res.status(500).json({
          error: "Student Not Exist",
          updatedUser: null
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Student Id Not Exist",
        updatedUser: null
      });
    });
};
//FCM Information Update End

// Job Notification Start
const allNotificationJob = (req, res) => {
  const { pageNumber, userid } = req.params;
  const options = {
    page: pageNumber,
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  Notification.find({ receivers: mongoose.Types.ObjectId(userid) })
    .then(allNotifications => {
      if (allNotifications) {
        let jobArrayID = [];
        allNotifications.filter(obj => {
          jobArrayID.push(obj.notification.jobid);
          return "";
        });

        Job.paginate({ _id: { $in: jobArrayID } }, options)
          .then(AllJobs => {
            if (AllJobs) {
              Student.find({ userid: userid }, "appliedjob savedjob")
                .then(studentDoc => {
                  if (studentDoc) {
                    return res.status(200).json({
                      error: null,
                      jobs: AllJobs,
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
// Job Notification END

//Expo Tokken Information Added start
const AddExpoTokken = async (req, res) => {
  const { userid, fcm } = req.body;

  const student = await Student.findOne({ userid });

  if (!student) {
    return res.status(500).json({
      error: "Student Id Not Exist",
      updatedUser: null
    });
  }

  student.expoToken = student.expoToken ? [...student.expoToken, fcm] : [fcm];
  student.save(err => {
    if (err) {
      return res.status(500).json({
        error: "Student Id Not Exist",
        updatedUser: null
      });
    } else {
      return res.status(200).json({
        error: null
      });
    }
  });
};
//Expo Tokken Information Added End

//Expo Tokken Information Update start
const UpdateExpoTokken = async (req, res) => {
  const { userid, fcm } = req.body;
  const student = await Student.findOne({ userid });

  if (!student) {
    return res.status(500).json({
      error: "Student Id Not Exist",
      updatedUser: null
    });
  }

  const newTokens = student.expoToken.filter(token => token !== fcm);
  student.expoToken = newTokens;
  student.save(err => {
    if (err) {
      return res.status(500).json({
        error: "Student Id Not Exist",
        updatedUser: null
      });
    } else {
      return res.status(200).json({
        error: null
      });
    }
  });
};
//Expo Tokken Information Update End

//Exports
export {
  AddFCM,
  UpdateFCM,
  allNotificationJob,
  AddExpoTokken,
  UpdateExpoTokken
};
