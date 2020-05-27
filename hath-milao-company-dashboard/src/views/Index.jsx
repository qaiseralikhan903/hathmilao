import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

import { Col as AntCol, Row as AntRow } from "antd";

import { BoxStatistics } from "../services/reporting.service.js";

import Header from "components/Headers/Header.jsx";
import GradientLine from "./charts/Line.jsx";
import ColumnChart from "./charts/ColumnChart.jsx";
import { Spin } from "antd";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TotalJob: null,
      TotalFYPs: null,
      TotalEvents: null,
      TotalChallenges: null,
      Loading: false
    };
  }

  componentDidMount() {
    BoxStatistics().then(reponse => {
      const {
        TotalJobs,
        TotalEvents,
        TotalChallenges,
        Totalfyps
      } = reponse.data;
      this.setState({
        TotalJob: TotalJobs,
        TotalChallenges: TotalChallenges,
        TotalFYPs: Totalfyps,
        TotalEvents: TotalEvents,
        Loading: true
      });
    });
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        {this.state.Loading ? (
          <Container className="mt--7" fluid>
            <Row>
              <div className="col">
                <Card className=" shadow">
                  <CardHeader className=" bg-transparent">
                    <h2 className=" mb-0">All Statistics</h2>
                  </CardHeader>
                  <CardBody>
                    <AntRow>
                      <AntCol span={6} xs={24} lg={6}>
                        <Card className="card-stats mb-4 mb-lg-0">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle className="text-uppercase h3 mb-0">
                                  Total Challenges
                                </CardTitle>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                  <i className="fas fa-chart-bar" />
                                </div>
                              </Col>
                            </Row>

                            <p className="text-muted mt-3 text-sm">
                              <span className="text-success mr-2 h2 mt-0 ">
                                {this.state.TotalChallenges}
                                <span className="text-nowrap text-muted  h3 mt-1px float-right">
                                  All Time
                                </span>
                              </span>{" "}
                              <br />
                            </p>
                          </CardBody>
                        </Card>
                      </AntCol>

                      <AntCol span={6} xs={24} lg={6}>
                        <Card className="card-stats mb-4 mb-lg-0">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle className="text-uppercase h3 mb-0">
                                  Total Projects
                                </CardTitle>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                  <i className="fas fa-chart-pie" />
                                </div>
                              </Col>
                            </Row>

                            <p className="text-muted mt-3 text-sm">
                              <span className="text-danger mr-2 h2 mt-0 ">
                                {this.state.TotalFYPs}
                                <span className="text-nowrap text-muted  h3 mt-1px float-right">
                                  All Time
                                </span>
                              </span>{" "}
                              <br />
                            </p>
                          </CardBody>
                        </Card>
                      </AntCol>

                      <AntCol span={6} xs={24} lg={6}>
                        <Card className="card-stats mb-4 mb-lg-0">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle className="text-uppercase h3 mb-0">
                                  Total Events
                                </CardTitle>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                  <i className="fa fa-calendar" />
                                </div>
                              </Col>
                            </Row>

                            <p className="text-muted mt-3 text-sm">
                              <span className="text-warning mr-2 h2 mt-0 ">
                                {this.state.TotalEvents}
                                <span className="text-nowrap text-muted  h3 mt-1px float-right">
                                  All Time
                                </span>
                              </span>{" "}
                              <br />
                            </p>
                          </CardBody>
                        </Card>
                      </AntCol>

                      <AntCol span={6} xs={24} lg={6}>
                        <Card className="card-stats mb-4 mb-lg-0">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle className="text-uppercase h3 mb-0">
                                  Total Jobs Internships
                                </CardTitle>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                  <i className="fa fa-briefcase" />
                                </div>
                              </Col>
                            </Row>

                            <p className="text-muted mt-3 text-sm">
                              <span className="text-purple mr-2 h2 mt-0 ">
                                {this.state.TotalJob}
                                <span className="text-nowrap text-muted  h3 mt-1px float-right">
                                  All Time
                                </span>
                              </span>{" "}
                              <br />
                            </p>
                          </CardBody>
                        </Card>
                      </AntCol>
                    </AntRow>
                  </CardBody>
                </Card>
              </div>
            </Row>
            <br></br>
            <Row>
              <div className="col">
                <Card className=" shadow">
                  <CardBody>
                    <Row>
                      <Col md="12">
                        <GradientLine></GradientLine>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
            </Row>
            <br />
            <Row>
              <div className="col">
                <Card className=" shadow">
                  <CardBody>
                    <Row>
                      <Col md="12">
                        <ColumnChart></ColumnChart>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
            </Row>
          </Container>
        ) : (
          <Container className=" mt--7" fluid>
            {/* Table */}
            <Row>
              <div className=" col">
                <Card className=" shadow">
                  <CardHeader className=" bg-transparent">
                    <h2 className="mb-0">All Statistics </h2>
                  </CardHeader>

                  <CardBody>
                    <div
                      style={{
                        textAlign: "center",
                        paddingTop: "20px",
                        paddingBottom: "20px"
                      }}
                    >
                      <Spin tip="Loading Statistics..." size="large" />
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Row>
          </Container>
        )}
      </>
    );
  }
}

export default Index;
