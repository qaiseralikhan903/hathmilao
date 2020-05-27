//Imports
import Event from "../../../models/event.model";
import Company from "../../../models/companyProfile.model";
import Challenge from "../../../models/challenge.model";
import FYP from "../../../models/fyp.model";
import Job from "../../../models/job.model";
import { Types } from "mongoose";

//Box Statistics Start
const BoxStatistics = (req, res) => {
  const { userid } = req.params;
  Company.findOne({ userid: userid })
    .then(companyFound => {
      Event.find({ userid: userid })
        .then(events => {
          Challenge.find({ userid: userid })
            .then(challenges => {
              FYP.find({ userid: userid })
                .then(fyps => {
                  Job.find({ userid: userid })
                    .then(jobs => {
                      const totalFollower = companyFound.followers.length;
                      return res.status(200).json({
                        TotalJobs: jobs.length,
                        TotalEvents: events.length,
                        TotalChallenges: challenges.length,
                        Totalfyps: fyps.length,
                        TotalFollowers: totalFollower,
                        error: null
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
                    error: "FYP Not Exist"
                  });
                });
            })
            .catch(err => {
              return res.status(500).json({
                error: "Challenges Not Exist"
              });
            });
        })
        .catch(err => {
          return res.status(500).json({
            error: "Events Not Found ID not Found"
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        error: "Company ID not Found",
        userData: null
      });
    });
};
//Box Statistics Start

//Line Chart Statistics Start
const LineStatistics = (req, res) => {
  const { userid } = req.params;
  Job.aggregate([
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
    .then(jobs => {
      return res.status(200).json({
        jobs: jobs
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "Jobs not Found",
        userData: null
      });
    });
};
//Line Chart Statistics End

//Exports
export { BoxStatistics, LineStatistics };
