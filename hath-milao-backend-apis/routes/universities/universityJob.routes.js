const express = require("express");
const router = express.Router();

//Controller Of Profile
import {
  JoblessStudent,
  SearchStudent
} from "../../controllers/universities/job/index.controller";

// Middleware
import { isUniversity, isLoggedIn } from "../../middleware/auth";

//All Routes Related Job
router.get(
  "/students/:userid/:univeristy/:pageNumber",
  isLoggedIn,
  isUniversity,
  JoblessStudent
);

router.get(
  "/students/search/:userid/:pageNumber/:univeristy/:headline/:degree/:city/:skill",
  isLoggedIn,
  isUniversity,
  SearchStudent
);

const UniversityJobRouter = router;
export default UniversityJobRouter;
