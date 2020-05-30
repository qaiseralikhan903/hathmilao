import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service";

const ViewAllFYP = async page => {
  const user = await getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/student/fyp/all/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

// Apply FYP Service start
const ApplyFYP = async fypid => {
  const user = await getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    fypid: fypid
  };
  return Axios.post(`${config.SERVER_URI}/student/fyp/apply`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};
// Apply FYP Service End

// All Applied FYP Service start
const AllAppliedFYP = async page => {
  const user = await getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/student/fyp/appliedfyps/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// All Applied FYP Service End

// Cancel Applied FYP Service start
const CancelAppliedFYP = async fypid => {
  const user = await getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    fypid: fypid
  };
  return Axios.post(`${config.SERVER_URI}/student/fyp/cancelappliedfyp`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};
// Cancel Applied Job Service End
const SearchFYP = async (page, field, city, company, requireddegree) => {
  const user = await getCurrentUser();
  const token = user.access_token;
  ///student/fyp/search/:pageNumber/:field/:city/:company/:requireddegree/:userid
  return Axios.get(
    `${config.SERVER_URI}/student/fyp/search/${page}/${field}/${city}/${company}/${requireddegree}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export { ViewAllFYP, ApplyFYP, AllAppliedFYP, CancelAppliedFYP, SearchFYP };
