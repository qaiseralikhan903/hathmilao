import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const AddToContactStudent = studentid => {
  const user = getCurrentUser();
  const token = user.access_token;

  let companyid = user.user.id;

  let data = {};

  return Axios.put(
    `${config.SERVER_URI}/company/chat/student/addToContact/${companyid}/${studentid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const AddToContactUniversity = universityid => {
  const user = getCurrentUser();
  const token = user.access_token;

  let companyid = user.user.id;

  let data = {};

  return Axios.put(
    `${config.SERVER_URI}/company/chat/university/addToContact/${companyid}/${universityid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export { AddToContactStudent, AddToContactUniversity };
