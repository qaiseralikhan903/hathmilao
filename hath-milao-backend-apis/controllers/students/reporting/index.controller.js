//Imports

import Job from "../../../models/job.model";
import Student from "../../../models/studentProfile.model";

//Box Statistics Start
const BoxStatistics = (req, res) => {
  const { userid } = req.params;
  Student.findOne({ userid: userid })
    .then(studentFound => {
      return res.status(200).json({
        TotalJobs: studentFound.appliedjob.length,
        Totalfyps: studentFound.appliedfyp.length,
        TotalEvents: studentFound.registeredevents.length,
        TotalChallenges: studentFound.attemptchallenges.length,
        error: null
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "Student ID not Found",
        userData: null
      });
    });
};
//Box Statistics Start

//Bar Chart Statistics Start
const BarStatistics = (req, res) => {
  const { userid } = req.params;
  Job.aggregate([
    { $unwind: "$requiredSkill" },
    { $group: { _id: "$requiredSkill", count: { $sum: 1 } } },
    {
      $group: {
        _id: null,
        skill_details: {
          $push: { skill: "$_id", count: "$count" }
        }
      }
    },
    { $project: { _id: 0, skill_details: 1 } }
  ])
    .then(skills => {
      let skill_details = skills[0].skill_details.sort(
        (a, b) => b.count - a.count
      );
      if (skill_details.length > 10) {
        skill_details = skill_details.slice(0, 10);
      }
      return res.status(200).json({
        skills: skill_details
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "skills not Found",
        userData: null
      });
    });
};
//Bar Chart Statistics End

//Bar Chart Statistics Start
const BarFieldStatistics = (req, res) => {
  const { userid } = req.params;
  Job.aggregate([
    { $unwind: "$field" },
    { $group: { _id: "$field", count: { $sum: 1 } } },
    {
      $group: {
        _id: null,
        field_details: {
          $push: { field: "$_id", count: "$count" }
        }
      }
    },
    { $project: { _id: 0, field_details: 1 } }
  ])
    .then(fields => {
      let field_details = fields[0].field_details.sort(
        (a, b) => b.count - a.count
      );
      if (field_details.length > 5) {
        field_details = field_details.slice(0, 6);
      }
      return res.status(200).json({
        fields: field_details
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "skills not Found",
        userData: null
      });
    });
};
//Bar Chart Statistics End

//Exports
export { BoxStatistics, BarStatistics, BarFieldStatistics };
