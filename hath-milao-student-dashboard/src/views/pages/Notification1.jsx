import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, Container, Row } from "reactstrap";
import { Route, Link } from "react-router-dom";
// core components
import Header from "components/Headers/Header.jsx";
import Job from "./Job";

export default class Notification extends Component {
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
                  <h2 className=" mb-0">All Notifications</h2>
                </CardHeader>
                <Link to={`/admin/notification/jobs/1`}>First Job</Link>
                <Route
                  path={`/admin/notification/jobs/:jobid`}
                  exact
                  component={Job}
                />
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
