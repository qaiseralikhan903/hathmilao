/* eslint-disable no-use-before-define */
import Axios from "axios";
import config from "../../util/config.json";
import { getCurrentUser } from "../auth.service";

const UpdateBasic = async data => {
  const user = await getCurrentUser();

  const token = user.access_token;
  const formData = new FormData();
  if (data.image) {
    formData.append("image", data.image);
  }

  formData.append("data", JSON.stringify(data));

  return Axios.put(
    `${config.SERVER_URI}/student/profile/basic/mobile/${user.user.id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    },
    { timeout: 5000 }
  );
};

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

const ViewProfile = async () => {
  const user = await getCurrentUser();

  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/student/profile/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/form-data"
      }
    },
    { timeout: 5000 }
  );
};

export { UpdateBasic, ViewProfile };
