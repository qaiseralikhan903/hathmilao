import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const ViewCompany = page => {
  const user = getCurrentUser();
  const token = user.access_token;
  const universityid = user.user.id;
  return Axios.get(
    `${config.SERVER_URI}/university/company/all/${page}/${universityid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

// Search Company Start
const SearchCompany = (page, name, city, field) => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/university/company/search/${page}/${name}/${city}/${field}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// Search Company End

export { ViewCompany, SearchCompany };
