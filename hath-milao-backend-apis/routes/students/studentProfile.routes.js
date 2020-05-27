const express = require("express");
const router = express.Router();

import { isStudent, isLoggedIn } from "../../middleware/auth";

//Controller Of Profile
import {
  AddBasic,
  ViewBasic,
  UpdateBasic,
  MobileUpdateBasic
} from "../../controllers/students/profile/basic/index.controller";

//Controller Of Education
import {
  AddEducation,
  UpdateEducation,
  DeleteEducation
} from "../../controllers/students/profile/education/index.controller";

//Controller Of Experience
import {
  AddExperience,
  UpdateExperience,
  DeleteExperience
} from "../../controllers/students/profile/experience/index.controller";

//Controller Of Experience
import { UpdateOther } from "../../controllers/students/profile/other/index.controller";

//All Routes Related Profile Basic
router.post("/basic", AddBasic);
router.get("/:userid", isLoggedIn, isStudent, ViewBasic);
router.put("/basic/:userid", UpdateBasic);
router.put("/basic/mobile/:userid", MobileUpdateBasic);

//All Routes Related Profile Education
router.post("/education", isLoggedIn, isStudent, AddEducation);
router.put("/education/:educationid", isLoggedIn, isStudent, UpdateEducation);
router.delete(
  "/education/:userid/:educationid",
  isLoggedIn,
  isStudent,
  DeleteEducation
);

//All Routes Related Profile Experience
router.post("/experience", isLoggedIn, isStudent, AddExperience);
router.put(
  "/experience/:experienceid",
  isLoggedIn,
  isStudent,
  UpdateExperience
);
router.delete(
  "/experience/:userid/:experienceid",
  isLoggedIn,
  isStudent,
  DeleteExperience
);

//All Routes Related Profile Other(Skill, Language, CV-URL, Loonking For Job)
router.put("/other/:userid", isLoggedIn, isStudent, UpdateOther);

const StudentProfileRouter = router;
export default StudentProfileRouter;
