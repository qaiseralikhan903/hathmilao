const express = require("express");
const router = express.Router();

//Controller Of Profile
import {
  AddFYP,
  ViewAllFYP,
  DeleteFYP,
  UpdateFYP,
  FYPApplicants,
  SearchFYP
} from "../../controllers/companies/fyp/index.controller";

import { isCompany, isLoggedIn } from "../../middleware/auth";

//All Routes Related Profile Basic
router.post("/", isLoggedIn, isCompany, AddFYP);
router.get("/all/:userid/:pageNumber", isLoggedIn, isCompany, ViewAllFYP);
router.get(
  "/search/:userid/:pageNumber/:title/:date/:field",
  isLoggedIn,
  isCompany,
  SearchFYP
);
router.get(
  "/fypapplicant/:pageNumber/:fypid",
  isLoggedIn,
  isCompany,
  FYPApplicants
);
// router.get("/:jobid", isLoggedIn, isCompany, ViewJob);
router.put("/:fypid", isLoggedIn, isCompany, UpdateFYP);
router.delete("/:fypid", isLoggedIn, isCompany, DeleteFYP);

const CompanyFYPRouter = router;
export default CompanyFYPRouter;
