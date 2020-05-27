import React from "react";
// reactstrap components
import { Card, CardHeader, Container, Row, Button } from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import ViewAllJobs from "components/Jobs/ViewAllJobs.jsx";
import AddJob from "components/Jobs/AddJob.jsx";
// import JobDetails from "components/Jobs/JobDetails.jsx";

class Job extends React.Component {
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
      view = <AddJob />;
    } else if (viewOption === "All") {
      view = <ViewAllJobs />;
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
                    &nbsp;Jobs
                    <Button
                      color="primary"
                      size="sm"
                      type="button"
                      onClick={this.handleAddClick}
                      className="float-right "
                    >
                      Add Job
                    </Button>
                    <Button
                      color="info"
                      size="sm"
                      type="button"
                      onClick={this.handleViewClick}
                      className="float-right mr-1"
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
