import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const ViewAllFYP = page => {
  const user = getCurrentUser();
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
const ApplyFYP = fypid => {
  const user = getCurrentUser();
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
const AllAppliedFYP = page => {
  const user = getCurrentUser();
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
const CancelAppliedFYP = fypid => {
  const user = getCurrentUser();
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

// Search Final Year Project Start
const SearchFYP = (page, field, city, company, requireddegree) => {
  const user = getCurrentUser();
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
// Search Final Year Project End
export { ViewAllFYP, ApplyFYP, AllAppliedFYP, CancelAppliedFYP, SearchFYP };
