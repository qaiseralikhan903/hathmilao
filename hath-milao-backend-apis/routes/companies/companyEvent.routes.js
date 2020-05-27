const express = require("express");
const router = express.Router();

//Controller Of Profile
import {
  AddEvent,
  DeleteEvent,
  EventApplicants,
  UpdateEvent,
  ViewAllEvent,
  AllJobFairs,
  SearchEvent
} from "../../controllers/companies/event/index.controller";

import { isCompany, isLoggedIn } from "../../middleware/auth";

//All Routes Related Profile Basic
router.post("/", isLoggedIn, isCompany, AddEvent);
router.get("/all/:userid/:pageNumber", isLoggedIn, isCompany, ViewAllEvent);
router.get(
  "/search/:userid/:pageNumber/:title/:date/:type",
  isLoggedIn,
  isCompany,
  SearchEvent
);
router.get(
  "/eventapplicant/:pageNumber/:eventid",
  isLoggedIn,
  isCompany,
  EventApplicants
);
// router.get("/:jobid", isLoggedIn, isCompany, ViewJob);
router.put("/:eventid", isLoggedIn, isCompany, UpdateEvent);
router.delete("/:eventid", isLoggedIn, isCompany, DeleteEvent);
router.get("/jobfairs/:pageNumber", isLoggedIn, isCompany, AllJobFairs);

const CompanyEventRouter = router;
export default CompanyEventRouter;
