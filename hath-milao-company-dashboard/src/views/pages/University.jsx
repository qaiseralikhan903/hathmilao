import React, { Component } from "react";

// reactstrap components
import { Card, CardHeader, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.jsx";

import ViewAllUniversity from "components/University/ViewAllUniversity.jsx";

export default class University extends Component {
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
                  <h2 className="mb-0">All Universities</h2>
                </CardHeader>
                <ViewAllUniversity {...this.props}></ViewAllUniversity>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
