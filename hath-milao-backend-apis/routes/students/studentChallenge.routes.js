const express = require("express");
const router = express.Router();

import { isStudent, isLoggedIn } from "../../middleware/auth";

//Controller Of Jobs
import {
  AllAttemptChallenge,
  AttemptChallenge,
  ViewAllChallenge,
  CancelAttemptChallenge,
  UploadSolution,
  SearchChallenge
} from "../../controllers/students/challenge/index.controller";

//All Routes Related to Challenges
router.get("/all/:pageNumber/:userid", isLoggedIn, isStudent, ViewAllChallenge);

router.post("/attempt", isLoggedIn, isStudent, AttemptChallenge);
router.post("/cancelattempt", isLoggedIn, isStudent, CancelAttemptChallenge);
router.post("/uploadsolution", isLoggedIn, isStudent, UploadSolution);

router.get(
  "/search/:pageNumber/:field/:city/:company/:requireddegree/:userid",
  isLoggedIn,
  isStudent,
  SearchChallenge
);

router.get(
  "/attemptchallenges/:pageNumber/:userid",
  isLoggedIn,
  isStudent,
  AllAttemptChallenge
);

const StudentChallengeRouter = router;
export default StudentChallengeRouter;
