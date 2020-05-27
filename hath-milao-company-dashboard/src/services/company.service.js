import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const UpdateCompany = data => {
  const user = getCurrentUser();
  const token = user.access_token;
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("data", JSON.stringify(data.profileData));

  return Axios.put(
    `${config.SERVER_URI}/company/profile/basic/${user.user.id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

const ViewCompany = () => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(`${config.SERVER_URI}/company/profile/${user.user.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  });
};

export { UpdateCompany, ViewCompany };
