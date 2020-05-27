import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const ViewCompany = page => {
  const user = getCurrentUser();
  const token = user.access_token;
  const studentid = user.user.id;
  return Axios.get(
    `${config.SERVER_URI}/student/company/all/${page}/${studentid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const FollowCompany = companyid => {
  const user = getCurrentUser();
  const token = user.access_token;

  let studentid = user.user.id;

  let data = {};

  return Axios.put(
    `${config.SERVER_URI}/student/company/follow/${companyid}/${studentid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const UnFollowCompany = companyid => {
  const user = getCurrentUser();
  const token = user.access_token;

  let studentid = user.user.id;

  let data = {};

  return Axios.put(
    `${config.SERVER_URI}/student/company/unfollow/${companyid}/${studentid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const AddToContact = companyid => {
  const user = getCurrentUser();
  const token = user.access_token;

  let studentid = user.user.id;

  let data = {};

  return Axios.put(
    `${config.SERVER_URI}/student/company/addToContact/${companyid}/${studentid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const RemoveContact = companyid => {
  const user = getCurrentUser();
  const token = user.access_token;

  let studentid = user.user.id;

  let data = {};

  return Axios.put(
    `${config.SERVER_URI}/student/company/removeContact/${companyid}/${studentid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

// Search Company Start
const SearchCompany = (page, name, city, field) => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/student/company/search/${page}/${name}/${city}/${field}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// Search Company End

export {
  ViewCompany,
  FollowCompany,
  UnFollowCompany,
  AddToContact,
  RemoveContact,
  SearchCompany
};
