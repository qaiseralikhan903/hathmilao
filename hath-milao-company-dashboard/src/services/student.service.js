import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const ViewStudents = page => {
  const user = getCurrentUser();
  const token = user.access_token;

  let companyid = user.user.id;

  return Axios.get(
    `${config.SERVER_URI}/company/student/all/${page}/${companyid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const SearchStudent = (page, headline, city, country, skill) => {
  const user = getCurrentUser();
  const token = user.access_token;
  let companyid = user.user.id;

  return Axios.get(
    `${config.SERVER_URI}/company/student/search/${page}/${headline}/${city}/${country}/${skill}/${companyid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const RecommendedStudents = page => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/company/student/recommended/${user.user.id}/${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export { ViewStudents, SearchStudent, RecommendedStudents };
