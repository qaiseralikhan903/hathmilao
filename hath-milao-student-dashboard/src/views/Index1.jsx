import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, Container, Row } from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import { messaging } from "../init-fcm";
import { SaveFCM } from "../services/auth.service";
import { saveFCMAPI } from "../services/notification.service";

export default class Index1 extends Component {
  async componentDidMount() {
    messaging
      .getToken()
      .then(async token => {
        if (!localStorage.getItem("fcm")) {
          SaveFCM(token);
          saveFCMAPI(token);
        }
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", message =>
      console.log(message)
    );
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h2 className=" mb-0">All Statistics</h2>
                </CardHeader>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
