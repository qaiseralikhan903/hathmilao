const express = require("express");
const router = express.Router();

//Controller Of Profile
import {
  AddEvent,
  DeleteEvent,
  EventApplicants,
  UpdateEvent,
  ViewAllEvent,
  SearchEvent
} from "../../controllers/universities/event/index.controller";

import { isUniversity, isLoggedIn } from "../../middleware/auth";

//All Routes Related Profile Basic
router.post("/", isLoggedIn, isUniversity, AddEvent);
router.get("/all/:userid/:pageNumber", isLoggedIn, isUniversity, ViewAllEvent);
router.get(
  "/search/:userid/:pageNumber/:title/:date/:type",
  isLoggedIn,
  isUniversity,
  SearchEvent
);
router.get(
  "/eventapplicant/:pageNumber/:eventid",
  isLoggedIn,
  isUniversity,
  EventApplicants
);
// router.get("/:jobid", isLoggedIn, isUniversity, ViewJob);
router.put("/:eventid", isLoggedIn, isUniversity, UpdateEvent);
router.delete("/:eventid", isLoggedIn, isUniversity, DeleteEvent);

const UniversityEventRouter = router;
export default UniversityEventRouter;
