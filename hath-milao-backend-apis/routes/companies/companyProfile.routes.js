const express = require("express");
const router = express.Router();

//Controller Of Profile
import {
  AddProfile,
  UpdateProfile,
  ViewProfile
} from "../../controllers/companies/profile/index.controller";
import { isCompany, isLoggedIn } from "../../middleware/auth";

//All Routes Related Profile Basic
router.post("/basic", AddProfile);
router.get("/:userid", isLoggedIn, isCompany, ViewProfile);
router.put("/basic/:userid", isLoggedIn, isCompany, UpdateProfile);

const CompanyProfileRouter = router;
export default CompanyProfileRouter;
