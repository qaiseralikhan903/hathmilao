import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const ViewAllJobless = page => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/university/jobless/students/${user.user.id}/${user.user.username}/${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const SearchJoblessStudent = (page, headline, degree, city, skill) => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/university/jobless/students/search/${user.user.id}/${page}/${user.user.username}/${headline}/${degree}/${city}/${skill}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export { ViewAllJobless, SearchJoblessStudent };
