import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service";

const ViewCompany = async page => {
  const user = await getCurrentUser();
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

const FollowCompany = async companyid => {
  const user = await getCurrentUser();
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

const UnFollowCompany = async companyid => {
  const user = await getCurrentUser();
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

const AddToContact = async companyid => {
  const user = await getCurrentUser();
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

const RemoveContact = async companyid => {
  const user = await getCurrentUser();
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
const SearchCompany = async (page, name, city, field) => {
  const user = await getCurrentUser();
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
