import React from "react";
// reactstrap components
import { Card, CardHeader, Container, Row, Button } from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import ViewAllJobs from "components/Jobs/ViewAllJobs.jsx";
import ApplyJobs from "components/Jobs/ApplyJobs.jsx";
import SaveJob from "components/Jobs/SaveJob.jsx";
import RecommendedJob from "components/Jobs/RecommendedJob.jsx";

class Job extends React.Component {
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

  handleSaveClick = () => {
    this.setState({ viewOption: "Saved" });
  };

  handleRecommendedClick = () => {
    this.setState({ viewOption: "Recommended" });
  };

  render() {
    const viewOption = this.state.viewOption;
    let view;
    if (viewOption === "Saved") {
      view = <SaveJob />;
    } else if (viewOption === "Applied") {
      view = <ApplyJobs />;
    } else if (viewOption === "All") {
      view = <ViewAllJobs />;
    } else if (viewOption === "Recommended") {
      view = <RecommendedJob />;
    }
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
                  <h2 className=" mb-0">
                    {this.state.viewOption}
                    &nbsp;Jobs{" "}
                    <Button
                      color="success"
                      size="sm"
                      type="button"
                      onClick={this.handleRecommendedClick}
                      className="float-right "
                    >
                      Recommended
                    </Button>
                    <Button
                      color="primary"
                      size="sm"
                      type="button"
                      onClick={this.handleSaveClick}
                      className="float-right "
                    >
                      Saved
                    </Button>
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
                      className="float-right "
                    >
                      All Jobs
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

export default Job;
