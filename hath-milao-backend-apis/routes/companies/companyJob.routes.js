const express = require("express");
const router = express.Router();

//Controller Of Profile
import {
  AddJob,
  UpdateJob,
  ViewJob,
  ViewAllJob,
  SearchJob,
  DeleteJob,
  JobApplicants,
  SearchJobApplicants
} from "../../controllers/companies/job/index.controller";

import { isCompany, isLoggedIn } from "../../middleware/auth";

//All Routes Related Profile Basic
router.post("/", isLoggedIn, isCompany, AddJob);

router.get("/all/:userid/:pageNumber", isLoggedIn, isCompany, ViewAllJob);

router.get(
  "/search/:userid/:pageNumber/:title/:date/:type",
  isLoggedIn,
  isCompany,
  SearchJob
);

router.get(
  "/jobapplicant/:pageNumber/:jobid",
  isLoggedIn,
  isCompany,
  JobApplicants
);

router.get(
  "/jobapplicant/:pageNumber/:jobid/:headline/:city/:country/:skill",
  isLoggedIn,
  isCompany,
  SearchJobApplicants
);

router.get("/:jobid", isLoggedIn, isCompany, ViewJob);

router.put("/:jobid", isLoggedIn, isCompany, UpdateJob);

router.delete("/:jobid", isLoggedIn, isCompany, DeleteJob);

const CompanyJobRouter = router;
export default CompanyJobRouter;
