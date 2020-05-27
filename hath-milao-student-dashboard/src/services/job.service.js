import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const AddJob = data => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.post(`${config.SERVER_URI}/company/job`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

const UpdateJob = data => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.put(`${config.SERVER_URI}/company/job/${data.jobid}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

const ViewAllJob = page => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/student/job/all/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const SearchJob = (page, title, jobType, city, company) => {
  const user = getCurrentUser();
  const token = user.access_token;
  // :pageNumber/:title/:city/:company/:type"
  return Axios.get(
    `${config.SERVER_URI}/student/job/search/${page}/${title}/${city}/${company}/${jobType}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const DeleteJob = jobid => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.delete(`${config.SERVER_URI}/company/job/${jobid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

// Apply Job Service start
const ApplyJob = jobid => {
  const user = getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    jobid: jobid
  };
  return Axios.post(`${config.SERVER_URI}/student/job/apply`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};
// Apply Job Service End

// Apply Job Service start
const SaveJob = jobid => {
  const user = getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    jobid: jobid
  };
  return Axios.post(`${config.SERVER_URI}/student/job/save`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};
// Apply Job Service End

// All Saved Job Service start
const AllSavedJob = page => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/student/job/savedjobs/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// All Saved Job Service End

// All Applied Job Service start
const AllAppliedJob = page => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/student/job/appliedjobs/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// All Applied Job Service End

// Unsave Job Service start
const UnSaveJob = jobid => {
  const user = getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    jobid: jobid
  };
  return Axios.post(`${config.SERVER_URI}/student/job/unsavejob`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};
// Unsave Job Service End

// Cancel Applied Job Service start
const CancelAppliedJob = jobid => {
  const user = getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    jobid: jobid
  };
  return Axios.post(`${config.SERVER_URI}/student/job/cancelappliedjob`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};
// Cancel Applied Job Service End

// Recommmended Jobs Service Start
const RecommendedJobs = page => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/student/job/recommended/${user.user.id}/${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

// Recommended Jobs Service End

export {
  UpdateJob,
  AddJob,
  ViewAllJob,
  SearchJob,
  DeleteJob,
  ApplyJob,
  SaveJob,
  AllSavedJob,
  AllAppliedJob,
  UnSaveJob,
  CancelAppliedJob,
  RecommendedJobs
};
