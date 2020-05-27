import Axios from "axios";

import config from "../util/config.json";

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const Login = (username, password) => {
  return Axios.post(`${config.SERVER_URI}/user/login`, {
    username,
    password,
    role: "university"
  });
};

const Register = data => {
  return Axios.post(`${config.SERVER_URI}/user/register`, data);
};

const Logout = () => {
  return localStorage.removeItem("user");
};

const SaveUser = data => {
  const user = JSON.stringify(data);
  return localStorage.setItem("user", user);
};

const ForgotPassword = email => {
  return Axios.post(`${config.SERVER_URI}/user/forgot-password`, {
    email,
    role: "university"
  });
};

export { getCurrentUser, Login, SaveUser, Logout, Register, ForgotPassword };
