//Imports
import User from "../../../models/user.model";
import Student from "../../../models/studentProfile.model";
import Event from "../../../models/event.model";
import University from "../../../models/universityProfile.model";
import { Types } from "mongoose";

//Box Statistics Start
const BoxStatistics = (req, res) => {
  const { userid, univeristy } = req.params;
  let uni = univeristy.substring(0, 4);
  University.findOne({ userid: userid })
    .then(universityFound => {
      Event.find({ userid: userid })
        .then(events => {
          let jobfairs = events.filter(event => {
            return event.eventType === "jobfair";
          });

          // On Job and Jobless Students Filtering Start
          Student.find({
            "education.institution": {
              $regex: ".*" + uni + ".*",
              $options: "i"
            },
            "education.campus": {
              $regex: ".*" + universityFound.city + ".*",
              $options: "i"
            }
          })
            .then(Studnets => {
              if (Studnets) {
                let jobless = Studnets.filter(student => {
                  return student.looking === true;
                });
                let onJob = Studnets.filter(student => {
                  return student.looking === false;
                });
                return res.status(200).json({
                  TotalJobless: jobless.length,
                  TotalOnJob: onJob.length,
                  TotalEvents: events.length,
                  TotalJobFair: jobfairs.length,
                  error: null
                });
              } else {
                return res.status(500).json({
                  error: "Students Not Exist"
                });
              }
            })
            .catch(err => {
              return res.status(500).json({
                error: "Students Not Exist"
              });
            });
          // On Job and Jobless Students Filtering End
        })
        .catch(err => {
          return res.status(500).json({
            error: "Events Not Found ID not Found"
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
//Box Statistics Start

//Line Chart Statistics Start
const LineStatistics = (req, res) => {
  const { userid } = req.params;
  Event.aggregate([
    { $match: { userid: Types.ObjectId(userid) } },
    {
      $project: {
        month: { $month: "$postingdate" },
        year: { $year: "$postingdate" }
      }
    },

    {
      $group: {
        _id: { month: "$month", year: "$year" },
        count: { $sum: 1 }
      }
    }
  ])
    .then(events => {
      return res.status(200).json({
        events: events
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "Event not Found",
        userData: null
      });
    });
};
//Box Statistics Start

//Exports
export { BoxStatistics, LineStatistics };
