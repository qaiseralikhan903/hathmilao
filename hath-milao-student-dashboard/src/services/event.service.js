import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const ViewAllEvent = page => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/student/event/all/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

// Register Event Service start
const RegisterEvent = eventid => {
  const user = getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    eventid: eventid
  };
  return Axios.post(`${config.SERVER_URI}/student/event/register`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};
// Register Event Service End

// All Register Events Service start
const AllRegisterEvents = page => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/student/event/registerevents/${page}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// All Register Events Service End

// Cancel Register Events Service start
const CancelRegisterEvent = eventid => {
  const user = getCurrentUser();
  const token = user.access_token;
  let data = {
    userid: user.user.id,
    eventid: eventid
  };
  return Axios.post(
    `${config.SERVER_URI}/student/event/cancelregistration`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// Cancel Register Events Service End

// Search Event Start
const SearchEvent = (page, title, venue, field, eventType) => {
  const user = getCurrentUser();
  const token = user.access_token;
  //  /search/:pageNumber/:title/:venue/:field/:eventType/:userid"
  return Axios.get(
    `${config.SERVER_URI}/student/event/search/${page}/${title}/${venue}/${field}/${eventType}/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
// Search Event End

export {
  ViewAllEvent,
  RegisterEvent,
  AllRegisterEvents,
  CancelRegisterEvent,
  SearchEvent
};
