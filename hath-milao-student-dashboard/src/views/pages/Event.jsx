import React from "react";

import { Card, CardHeader, Container, Row, Button } from "reactstrap";

import Header from "components/Headers/Header.jsx";
import ViewAllEvent from "components/Event/ViewAllEvent.jsx";
import RegisterEvent from "components/Event/RegisterEvent.jsx";

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = { viewOption: "All" };
  }

  handleViewClick = () => {
    this.setState({ viewOption: "All" });
  };

  handleRegisterClick = () => {
    this.setState({ viewOption: "Registered" });
  };

  render() {
    const viewOption = this.state.viewOption;
    let view;
    if (viewOption === "Registered") {
      view = <RegisterEvent />;
    } else if (viewOption === "All") {
      view = <ViewAllEvent />;
    }

    return (
      <>
        <Header />
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h2 className=" mb-0">
                    {this.state.viewOption}
                    &nbsp;Events
                    <Button
                      color="success"
                      size="sm"
                      type="button"
                      className="float-right mr-1"
                      onClick={this.handleRegisterClick}
                    >
                      Registered
                    </Button>
                    <Button
                      color="info"
                      size="sm"
                      type="button"
                      onClick={this.handleViewClick}
                      className="float-right mr-1 "
                    >
                      All Events
                    </Button>
                  </h2>
                </CardHeader>
                {view}
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
