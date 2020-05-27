const express = require("express");
const router = express.Router();

//Controller Of Profile
import {
  AddProfile,
  UpdateProfile,
  ViewProfile
} from "../../controllers/universities/profile/index.controller";

// Middleware
import { isUniversity, isLoggedIn } from "../../middleware/auth";

//All Routes Related Profile Basic
router.post("/", AddProfile);
router.get("/:userid", isLoggedIn, isUniversity, ViewProfile);
router.put("/:userid", isLoggedIn, isUniversity, UpdateProfile);

const UniversityProfileRouter = router;
export default UniversityProfileRouter;
