const express = require("express");
const router = express.Router();

import { isCompany, isLoggedIn } from "../../middleware/auth";

//Controller Of University

import {
  ViewAllUniversity,
  SearchUniversity
} from "../../controllers/companies/university/index.controller";

//All Routes Related to University
router.get(
  "/all/:pageNumber/:companyid",
  isLoggedIn,
  isCompany,
  ViewAllUniversity
);

router.get(
  "/search/:pageNumber/:name/:city/:field/:companyid",
  isLoggedIn,
  isCompany,
  SearchUniversity
);

const CompanyUniversityRouter = router;
export default CompanyUniversityRouter;
