import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service";

const AddJob = data => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.post(`${config.SERVER_URI}/company/job`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    timeout: 1000 * 5
  });
};

const UpdateJob = data => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.put(`${config.SERVER_URI}/company/job/${data.jobid}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    timeout: 1000 * 5
  });
};

const ViewAllJob = async page => {
  const user = await getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/student/job/all/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      timeout: 1000 * 5
    }
  );
};

const SearchJob = async (page, title, city, company, jobType) => {
  const user = await getCurrentUser();
  const token = user.access_token;
  // :pageNumber/:title/:city/:company/:type"
  return Axios.get(
    `${config.SERVER_URI}/student/job/search/${page}/${title}/${city}/${company}/${jobType}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      timeout: 1000 * 5
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
    },
    timeout: 1000 * 5
  });
};

// Apply Job Service start
const ApplyJob = async jobid => {
  const user = await getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    jobid: jobid
  };
  return Axios.post(`${config.SERVER_URI}/student/job/apply`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    timeout: 1000 * 5
  });
};
// Apply Job Service End

// Apply Job Service start
const SaveJob = async jobid => {
  const user = await getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    jobid: jobid
  };
  return Axios.post(`${config.SERVER_URI}/student/job/save`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    timeout: 1000 * 5
  });
};
// Apply Job Service End

// All Saved Job Service start
const AllSavedJob = async page => {
  const user = await getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/student/job/savedjobs/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      timeout: 1000 * 5
    }
  );
};
// All Saved Job Service End

// All Applied Job Service start
const AllAppliedJob = async page => {
  const user = await getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/student/job/appliedjobs/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      timeout: 1000 * 5
    }
  );
};
// All Applied Job Service End

// Unsave Job Service start
const UnSaveJob = async jobid => {
  const user = await getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    jobid: jobid
  };
  return Axios.post(`${config.SERVER_URI}/student/job/unsavejob`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    timeout: 1000 * 5
  });
};
// Unsave Job Service End

// Cancel Applied Job Service start
const CancelAppliedJob = async jobid => {
  const user = await getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    jobid: jobid
  };
  return Axios.post(`${config.SERVER_URI}/student/job/cancelappliedjob`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    timeout: 1000 * 5
  });
};
// Cancel Applied Job Service End

// Recommmended Jobs Service Start
const RecommendedJobs = async page => {
  const user = await getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/student/job/recommended/${user.user.id}/${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      timeout: 1000 * 5
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
