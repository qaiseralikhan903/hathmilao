import Axios from "axios";

import config from "../../util/config.json";
import { getCurrentUser } from "../auth.service.js";
const AddExperience = data => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.post(`${config.SERVER_URI}/student/profile/experience`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

const EditExperience = data => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.put(
    `${config.SERVER_URI}/student/profile/experience/${data.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const DeleteExperience = experienceid => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.delete(
    `${config.SERVER_URI}/student/profile/experience/${
      user.user.id
    }/${experienceid} `,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export { AddExperience, EditExperience, DeleteExperience };
