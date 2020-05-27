import React, { Component } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  Col,
  PaginationItem,
  PaginationLink,
  Button,
  Pagination,
  Form,
  FormGroup,
  Input
} from "reactstrap";

// Service
import {
  ViewAllJobless,
  SearchJoblessStudent
} from "../../services/job.service";
// Components
import StudentProfile from "../Helper/StudentProfile.jsx";

import SingleStudent from "./SingleStudent.jsx";
import { Spin } from "antd";

export default class ViewAllStudents extends Component {
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
      headline: null,
      degree: null,
      city: null,
      skill: null,
      contacts: null
    };
  }

  componentDidMount() {
    this.setState({
      Loading: false
    });
    ViewAllJobless(1)
      .then(response => {
        const pages = [];
        const totalPages = response.data.JoblessStudent.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.JoblessStudent.page,
          docs: response.data.JoblessStudent.docs,
          contacts: response.data.studentContacts,
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
    ViewAllJobless(index)
      .then(response => {
        this.setState({
          docs: response.data.JoblessStudent.docs,
          currentPage: response.data.JoblessStudent.page,
          contacts: response.data.studentContacts,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.JoblessStudent.totalPages;

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

  // Search Handler Start
  handleSearchChange = event => {
    event.preventDefault();
    this.setState({
      Loading: false
    });
    const { headline, degree, city, skill } = this.state;
    SearchJoblessStudent(1, headline, degree, city, skill)
      .then(response => {
        const pages = [];
        const totalPages = response.data.JoblessStudent.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.JoblessStudent.page,
          docs: response.data.JoblessStudent.docs,
          contacts: response.data.studentContacts,
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
    const { headline, degree, city, skill } = this.state;
    SearchJoblessStudent(index, headline, degree, city, skill)
      .then(response => {
        this.setState({
          docs: response.data.JoblessStudent.docs,
          currentPage: response.data.JoblessStudent.page,
          contacts: response.data.studentContacts,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.JoblessStudent.totalPages;

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

  // To handle Detail of Company
  handleClick = index => {
    this.setState(prevState => ({
      detailOption: !prevState.detailOption,
      detailIndex: index
    }));
  };

  render() {
    return (
      <>
        {this.state.Loading ? (
          <Container className=" mt--7" fluid>
            {/* Table */}
            <Row>
              <div className=" col">
                <Card className=" shadow">
                  <CardHeader className=" bg-transparent">
                    <h2 className="mb-0">All Jobless Students</h2>
                  </CardHeader>

                  {this.state.docs.length > 0 ? (
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <Input
                                name="headline"
                                placeholder="Title"
                                onChange={this.handleInputChange}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                              <Input
                                name="degree"
                                placeholder="Degree"
                                onChange={this.handleInputChange}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                              <Input
                                name="city"
                                placeholder="City"
                                onChange={this.handleInputChange}
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
                            <Col
                              md="3"
                              onClick={() => {
                                this.handleClick(index);
                              }}
                            >
                              <p className="h4 m-0">{item.name}</p>
                            </Col>
                            <Col md="4" className="capital-first-word">
                              {item.headline}
                            </Col>
                            <Col md="5">
                              {(item.skill || []).map((subitem, subindex) => (
                                <span key={subindex} className="skill-tag">
                                  {subitem}
                                </span>
                              ))}
                            </Col>
                          </Row>
                          <br />
                          {/* Company Detail Information  Start*/}

                          {this.state.detailIndex === index &&
                          this.state.detailOption ? (
                            <SingleStudent
                              student={item}
                              {...this.props}
                              studentContact={this.state.contacts}
                            />
                          ) : null}

                          {/* Company Detail Information  Start*/}
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
                        No Student Found..{" "}
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
                    <h2 className="mb-0">All Jobless Students</h2>
                  </CardHeader>

                  <CardBody>
                    <div
                      style={{
                        textAlign: "center",
                        paddingTop: "20px",
                        paddingBottom: "20px"
                      }}
                    >
                      <Spin tip="Loading Companies..." size="large" />
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
