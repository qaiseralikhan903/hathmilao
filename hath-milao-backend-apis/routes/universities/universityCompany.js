const express = require("express");
const router = express.Router();

import { isUniversity, isLoggedIn } from "../../middleware/auth";

//Controller Of Company
import {
  ViewAllCompanies,
  SearchCompany
} from "../../controllers/universities/company/index.controller";

//All Routes Related to Company
router.get(
  "/all/:pageNumber/:universityid",
  isLoggedIn,
  isUniversity,
  ViewAllCompanies
);

router.get(
  "/search/:pageNumber/:name/:city/:field/:universityid",
  isLoggedIn,
  isUniversity,
  SearchCompany
);

const UniversityCompanyRouter = router;
export default UniversityCompanyRouter;
