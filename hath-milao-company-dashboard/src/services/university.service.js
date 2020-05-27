import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const ViewUniversities = page => {
  const user = getCurrentUser();
  const token = user.access_token;

  let companyid = user.user.id;

  return Axios.get(
    `${config.SERVER_URI}/company/university/all/${page}/${companyid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const SearchUniversities = (page, name, city, field) => {
  const user = getCurrentUser();
  const token = user.access_token;

  let companyid = user.user.id;

  return Axios.get(
    `${config.SERVER_URI}/company/university/search/${page}/${name}/${city}/${field}/${companyid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export { ViewUniversities, SearchUniversities };
