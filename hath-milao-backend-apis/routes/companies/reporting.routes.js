const express = require("express");
const router = express.Router();

//Controller Of Reporting
import {
  BoxStatistics,
  LineStatistics
} from "../../controllers/companies/reporting/index.controller";

import { isCompany, isLoggedIn } from "../../middleware/auth";

//All Routes Related Statistics Basic
router.get("/box/:userid", isLoggedIn, isCompany, BoxStatistics);
router.get("/line/:userid", isLoggedIn, isCompany, LineStatistics);

const CompanyStatisticsRouter = router;
export default CompanyStatisticsRouter;
