const express = require("express");
const router = express.Router();

import { isStudent, isLoggedIn } from "../../middleware/auth";

//Controller Of Jobs
import {
  ViewAllJob,
  SearchJob,
  ApplyJob,
  SaveJob,
  AllSavedJob,
  AllAppliedJob,
  UnSavedJob,
  CancelAppliedJob,
  recommendedJobs
} from "../../controllers/students/job/index.controller";

//All Routes Related to Jobs
router.get("/all/:pageNumber/:userid", isLoggedIn, isStudent, ViewAllJob);
router.get(
  "/recommended/:userid/:pageNumber",
  isLoggedIn,
  isStudent,
  recommendedJobs
);

router.get(
  "/search/:pageNumber/:title/:city/:company/:type/:userid",
  isLoggedIn,
  isStudent,
  SearchJob
);

router.post("/apply", isLoggedIn, isStudent, ApplyJob);
router.post("/save", isLoggedIn, isStudent, SaveJob);
router.post("/unsavejob", isLoggedIn, isStudent, UnSavedJob);
router.post("/cancelappliedjob", isLoggedIn, isStudent, CancelAppliedJob);

router.get(
  "/savedjobs/:pageNumber/:userid",
  isLoggedIn,
  isStudent,
  AllSavedJob
);
router.get(
  "/appliedjobs/:pageNumber/:userid",
  isLoggedIn,
  isStudent,
  AllAppliedJob
);

const StudentJobRouter = router;
export default StudentJobRouter;
