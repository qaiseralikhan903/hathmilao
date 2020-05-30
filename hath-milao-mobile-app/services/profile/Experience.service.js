import Axios from "axios";

import config from "../../util/config.json";
import { getCurrentUser } from "../auth.service";
const AddExperience = async data => {
  const user = await getCurrentUser();
  const token = user.access_token;
  return Axios.post(`${config.SERVER_URI}/student/profile/experience`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  },
  { timeout: 5000 });
};

const EditExperience = async data => {
  const user = await getCurrentUser();
  const token = user.access_token;
  return Axios.put(
    `${config.SERVER_URI}/student/profile/experience/${data.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    },
    { timeout: 5000 }
  );
};

const DeleteExperience = async experienceid => {
  const user =await getCurrentUser();
  const token = user.access_token;
  return Axios.delete(
    `${config.SERVER_URI}/student/profile/experience/${user.user.id}/${experienceid} `,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    },
    { timeout: 5000 }
  );
};

export { AddExperience, EditExperience, DeleteExperience };
