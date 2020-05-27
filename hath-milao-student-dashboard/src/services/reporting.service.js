import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const BoxStatistics = () => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/student/statistics/box/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

const BarStatistics = () => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(`${config.SERVER_URI}/student/statistics/bar`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  });
};

const FieldBarStatistics = () => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(`${config.SERVER_URI}/student/statistics/fieldbar`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  });
};

export { BoxStatistics, BarStatistics, FieldBarStatistics };
