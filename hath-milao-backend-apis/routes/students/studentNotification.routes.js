const express = require("express");
const router = express.Router();

import { isStudent, isLoggedIn } from "../../middleware/auth";

//Controller Of Notification
import {
  AddFCM,
  allNotificationJob,
  AddExpoTokken,
  UpdateExpoTokken,
  UpdateFCM
} from "../../controllers/students/notification/index.controller";

//All Routes Related FCM Basic
router.post("/fcm", AddFCM);
router.put("/fcm/:userid", UpdateFCM);
router.post("/expotokken", AddExpoTokken);
router.put("/expotokken/:userid", UpdateExpoTokken);
router.get(
  "/jobs/:pageNumber/:userid",
  isLoggedIn,
  isStudent,
  allNotificationJob
);
const StudentNotificationRouter = router;
export default StudentNotificationRouter;
