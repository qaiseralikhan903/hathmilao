import Index from "views/Index.jsx";
// import Index1 from "views/Index1.jsx";

import Profile from "views/pages/Profile.jsx";
import Register from "views/pages/Register.jsx";
import Login from "views/pages/Login.jsx";
import Job from "views/pages/Job.jsx";
import ForgotPassword from "views/pages/ForgotPassword.jsx";
import Event from "views/pages/Event.jsx";
import Chat from "views/pages/Chat.jsx";
import Company from "views/pages/Company.jsx";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/jobless",
    name: "Track Jobless",
    icon: "fa fa-graduation-cap text-blue",
    component: Job,
    layout: "/admin"
  },
  {
    path: "/companies",
    name: "Companies",
    icon: "fa fa-building text-orange",
    component: Company,
    layout: "/admin"
  },
  {
    path: "/events",
    name: "Events",
    icon: "fa fa-calendar text-gray",
    component: Event,
    layout: "/admin"
  },
  {
    path: "/chat",
    name: "Chat",
    icon: "fas fa-comment text-orange",
    component: Chat,
    layout: "/admin"
  },

  {
    path: "/login",
    name: "",
    icon: "",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/forgotpassword",
    name: "",
    icon: "",
    component: ForgotPassword,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "",
    icon: "",
    component: Register,
    layout: "/auth"
  }
];
export default routes;
