import React, { Component } from "react";

import Header from "components/Headers/Header.jsx";

import { Card, CardHeader, Container, Row } from "reactstrap";

export class NotFound extends Component {
  render() {
    return (
      <>
        <Header />
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent text-center">
                  {/* <Button
                    color="primary"
                    size="lg"
                    type="button"
                    className="md-1"
                    href=""
                  >
                    Go Back
                  </Button> */}
                  <img alt="..." src={require("assets/img/theme/404.png")} />
                </CardHeader>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default NotFound;
