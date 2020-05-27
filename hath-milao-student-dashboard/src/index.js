import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/hath-milao-dashboard-react.scss";
import "./index.css";
import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";
import NotFound from "./views/pages/NotFound";
import { messaging } from "./init-fcm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(window.location.origin + "/firebase-messaging-sw.js")
    .then(function(registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function(err) {
      console.log("Service worker registration failed, error:", err);
    });
}

class App extends React.Component {
  async componentDidMount() {
    messaging.onMessage(
      (payload, err) => {
        const notification = payload.notification;
        toast(
          <div>
            <h3>{notification.title}</h3>
            <p>{notification.body} has been added new Job</p>
          </div>
        );
      },
      err => {},
      completed => {}
    );
  }
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Redirect from="/" exact to="/admin/index" />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
        <ToastContainer closeOnClick={false} position={"bottom-left"} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
