import React from "react";

import { Card, CardHeader, Container, Row, Button } from "reactstrap";

import Header from "components/Headers/Header.jsx";
import AddChallenge from "components/Challenges/AddChallenge";
import ViewAllChallenge from "components//Challenges/ViewAllChallenge";

export default class Challenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = { viewOption: "All" };
  }

  handleViewClick = () => {
    this.setState({ viewOption: "All" });
  };

  handleAddClick = () => {
    this.setState({ viewOption: "Add" });
  };

  render() {
    const viewOption = this.state.viewOption;
    let view;

    if (viewOption === "Add") {
      view = <AddChallenge />;
    } else if (viewOption === "All") {
      view = <ViewAllChallenge />;
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
                    &nbsp;Challenges
                    <Button
                      color="primary"
                      size="sm"
                      type="button"
                      onClick={this.handleAddClick}
                      className="float-right "
                    >
                      Add Challenge
                    </Button>
                    <Button
                      color="info"
                      size="sm"
                      type="button"
                      onClick={this.handleViewClick}
                      className="float-right mr-1"
                    >
                      All Challenges
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
