const express = require("express");
const router = express.Router();

//Controller Of Reporting
import {
  BoxStatistics,
  LineStatistics
} from "../../controllers/universities/reporting/index.controller.js";

import { isUniversity, isLoggedIn } from "../../middleware/auth";

//All Routes Related Statistics Basic
router.get("/box/:userid/:univeristy", isLoggedIn, isUniversity, BoxStatistics);
router.get("/line/:userid", isLoggedIn, isUniversity, LineStatistics);

const UniversityStatisticsRouter = router;
export default UniversityStatisticsRouter;
