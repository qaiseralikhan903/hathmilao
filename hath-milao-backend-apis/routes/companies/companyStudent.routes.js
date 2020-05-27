const express = require("express");
const router = express.Router();

import { isCompany, isLoggedIn } from "../../middleware/auth";

//Controller Of Jobs

import {
  ViewAllStudents,
  SearchStudent,
  recommendedStudent
} from "../../controllers/companies/student/index.controller";

//All Routes Related to Jobs
router.get(
  "/all/:pageNumber/:companyid",
  isLoggedIn,
  isCompany,
  ViewAllStudents
);
router.get(
  "/recommended/:userid/:pageNumber",
  isLoggedIn,
  isCompany,
  recommendedStudent
);
router.get(
  "/search/:pageNumber/:headline/:city/:country/:skill/:companyid",
  isLoggedIn,
  isCompany,
  SearchStudent
);
const CompanyStudentRouter = router;
export default CompanyStudentRouter;
