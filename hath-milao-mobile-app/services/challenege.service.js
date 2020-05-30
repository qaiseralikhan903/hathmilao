import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const ViewAllChallenge = async page => {
  const user = await getCurrentUser();
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
const AttemptChallenge =async challengeid => {
  const user = await getCurrentUser();
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
const AllAttemptChallenge = async page => {
  const user = await getCurrentUser();
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
const CancelAttemptChallenge = async challengeid => {
  const user = await getCurrentUser();
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
const UploadSolution = async (description, id) => {
  const user = await getCurrentUser();
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
const SearchChallenge = async (page, field, city, company, requireddegree) => {
  const user = await getCurrentUser();
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
