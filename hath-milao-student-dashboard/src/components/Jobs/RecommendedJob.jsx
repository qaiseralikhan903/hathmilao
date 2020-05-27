import React from "react";
// reactstrap components
import {
  CardBody,
  Row,
  Col,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge
} from "reactstrap";

import Moment from "react-moment";
import moment from "moment";

import JobDetails from "./JobDetails.jsx";

//Services
import { RecommendedJobs, ApplyJob, SaveJob } from "../../services/job.service";
import { Spin } from "antd";

export default class RecommendedJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOption: false,
      detailIndex: null,
      totalPages: null,
      currentPage: 1,
      docs: null,
      pages: null,
      studentSavedJobs: null,
      studentAppliedJobs: null,
      Loading: false,
      todayDate: null
    };
  }

  componentDidMount() {
    let m = moment().utcOffset(0);
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    m.toISOString();
    m.format();
    const today = m.toISOString();
    this.setState({
      Loading: false
    });
    RecommendedJobs(1)
      .then(response => {
        const pages = [];
        const totalPages = response.data.jobs.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.jobs.page,
          docs: response.data.jobs.docs,
          studentSavedJobs: response.data.studentDoc[0].savedjob,
          studentAppliedJobs: response.data.studentDoc[0].appliedjob,
          todayDate: today,
          Loading: true
        });
        for (let index = 1; index <= totalPages; index++) {
          pages.push(
            <PaginationItem
              key={index}
              className={this.state.currentPage === index ? "active" : null}
            >
              <PaginationLink onClick={() => this.handlePageChange(index)}>
                {index}
              </PaginationLink>
            </PaginationItem>
          );
        }
        this.setState({
          pages: pages
        });
      })
      .catch(e => {
        if (e) {
          console.log(e);
        }
      });
  }

  // TO handle Page Change
  handlePageChange = index => {
    this.setState({
      Loading: false
    });
    RecommendedJobs(index)
      .then(response => {
        this.setState({
          docs: response.data.jobs.docs,
          currentPage: response.data.jobs.page,
          studentSavedJobs: response.data.studentDoc[0].savedjob,
          studentAppliedJobs: response.data.studentDoc[0].appliedjob,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.jobs.totalPages;

        for (let index = 1; index <= totalPages; index++) {
          pages.push(
            <PaginationItem
              key={index}
              className={this.state.currentPage === index ? "active" : null}
            >
              <PaginationLink onClick={() => this.handlePageChange(index)}>
                {index}
              </PaginationLink>
            </PaginationItem>
          );
        }

        this.setState({
          pages: pages
        });
      })
      .catch(e => {
        if (e) {
          console.log(e);
        }
      });
  };

  handleClick = index => {
    this.setState(prevState => ({
      detailOption: !prevState.detailOption,
      detailIndex: index
    }));
  };

  // Handle Apply Job
  handleApplyJob = jodid => {
    ApplyJob(jodid);
    window.location.reload();
  };

  // Handle Save Job
  handleSaveJob = jodid => {
    SaveJob(jodid);
    window.location.reload();
  };

  render() {
    return (
      <>
        {this.state.Loading ? (
          <React.Fragment>
            {this.state.docs.length > 0 ? (
              <CardBody>
                {(this.state.docs || []).map((item, index) => (
                  <React.Fragment key={index}>
                    <Row className="shadow--hover job-box">
                      <Col
                        md="3"
                        onClick={() => {
                          this.handleClick(index);
                        }}
                      >
                        <p className="h4 m-0">{item.title}</p>
                      </Col>
                      <Col md="3" className="text-center">
                        PKR {item.minsalary} - {item.maxsalary}
                      </Col>
                      <Col md="2" className="text-center capital-first-word">
                        {item.jobType}
                      </Col>
                      <Col md="2" className="text-center capital-first-word">
                        {moment(item.applybefore).isSameOrBefore(
                          this.state.today
                        ) ? (
                          <span className="date-apply-danger">
                            <Moment format="YYYY/MM/DD">
                              {item.applybefore}
                            </Moment>
                          </span>
                        ) : (
                          <span className="date-apply-success">
                            <Moment format="YYYY/MM/DD">
                              {item.applybefore}
                            </Moment>
                          </span>
                        )}
                      </Col>

                      <Col md="2" className="text-center">
                        {this.state.studentAppliedJobs.includes(item._id) ? (
                          <Badge color="success" className="mr-1 sorry-badge">
                            Applied <i className="fa fa-check" />
                          </Badge>
                        ) : (
                          <React.Fragment>
                            {moment(item.applybefore).isSameOrBefore(
                              this.state.today
                            ) ? (
                              <Badge color="danger" className="sorry-badge">
                                Sorry <i className="fa fa-heartbeat" />
                              </Badge>
                            ) : (
                              <Button
                                color="primary"
                                size="sm"
                                type="button"
                                onClick={() => {
                                  this.handleApplyJob(item._id);
                                }}
                              >
                                Apply
                              </Button>
                            )}
                          </React.Fragment>
                        )}

                        {this.state.studentSavedJobs.includes(
                          item._id
                        ) ? null : (
                          <Button
                            color="info"
                            size="sm"
                            type="button"
                            onClick={() => {
                              this.handleSaveJob(item._id);
                            }}
                          >
                            <i className="fa fa-bookmark" />
                          </Button>
                        )}
                      </Col>
                    </Row>
                    <br />
                    {/* Job Detail Information  Start*/}

                    {this.state.detailIndex === index &&
                    this.state.detailOption ? (
                      <JobDetails job={item} />
                    ) : null}

                    {/* Job Detail Information  Start*/}
                  </React.Fragment>
                ))}
                {this.state.totalPages && (
                  <Row className="mt-4">
                    <Col>
                      <nav aria-label="Page navigation example">
                        <Pagination
                          className="pagination justify-content-center"
                          listClassName="justify-content-center"
                        >
                          {this.state.pages}
                        </Pagination>
                      </nav>
                    </Col>
                  </Row>
                )}
              </CardBody>
            ) : (
              <CardBody>
                <h1>
                  No Job Found..{" "}
                  <Button
                    className="btn-icon btn-3"
                    color="primary"
                    type="button"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-sync" />
                    </span>
                    <span className="btn-inner--text">Refresh Page</span>
                  </Button>
                </h1>
              </CardBody>
            )}
          </React.Fragment>
        ) : (
          <CardBody>
            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px"
              }}
            >
              <Spin
                tip="Loading Recommended Jobs and Internships..."
                size="large"
              />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
