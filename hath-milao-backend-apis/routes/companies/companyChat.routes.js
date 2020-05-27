const express = require("express");
const router = express.Router();

import { isCompany, isLoggedIn } from "../../middleware/auth";

//Controller Of Contact
import {
  AddToContactStudent,
  AddToContactUniversity
} from "../../controllers/companies/chat/index.controller.js";

//All Routes Related to Chats

router.put(
  "/student/addToContact/:companyid/:studentid",
  isLoggedIn,
  isCompany,
  AddToContactStudent
);

router.put(
  "/university/addToContact/:companyid/:universityid",
  isLoggedIn,
  isCompany,
  AddToContactUniversity
);

const CompanyChatRouter = router;
export default CompanyChatRouter;
