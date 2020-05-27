import Axios from "axios";
import { getCurrentUser } from "./auth.service.js";
import config from "../util/config.json";

const saveFCMAPI = token => {
  const user = getCurrentUser();
  const token_api = user.access_token;
  const data = {
    userid: user.user.id,
    fcm: token
  };

  return Axios.post(`${config.SERVER_URI}/student/notification/fcm`, data, {
    headers: {
      Authorization: `Bearer ${token_api}`,
      "Content-Type": "application/json"
    }
  });
};

const UpatdeFCMAPI = token => {
  const user = getCurrentUser();
  const token_api = user.access_token;
  const data = {
    userid: user.user.id,
    fcm: token
  };

  return Axios.put(
    `${config.SERVER_URI}/student/notification/fcm/${user.user.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token_api}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const saveExpoTokkenAPI = token => {
  const user = getCurrentUser();
  const token_api = user.access_token;
  const data = {
    userid: user.user.id,
    fcm: token
  };

  return Axios.post(
    `${config.SERVER_URI}/student/notification/expotokken`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token_api}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const UpatdeExpoTokenAPI = token => {
  const user = getCurrentUser();
  const token_api = user.access_token;
  const data = {
    userid: user.user.id,
    fcm: token
  };

  return Axios.put(
    `${config.SERVER_URI}/student/notification/expotokken/${user.user.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token_api}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const ViewAllJob = page => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/student/notification/jobs/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export {
  saveFCMAPI,
  ViewAllJob,
  UpatdeFCMAPI,
  UpatdeExpoTokenAPI,
  saveExpoTokkenAPI
};
