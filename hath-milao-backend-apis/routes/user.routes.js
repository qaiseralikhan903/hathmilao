const express = require("express");
const router = express.Router();
import { isLoggedIn } from "../middleware/auth";

import {
  Login,
  Profile,
  Register,
  ForgotPassword,
  GetResetPassword,
  PostResetPassword
} from "../controllers/user/user.controller";

router.post("/login", Login);
router.post("/register", Register);
router.post("/forgot-password", ForgotPassword);
router.get("/reset-password/:token", GetResetPassword);
router.post("/reset-password/:token", PostResetPassword);

router.get("/profile", isLoggedIn, Profile);

const UserRouter = router;

export default UserRouter;

// student/profile/basic
