import Axios from "axios";
import { AsyncStorage } from "react-native";
import config from "../util/config.json";
import { UpatdeExpoTokenAPI } from "./notification.service.js";

const getCurrentUser = async () => {
  // const user = localStorage.getItem("user");
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const Login = (username, password) => {
  return Axios.post(
    `${config.SERVER_URI}/user/login`,
    {
      username,
      password,
      role: "student"
    },
    { timeout: 4000 }
  );
};

const Register = data => {
  return Axios.post(`${config.SERVER_URI}/user/register`, data, {
    timeout: 4000
  });
};

const Logout = async () => {
  const token = await AsyncStorage.getItem("token");

  console.log(token);
  UpatdeExpoTokenAPI(token);
  const ret = await AsyncStorage.setItem("user", "");
};

const SaveUser = async (data, token) => {
  const user = JSON.stringify(data);
  await AsyncStorage.setItem("user", user);
  await AsyncStorage.setItem("token", token);
};

const ForgotPassword = email => {
  return Axios.post(
    `${config.SERVER_URI}/user/forgot-password`,
    {
      email,
      role: "student"
    },
    { timeout: 4000 }
  );
};
export { getCurrentUser, Login, SaveUser, Logout, Register, ForgotPassword };
