import React from "react";

import { Card, CardHeader, Container, Row, Button } from "reactstrap";

import Header from "components/Headers/Header.jsx";
import ViewAllChallenges from "components/Challenges/ViewAllChallenges";
import AttemptChallenge from "components/Challenges/AttemptChallenge";

export default class Challenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = { viewOption: "All" };
  }

  handleViewClick = () => {
    this.setState({ viewOption: "All" });
  };

  handleAttemptClick = () => {
    this.setState({ viewOption: "Attempt" });
  };

  render() {
    const viewOption = this.state.viewOption;
    let view;
    if (viewOption === "Attempt") {
      view = <AttemptChallenge />;
    } else if (viewOption === "All") {
      view = <ViewAllChallenges />;
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
                      color="success"
                      size="sm"
                      type="button"
                      className="float-right mr-1"
                      onClick={this.handleAttemptClick}
                    >
                      Attempted
                    </Button>
                    <Button
                      color="info"
                      size="sm"
                      type="button"
                      onClick={this.handleViewClick}
                      className="float-right mr-1 "
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
