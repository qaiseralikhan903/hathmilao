const express = require("express");
const router = express.Router();

//Controller Of Reporting
import {
  BoxStatistics,
  BarStatistics,
  BarFieldStatistics
} from "../../controllers/students/reporting/index.controller";

import { isStudent, isLoggedIn } from "../../middleware/auth";

//All Routes Related Statistics Basic
router.get("/box/:userid", isLoggedIn, isStudent, BoxStatistics);
router.get("/bar", isLoggedIn, isStudent,BarStatistics);
router.get("/fieldbar", isLoggedIn, isStudent,BarFieldStatistics);

const StudentStatisticsRouter = router;
export default StudentStatisticsRouter;
