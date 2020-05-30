import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service";

const ViewAllEvent = async page => {
  const user = await getCurrentUser();
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
const RegisterEvent = async eventid => {
  const user = await getCurrentUser();
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
const AllRegisterEvents = async page => {
  const user = await getCurrentUser();
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
const CancelRegisterEvent = async eventid => {
  const user = await getCurrentUser();
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
const SearchEvent = async (page, title, venue, field, eventType) => {
  const user = await getCurrentUser();
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

export {
  ViewAllEvent,
  RegisterEvent,
  AllRegisterEvents,
  CancelRegisterEvent,
  SearchEvent
};
