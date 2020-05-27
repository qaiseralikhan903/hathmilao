import React, { Component } from "react";

import {
  CardBody,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Col,
  Form,
  FormGroup,
  Input
} from "reactstrap";

import { JobApplicant, SearchJobApplicant } from "../../services/job.service";

import StudentProfile from "../Helper/StudentProfile.jsx";
import { Spin } from "antd";

export default class ApplicantJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobid: null,
      detailOption: false,
      totalPages: null,
      DetailIndex: null,
      currentPage: 1,
      docs: null,
      pages: null,
      loading: false,
      headline: null,
      city: null,
      country: null,
      skill: null
    };
  }

  componentDidMount() {
    this.setState({
      jobid: this.props.jobid,
      Loading: false
    });

    JobApplicant(1, this.props.jobid)
      .then(response => {
        const pages = [];
        const totalPages = response.data.students.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.students.page,
          docs: response.data.students.docs,
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

  // TO handle All View Job Change
  handlePageChange = index => {
    this.setState({
      Loading: false
    });
    JobApplicant(index, this.state.jobid)
      .then(response => {
        this.setState({
          docs: response.data.students.docs,
          currentPage: response.data.students.page,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.students.totalPages;

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
    const { jobid, headline, city, country, skill } = this.state;
    SearchJobApplicant(1, jobid, headline, city, country, skill)
      .then(response => {
        const pages = [];
        const totalPages = response.data.students.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.students.page,
          docs: response.data.students.docs,
          // contacts: response.data.studentContacts,
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
    const { jobid, headline, city, country, skill } = this.state;
    SearchJobApplicant(index, jobid, headline, city, country, skill)
      .then(response => {
        this.setState({
          docs: response.data.students.docs,
          currentPage: response.data.students.page,
          // contacts: response.data.studentContacts,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.students.totalPages;

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

  // Search Handler End

  // To Handle Show Detail of Students
  handleClick = index => {
    this.setState(prevState => ({
      detailOption: !prevState.detailOption,
      DetailIndex: index
    }));
  };

  render() {
    return (
      <>
        {this.state.Loading ? (
          <React.Fragment>
            {this.state.docs.length > 0 ? (
              <CardBody>
                <h3>
                  List of Applicants:
                  <Button
                    color="default"
                    size="sm"
                    className="float-right"
                    onClick={this.props.goBack}
                  >
                    Back
                  </Button>
                </h3>
                <hr />
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Input
                          name="headline"
                          placeholder="Designation"
                          onChange={this.handleInputChange}
                          value={this.state.headline}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Input
                          name="city"
                          placeholder="city"
                          onChange={this.handleInputChange}
                          value={this.state.city}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Input
                          name="country"
                          placeholder="country"
                          onChange={this.handleInputChange}
                          value={this.state.country}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Input
                          name="skill"
                          placeholder="Skill"
                          onChange={this.handleInputChange}
                          value={this.state.skill}
                          type="text"
                        />
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
                      <Col md="5">
                        <p className="h4 m-0">{item.name}</p>
                      </Col>
                      <Col md="3" className="capital-first-word">
                        {item.headline}
                      </Col>
                      <Col md="4" className="text-center">
                        <Button
                          color="info"
                          onClick={() => {
                            this.handleClick(index);
                          }}
                          size="sm"
                        >
                          Show Profile
                        </Button>
                      </Col>
                      {/* <Col md="3" className="text-center">
                        PKR {item.minsalary} - {item.maxsalary}
                      </Col>
                      <Col md="2" className="text-center capital-first-word">
                        {item.jobType}
                      </Col>
                      <Col md="2" className="text-center ">
                        <Moment format="YYYY/MM/DD">{item.applybefore}</Moment>
                      </Col>

                      <Col md="2" className="text-center">
                        {this.state.Edit && this.state.EditIndex === index ? (
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

                        <Button
                          color="danger"
                          size="sm"
                          type="button"
                          onClick={() => {
                            this.handleJobDelete(item._id);
                          }}
                        >
                          <i className="fas fa-trash" />
                        </Button>
                      </Col> */}
                    </Row>
                    <br />

                    {/* Job Detail Information  Start*/}

                    {this.state.detailOption &&
                    this.state.DetailIndex === index ? (
                      <StudentProfile student={item} />
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
                <h3>
                  List of Applicants:
                  <Button
                    color="default"
                    size="sm"
                    className="float-right"
                    onClick={this.props.goBack}
                  >
                    Back
                  </Button>
                </h3>
                <hr className="mt-0 mb-1" />

                <h4>No Applicant Found</h4>
              </CardBody>
            )}
          </React.Fragment>
        ) : (
          <CardBody>
            <h3>
              List of Applicants:
              <Button
                color="default"
                size="sm"
                className="float-right"
                onClick={this.props.goBack}
              >
                Back
              </Button>
            </h3>
            <hr />
            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px"
              }}
            >
              <Spin tip="Loading Job Applicants..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
