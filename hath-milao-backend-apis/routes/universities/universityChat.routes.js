const express = require("express");
const router = express.Router();

import { isUniversity, isLoggedIn } from "../../middleware/auth";

//Controller Of Contact
import {
  AddToContactCompany,
  AddToContactStudent
} from "../../controllers/universities/chat/index.controller.js";

//All Routes Related to Chats
router.put(
  "/student/addToContact/:universityid/:studentid",
  isLoggedIn,
  isUniversity,
  AddToContactStudent
);

router.put(
  "/company/addToContact/:universityid/:companyid",
  isLoggedIn,
  isUniversity,
  AddToContactCompany
);

const UniversityChatRouter = router;
export default UniversityChatRouter;
