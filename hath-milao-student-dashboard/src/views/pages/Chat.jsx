import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, Container, Row, CardBody } from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import MyChat from "components/Chat/Chat.jsx";

export default class Chat extends Component {
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
                  <h2 className=" mb-0">Chat Application</h2>
                </CardHeader>
                <CardBody className="pd-0">
                  <MyChat></MyChat>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
