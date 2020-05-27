const express = require("express");
const router = express.Router();

import { isStudent, isLoggedIn } from "../../middleware/auth";

//Controller Of Jobs
import {
  AllAppliedFYP,
  ApplyFYP,
  CancelAppliedFYP,
  ViewAllFYP,
  SearchFYP
} from "../../controllers/students/fyp/index.controller";

//All Routes Related to FYPS
router.get("/all/:pageNumber/:userid", isLoggedIn, isStudent, ViewAllFYP);

router.post("/apply", isLoggedIn, isStudent, ApplyFYP);
router.post("/cancelappliedfyp", isLoggedIn, isStudent, CancelAppliedFYP);

router.get(
  "/search/:pageNumber/:field/:city/:company/:requireddegree/:userid",
  isLoggedIn,
  isStudent,
  SearchFYP
);
router.get(
  "/appliedfyps/:pageNumber/:userid",
  isLoggedIn,
  isStudent,
  AllAppliedFYP
);

const StudentFYPRouter = router;
export default StudentFYPRouter;
