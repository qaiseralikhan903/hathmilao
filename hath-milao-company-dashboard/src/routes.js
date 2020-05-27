import Index from "views/Index.jsx";
// import Index1 from "views/Index1.jsx";

import Profile from "views/pages/Profile.jsx";
import Register from "views/pages/Register.jsx";
import Login from "views/pages/Login.jsx";
import Job from "views/pages/Job.jsx";
import FinalYearProject from "views/pages/FYP.jsx";
import ForgotPassword from "views/pages/ForgotPassword.jsx";
import Event from "views/pages/Event.jsx";
import Student from "views/pages/Student.jsx";
import Challenge from "views/pages/Challenge.jsx";
import Chat from "views/pages/Chat.jsx";
import University from "views/pages/University.jsx";

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
    path: "/students",
    name: "Students",
    icon: "fa fa-graduation-cap text-green",
    component: Student,
    layout: "/admin"
  },
  {
    path: "/universities",
    name: "Universities",
    icon: "fa fa-building text-purple",
    component: University,
    layout: "/admin"
  },
  {
    path: "/job",
    name: "Jobs",
    icon: "fa fa-briefcase text-blue",
    component: Job,
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
    path: "/finalyearprojects",
    name: "Final Year Project",
    icon: "fas fa-book-open text-red",
    component: FinalYearProject,
    layout: "/admin"
  },
  {
    path: "/challenges",
    name: "Challenges",
    icon: "fas fa-trophy text-orange",
    component: Challenge,
    layout: "/admin"
  },
  {
    path: "/chat",
    name: "Chat",
    icon: "fas fa-comment text-blue",
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
