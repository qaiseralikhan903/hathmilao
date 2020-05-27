import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const AddChallenge = data => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.post(`${config.SERVER_URI}/company/challenge`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

const UpdateChallenge = data => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.put(
    `${config.SERVER_URI}/company/challenge/${data.challengeid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const ViewAllChallenge = page => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/company/challenge/all/${user.user.id}/${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const DeleteChallenge = challengeid => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.delete(`${config.SERVER_URI}/company/challenge/${challengeid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

const ChallengeApplicant = (page, challengeid) => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/company/challenge/challengeapplicant/${page}/${challengeid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const UploadRating = data => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.post(
    `${config.SERVER_URI}/company/challenge/submitrating`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const SearchChallenge = (page, title, date, field) => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/company/challenge/search/${user.user.id}/${page}/${title}/${date}/${field}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export {
  AddChallenge,
  UpdateChallenge,
  ViewAllChallenge,
  DeleteChallenge,
  ChallengeApplicant,
  UploadRating,
  SearchChallenge
};
