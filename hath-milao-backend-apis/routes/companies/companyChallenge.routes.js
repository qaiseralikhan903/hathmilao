const express = require("express");
const router = express.Router();

//Controller Of Company Challenge
import {
  AddChallenge,
  ChallengeApplicants,
  DeleteChallenge,
  UpdateChallenge,
  ViewAllChallenge,
  UploadRating,
  SearchChallenge
} from "../../controllers/companies/challenge/index.controller";

import { isCompany, isLoggedIn } from "../../middleware/auth";

router.post("/", isLoggedIn, isCompany, AddChallenge);
router.post("/submitrating", isLoggedIn, isCompany, UploadRating);

router.get("/all/:userid/:pageNumber", isLoggedIn, isCompany, ViewAllChallenge);
router.get(
  "/search/:userid/:pageNumber/:title/:date/:field",
  isLoggedIn,
  isCompany,
  SearchChallenge
);
router.get(
  "/challengeapplicant/:pageNumber/:challengeid",
  isLoggedIn,
  isCompany,
  ChallengeApplicants
);
router.put("/:challengeid", isLoggedIn, isCompany, UpdateChallenge);
router.delete("/:challengeid", isLoggedIn, isCompany, DeleteChallenge);

const CompanyChallengeRouter = router;
export default CompanyChallengeRouter;
