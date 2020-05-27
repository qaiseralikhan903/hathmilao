import React, { Component } from "react";
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

import { Row as AntRow, Col as AntCol } from "antd";

// core components
import Header from "components/Headers/Header.jsx";
import GradientLine from "./charts/Line.jsx";
import BarChart from "./charts/BarChart.jsx";

// Services
import { BoxStatistics } from "../services/reporting.service.js";
import { Spin } from "antd";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TotalJobless: null,
      TotalOnJob: null,
      TotalEvents: null,
      TotalJobFair: null,
      Loading: false
    };
  }
  componentDidMount() {
    BoxStatistics().then(response => {
      const {
        TotalJobless,
        TotalOnJob,
        TotalEvents,
        TotalJobFair
      } = response.data;
      this.setState({
        TotalJobless: TotalJobless,
        TotalOnJob: TotalOnJob,
        TotalEvents: TotalEvents,
        TotalJobFair: TotalJobFair,
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
                                  Jobless Students
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
                                {this.state.TotalJobless}
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
                                  On-Job Students
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
                                {this.state.TotalOnJob}
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
                                  Added Events
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
                                  Job Fairs
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
                                {this.state.TotalJobFair}
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
                        <BarChart></BarChart>
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
