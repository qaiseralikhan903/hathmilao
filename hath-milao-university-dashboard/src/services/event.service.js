import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service.js";

const AddEvent = data => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.post(`${config.SERVER_URI}/university/event`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

const UpdateEvent = data => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.put(
    `${config.SERVER_URI}/university/event/${data.eventid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const ViewAllEvent = page => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/university/event/all/${user.user.id}/${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const DeleteEvent = eventid => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.delete(`${config.SERVER_URI}/university/event/${eventid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

const EventApplicant = (page, eventid) => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/university/event/eventapplicant/${page}/${eventid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

const SearchEvent = (page, title, date, eventType) => {
  const user = getCurrentUser();
  const token = user.access_token;
  return Axios.get(
    `${config.SERVER_URI}/university/event/search/${user.user.id}/${page}/${title}/${date}/${eventType}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export {
  AddEvent,
  UpdateEvent,
  ViewAllEvent,
  DeleteEvent,
  EventApplicant,
  SearchEvent
};
