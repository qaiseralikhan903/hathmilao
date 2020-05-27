import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const ViewAllChallenge = page => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/student/challenge/all/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

// Attempt Challenge Service start
const AttemptChallenge = challengeid => {
  const user = getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    challengeid: challengeid
  };
  return Axios.post(`${config.SERVER_URI}/student/challenge/attempt`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};
// Attempt Challenge Service End

// All Attempt Challenge Service start
const AllAttemptChallenge = page => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/student/challenge/attemptchallenges/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// All Attempt Challenge Service End

// Cancel Attempt Challenge Service start
const CancelAttemptChallenge = challengeid => {
  const user = getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    challengeid: challengeid
  };
  return Axios.post(
    `${config.SERVER_URI}/student/challenge/cancelattempt`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// Cancel Attempt Job Service End

// Upload Challenge Service start
const UploadSolution = (description, id) => {
  const user = getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    description: description,
    challengeSubmissionid: id
  };
  return Axios.post(
    `${config.SERVER_URI}/student/challenge/uploadsolution`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// Upload Challenge Service End

// Search Challenge Start
const SearchChallenge = (page, field, city, company, requireddegree) => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/student/challenge/search/${page}/${field}/${city}/${company}/${requireddegree}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// Search Challenge End

export {
  ViewAllChallenge,
  AttemptChallenge,
  CancelAttemptChallenge,
  AllAttemptChallenge,
  UploadSolution,
  SearchChallenge
};
