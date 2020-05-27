import React, { Component } from "react";

import {
  CardBody,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Col
} from "reactstrap";

import { EventApplicant } from "../../services/event.service";

import StudentProfile from "../Helper/StudentProfile.jsx";

export default class ParticipantEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventid: null,
      detailOption: false,
      totalPages: null,
      DetailIndex: null,
      currentPage: 1,
      docs: null,
      pages: null,
      Loading: false
    };
  }

  componentDidMount() {
    this.setState({
      eventid: this.props.eventid,
      Loading: false
    });

    EventApplicant(1, this.props.eventid)
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
    EventApplicant(index, this.state.eventid)
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
                  List of Participants:
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
                {/* <Form>
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
                </Form> */}

                {(this.state.docs || []).map((item, index) => (
                  <React.Fragment key={index}>
                    <Row className="shadow--hover job-box">
                      <Col md="8">
                        <p className="h4 m-0">{item.name}</p>
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
                  List of Participants:
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

                <h4>No Participants Found</h4>
              </CardBody>
            )}
          </React.Fragment>
        ) : (
          <CardBody>
            <h3>
              List of Participants:
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
            <h1>Loading...</h1>
          </CardBody>
        )}
      </>
    );
  }
}
