import React, { Component } from "react";

// reactstrap components
import { Card, CardHeader, Container, Row, Button } from "reactstrap";

// core components
import Header from "components/Headers/Header.jsx";
import ViewAllStudent from "components/Student/ViewAllStudent.jsx";
import RecommendedStudent from "components/Student/RecommendedSudents.jsx";

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = { viewAll: true };
  }

  handleViewClick = () => {
    this.setState({ viewAll: !this.state.viewAll });
  };

  render() {
    const { viewAll } = this.state;
    let view;
    if (viewAll) {
      view = <ViewAllStudent {...this.props} />;
    } else {
      view = <RecommendedStudent {...this.props} />;
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
                  <h2 className="mb-0">
                    {this.state.viewAll ? (
                      <React.Fragment>
                        <span>All Students</span>
                        <Button
                          color="success"
                          size="sm"
                          type="button"
                          onClick={this.handleViewClick}
                          className="float-right mr-1"
                        >
                          Recommended Students
                        </Button>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <span>Recommended Students</span>
                        <Button
                          color="info"
                          size="sm"
                          type="button"
                          onClick={this.handleViewClick}
                          className="float-right mr-1"
                        >
                          All Students
                        </Button>
                      </React.Fragment>
                    )}
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
