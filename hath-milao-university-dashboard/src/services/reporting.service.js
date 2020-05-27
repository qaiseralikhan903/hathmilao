import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const BoxStatistics = () => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/university/statistics/box/${user.user.id}/${user.user.username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

const LineStatistics = () => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/university/statistics/line/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

export { BoxStatistics, LineStatistics };
