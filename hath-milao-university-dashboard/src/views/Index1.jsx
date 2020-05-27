import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, Container, Row } from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

export default class Index1 extends Component {
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
