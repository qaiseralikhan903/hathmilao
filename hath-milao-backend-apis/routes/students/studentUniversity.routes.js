const express = require("express");
const router = express.Router();

//Controller Of Student My University
import {
  MyUniversity,
  AddToContact
} from "../../controllers/students/university/index.controller";

import { isStudent, isLoggedIn } from "../../middleware/auth";

//All Routes Related Univeristy
router.get("/profile/:userid", isLoggedIn, isStudent, MyUniversity);
router.put(
  "/addToContact/:universityid/:studentid",
  isLoggedIn,
  isStudent,
  AddToContact
);

const StudentUniversityRouter = router;
export default StudentUniversityRouter;
