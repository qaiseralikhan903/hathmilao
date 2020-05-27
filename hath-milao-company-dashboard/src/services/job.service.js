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
    `${config.SERVER_URI}/company/job/all/${user.user.id}/${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const SearchJob = (page, title, date, jobType) => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/company/job/search/${user.user.id}/${page}/${title}/${date}/${jobType}`,
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

const JobApplicant = (page, jobid) => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/company/job/jobapplicant/${page}/${jobid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const SearchJobApplicant = (page, jobid, headline, city, country, skill) => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/company/job/jobapplicant/${page}/${jobid}/${headline}/${city}/${country}/${skill}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export {
  UpdateJob,
  AddJob,
  ViewAllJob,
  SearchJob,
  DeleteJob,
  JobApplicant,
  SearchJobApplicant
};
