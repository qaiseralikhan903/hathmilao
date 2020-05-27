import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const AddToContactUniversity = universityid => {
  const user = getCurrentUser();
  const token = user.access_token;

  let studentid = user.user.id;

  let data = {};

  return Axios.put(
    `${config.SERVER_URI}/student/university/addToContact/${universityid}/${studentid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
export { AddToContactUniversity };
