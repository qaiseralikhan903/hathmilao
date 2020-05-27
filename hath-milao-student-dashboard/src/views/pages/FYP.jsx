import React from "react";

import { Card, CardHeader, Container, Row, Button } from "reactstrap";

import Header from "components/Headers/Header.jsx";
import ViewAllFYP from "components/FYP/ViewAllFYP";
import ApplyFYP from "components/FYP/ApplyFYP.jsx";

class FinalYearProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { viewOption: "All" };
  }

  handleViewClick = () => {
    this.setState({ viewOption: "All" });
  };

  handleApplyClick = () => {
    this.setState({ viewOption: "Applied" });
  };

  render() {
    const viewOption = this.state.viewOption;
    let view;
    if (viewOption === "Applied") {
      view = <ApplyFYP />;
    } else if (viewOption === "All") {
      view = <ViewAllFYP />;
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
                    &nbsp;Project
                    <Button
                      color="success"
                      size="sm"
                      type="button"
                      className="float-right mr-1"
                      onClick={this.handleApplyClick}
                    >
                      Applied
                    </Button>
                    <Button
                      color="info"
                      size="sm"
                      type="button"
                      onClick={this.handleViewClick}
                      className="float-right mr-1 "
                    >
                      All FYP
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

export default FinalYearProject;
