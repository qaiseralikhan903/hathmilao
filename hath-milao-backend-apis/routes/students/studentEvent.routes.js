const express = require("express");
const router = express.Router();

import { isStudent, isLoggedIn } from "../../middleware/auth";

//Controller Of Jobs
import {
  AllRegisterEvent,
  CancelRegisterEvent,
  RegisterEvent,
  ViewAllEvent,
  SearchEvent
} from "../../controllers/students/event/index.controller";

//All Routes Related to FYPS
router.get("/all/:pageNumber/:userid", isLoggedIn, isStudent, ViewAllEvent);

router.get(
  "/search/:pageNumber/:title/:venue/:field/:eventType/:userid",
  isLoggedIn,
  isStudent,
  SearchEvent
);
router.post("/register", isLoggedIn, isStudent, RegisterEvent);
router.post("/cancelregistration", isLoggedIn, isStudent, CancelRegisterEvent);

router.get(
  "/registerevents/:pageNumber/:userid",
  isLoggedIn,
  isStudent,
  AllRegisterEvent
);

const StudentEventRouter = router;
export default StudentEventRouter;
