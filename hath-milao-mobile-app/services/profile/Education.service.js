import Axios from "axios";

import config from "../../util/config.json";
import { getCurrentUser } from "../auth.service";

const AddEducation = async data => {
  const user = await getCurrentUser();
  const token = user.access_token;
  return Axios.post(
    `${config.SERVER_URI}/student/profile/education`,
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

const EditEducation = async data => {
  const user = await getCurrentUser();
  const token = user.access_token;
  return Axios.put(
    `${config.SERVER_URI}/student/profile/education/${data.id}`,
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

const DeleteEducation = async educationid => {
  const user = await getCurrentUser();
  const token = user.access_token;
  return Axios.delete(
    `${config.SERVER_URI}/student/profile/education/${user.user.id}/${educationid} `,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    },
    { timeout: 5000 }
  );
};

export { AddEducation, EditEducation, DeleteEducation };
