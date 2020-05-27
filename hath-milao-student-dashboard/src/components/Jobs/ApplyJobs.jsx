import React from "react";
// reactstrap components
import {
  CardBody,
  Row,
  Col,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import Moment from "react-moment";
import moment from "moment";

import JobDetails from "./JobDetails.jsx";

//Services
import { AllAppliedJob, CancelAppliedJob } from "../../services/job.service";
import { Spin, message } from "antd";

class ApplyJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOption: false,
      detailIndex: null,
      totalPages: null,
      currentPage: 1,
      docs: null,
      pages: null,
      Loading: false,
      todayDate: null
    };
  }

  //   Initail Request
  componentDidMount() {
    let m = moment().utcOffset(0);
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    m.toISOString();
    m.format();
    const today = m.toISOString();
    this.setState({
      Loading: false
    });
    AllAppliedJob(1)
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

  // TO handle Page Change
  handlePageChange = index => {
    this.setState({
      Loading: false
    });
    AllAppliedJob(index)
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

  //   To Handle Detail Option
  handleClick = index => {
    this.setState(prevState => ({
      detailOption: !prevState.detailOption,
      detailIndex: index
    }));
  };

  // Handle UnSaveJob
  handleCancelJob = jodid => {
    CancelAppliedJob(jodid)
      .then(res => {
        let old_jobs = this.state.docs;
        let new_docs = old_jobs.filter(item => {
          return item._id != jodid;
        });
        this.setState({
          docs: new_docs
        });
        message.success("Job Cancelled Successfully");
      })
      .catch(err => {
        message.error("Something Wrong! Try Again");
      });
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
                      <Col md="2" className="text-center">
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
                      <Col md="2" className="text-center" sm="2">
                        <Button
                          color="danger"
                          size="sm"
                          type="button"
                          onClick={() => {
                            this.handleCancelJob(item._id);
                          }}
                        >
                          Cancel
                        </Button>
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
              <Spin tip="Loading Apply Jobs and Internships..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}

export default ApplyJobs;
