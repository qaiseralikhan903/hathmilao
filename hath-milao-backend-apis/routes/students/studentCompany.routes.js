const express = require("express");
const router = express.Router();

import { isStudent, isLoggedIn } from "../../middleware/auth";

//Controller Of Jobs

import {
  ViewAllCompanies,
  FollowCompany,
  UnFollowCompany,
  AddToContact,
  RemoveContact,
  SearchCompany
} from "../../controllers/students/company/index.controller";

//All Routes Related to Jobs
router.get(
  "/all/:pageNumber/:studentid",
  isLoggedIn,
  isStudent,
  ViewAllCompanies
);
router.put(
  "/follow/:companyid/:studentid",
  isLoggedIn,
  isStudent,
  FollowCompany
);

router.put(
  "/unfollow/:companyid/:studentid",
  isLoggedIn,
  isStudent,
  UnFollowCompany
);

router.put(
  "/addToContact/:companyid/:studentid",
  isLoggedIn,
  isStudent,
  AddToContact
);

router.put(
  "/removeContact/:companyid/:studentid",
  isLoggedIn,
  isStudent,
  RemoveContact
);

router.get(
  "/search/:pageNumber/:name/:city/:field/:studentid",
  isLoggedIn,
  isStudent,
  SearchCompany
);

const StudentCompanyRouter = router;
export default StudentCompanyRouter;
