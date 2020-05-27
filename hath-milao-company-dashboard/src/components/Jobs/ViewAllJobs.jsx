import React from "react";
import ReactDatetime from "react-datetime";
// reactstrap components
import {
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

import Moment from "react-moment";
import moment from "moment";

import JobDetails from "./JobDetails.jsx";
import EditJob from "./EditJob.jsx";
import ApplicantJob from "./ApplicantJob.jsx";

//Services
import { ViewAllJob, SearchJob, DeleteJob } from "../../services/job.service";
import { Spin, message, Popconfirm } from "antd";

class ViewAllJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOption: false,
      totalPages: null,
      currentPage: 1,
      docs: null,
      pages: null,
      title: null,
      date: null,
      jobType: null,
      Loading: false,
      Edit: false,
      EditIndex: null,
      DetailIndex: null,
      showApplicants: false,
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
    ViewAllJob(1)
      .then(response => {
        const pages = [];
        const totalPages = response.data.jobs.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.jobs.page,
          docs: response.data.jobs.docs,
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
        if (e.response.data) {
          console.log(e);
        }
      });
  }

  // TO handle All View Job Change
  handlePageChange = index => {
    this.setState({
      Loading: false
    });
    ViewAllJob(index)
      .then(response => {
        this.setState({
          docs: response.data.jobs.docs,
          currentPage: response.data.jobs.page,
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
        if (e.response.data) {
          console.log(e);
        }
      });
  };

  // Search Handler Start
  handleSearchChange = event => {
    event.preventDefault();
    this.setState({
      Loading: false
    });
    const { title, date, jobType } = this.state;
    SearchJob(1, title, date, jobType)
      .then(response => {
        const pages = [];
        const totalPages = response.data.jobs.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.jobs.page,
          docs: response.data.jobs.docs,
          Loading: true
        });
        for (let index = 1; index <= totalPages; index++) {
          pages.push(
            <PaginationItem
              key={index}
              className={this.state.currentPage === index ? "active" : null}
            >
              <PaginationLink
                onClick={() => this.handleSearchPageChange(index)}
              >
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
        if (e.response.data) {
          console.log(e);
        }
      });
  };

  // To handle Search Page Change
  handleSearchPageChange = index => {
    this.setState({
      Loading: false
    });
    const { title, date, jobType } = this.state;
    SearchJob(index, title, date, jobType)
      .then(response => {
        this.setState({
          docs: response.data.jobs.docs,
          currentPage: response.data.jobs.page,
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
              <PaginationLink
                onClick={() => this.handleSearchPageChange(index)}
              >
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
        if (e.response.data) {
          console.log(e);
        }
      });
  };

  // To Handle Form Input
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Handle Date Change
  handleDateChange = newdate => {
    newdate = newdate._d.toISOString();
    let stringDate = String(newdate).split("T")[0];

    this.setState({
      date: stringDate
    });
  };

  // Search Handler End

  // Show Detail
  handleClick = index => {
    this.setState(prevState => ({
      detailOption: !prevState.detailOption,
      DetailIndex: index,
      Edit: false
    }));
  };

  // Show edit page
  handleEditPage = index => {
    this.setState(prevState => ({
      Edit: !prevState.Edit,
      EditIndex: index,
      detailOption: false
    }));
  };

  // Delete Button logic
  handleJobDelete = jobid => {
    DeleteJob(jobid)
      .then(response => {
        const myJobs = this.state.docs;
        let new_Jobs = myJobs.filter(item => {
          return item._id != jobid;
        });
        this.setState({
          docs: new_Jobs
        });
        message.success("Job Delete Successfully");
      })
      .catch(err => {
        message.error("Something Wrong! Try Again");
      });
  };

  // Applicant Handler
  handleApplicantChange = jobid => {
    this.setState(prevState => ({
      showApplicants: !prevState.showApplicants,
      jobid: jobid
    }));
  };

  // TO Back Handle Applicant change
  ChangeHandleBack = () => {
    this.setState(prevState => ({
      showApplicants: !prevState.showApplicants
    }));
  };

  render() {
    return (
      <>
        {this.state.Loading ? (
          <React.Fragment>
            {this.state.docs.length > 0 ? (
              <React.Fragment>
                {this.state.showApplicants ? (
                  <ApplicantJob
                    jobid={this.state.jobid}
                    goBack={this.ChangeHandleBack}
                  />
                ) : (
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <Input
                              name="title"
                              placeholder="Job Title"
                              onChange={this.handleInputChange}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <InputGroup className="input-group-alternative date-input">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <ReactDatetime
                                inputProps={{
                                  placeholder: "Post Date"
                                }}
                                utc={true}
                                timeFormat={false}
                                onChange={this.handleDateChange}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <Input
                              type="select"
                              name="jobType"
                              onChange={this.handleInputChange}
                            >
                              <option value="null">Job Type</option>

                              <option value="internship">Internship</option>
                              <option value="fulltime">Full-Time</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="1" className="text-center">
                          <FormGroup>
                            <Button
                              className="btn-icon btn-2"
                              color="secondary"
                              outline
                              type="button"
                              onClick={this.handleSearchChange}
                            >
                              <span className="btn-inner--icon">
                                <i className="fas fa-search" />
                              </span>
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>

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

                          <Col
                            md="3"
                            className="text-center capital-first-word"
                          >
                            {item.jobType}
                          </Col>

                          <Col
                            md="2"
                            className="text-center capital-first-word"
                          >
                            {moment(item.applybefore).isSameOrBefore(
                              this.state.today
                            ) ? (
                              <span className="text-danger">
                                <Moment format="YYYY/MM/DD">
                                  {item.applybefore}
                                </Moment>
                              </span>
                            ) : (
                              <span className="text-success">
                                <Moment format="YYYY/MM/DD">
                                  {item.applybefore}
                                </Moment>
                              </span>
                            )}
                          </Col>

                          <Col md="4" className="text-center">
                            {this.state.Edit &&
                            this.state.EditIndex === index ? (
                              <Button
                                color="default"
                                size="sm"
                                type="button"
                                onClick={() => {
                                  this.handleEditPage(index);
                                }}
                              >
                                Close
                              </Button>
                            ) : (
                              <Button
                                color="info"
                                size="sm"
                                type="button"
                                onClick={() => {
                                  this.handleEditPage(index);
                                }}
                              >
                                Edit
                              </Button>
                            )}

                            <Popconfirm
                              title="Are you sure delete this?"
                              onConfirm={() => {
                                this.handleJobDelete(item._id);
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button color="danger" size="sm" type="button">
                                <i className="fas fa-trash" />
                              </Button>
                            </Popconfirm>

                            <Button
                              color="success"
                              size="sm"
                              type="button"
                              onClick={() => {
                                this.handleApplicantChange(item._id);
                              }}
                            >
                              List of Applicants {item.jobapplicants.length}
                            </Button>
                          </Col>
                        </Row>
                        <br />
                        {/* Job Detail Information  Start*/}

                        {this.state.detailOption &&
                        this.state.DetailIndex === index ? (
                          <JobDetails job={item} />
                        ) : null}

                        {this.state.Edit && this.state.EditIndex === index ? (
                          <EditJob job={item} />
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
                )}
              </React.Fragment>
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
              <Spin tip="Loading Jobs and Internships..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}

export default ViewAllJobs;
