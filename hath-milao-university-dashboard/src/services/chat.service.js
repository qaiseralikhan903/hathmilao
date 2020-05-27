import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const AddToContactCompany = companyid => {
  const user = getCurrentUser();
  const token = user.access_token;

  let universityid = user.user.id;

  let data = {};

  return Axios.put(
    `${config.SERVER_URI}/university/chat/company/addToContact/${universityid}/${companyid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const AddToContactStudent = studentid => {
  const user = getCurrentUser();
  const token = user.access_token;

  let universityid = user.user.id;

  let data = {};

  return Axios.put(
    `${config.SERVER_URI}/university/chat/student/addToContact/${universityid}/${studentid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export { AddToContactCompany, AddToContactStudent };
