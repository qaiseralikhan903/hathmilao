import Axios from "axios";

import config from "../../util/config.json";
import { getCurrentUser } from "../auth.service.js";

const AddEducation = data => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.post(`${config.SERVER_URI}/student/profile/education`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

const EditEducation = data => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.put(
    `${config.SERVER_URI}/student/profile/education/${data.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const DeleteEducation = educationid => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.delete(
    `${config.SERVER_URI}/student/profile/education/${
      user.user.id
    }/${educationid} `,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export { AddEducation, EditEducation, DeleteEducation };
