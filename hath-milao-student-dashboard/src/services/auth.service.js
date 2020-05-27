import Axios from "axios";

import config from "../util/config.json";
import { UpatdeFCMAPI } from "./notification.service";
import { messaging } from "../init-fcm.js";

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const Login = (username, password) => {
  return Axios.post(`${config.SERVER_URI}/user/login`, {
    username,
    password,
    role: "student"
  });
};

const Register = data => {
  return Axios.post(`${config.SERVER_URI}/user/register`, data);
};

const Logout = () => {
  if (GetFCM() !== null) {
    const token = GetFCM();
    localStorage.removeItem("fcm");
    messaging.deleteToken(token);
    UpatdeFCMAPI(token);
  }

  return localStorage.removeItem("user");
};

const SaveUser = data => {
  const user = JSON.stringify(data);
  return localStorage.setItem("user", user);
};

export const SaveFCM = fcm => {
  return localStorage.setItem("fcm", fcm);
};

export const GetFCM = () => {
  return localStorage.getItem("fcm");
};

const ForgotPassword = email => {
  return Axios.post(`${config.SERVER_URI}/user/forgot-password`, {
    email,
    role: "student"
  });
};

export { getCurrentUser, Login, SaveUser, Logout, Register, ForgotPassword };
