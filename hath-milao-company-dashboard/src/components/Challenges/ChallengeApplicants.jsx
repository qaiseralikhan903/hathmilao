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

import {
  ChallengeApplicant,
  UploadRating
} from "../../services/challenge.service";

import StudentProfile from "../Helper/StudentProfile.jsx";

import Ratings from "react-ratings-declarative";
import { Spin } from "antd";

export default class ChallengeApplicants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeid: null,
      detailOption: false,
      totalPages: null,
      DetailIndex: null,
      currentPage: 1,
      challengeSubmission: null,
      docs: null,
      pages: null,
      rating: 0,
      Loading: false
    };
  }

  componentDidMount() {
    this.setState({
      challengeid: this.props.challengeid,
      Loading: false
    });

    ChallengeApplicant(1, this.props.challengeid)
      .then(response => {
        const pages = [];
        const totalPages = response.data.students.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.students.page,
          docs: response.data.students.docs,
          challengeSubmission: response.data.challengeArray,
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
    ChallengeApplicant(index, this.state.challengeid)
      .then(response => {
        this.setState({
          docs: response.data.students.docs,
          currentPage: response.data.students.page,
          challengeSubmission: response.data.challengeArray,
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

  // To handle Star Rating
  changeRating = (rating, challengeSubmissionid) => {
    this.setState({
      rating: {
        [challengeSubmissionid]: rating
      }
    });
    UploadRating({
      challengeSubmissionId: challengeSubmissionid,
      rating: rating
    })
      .then(response => {
        this.forceUpdate();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        {this.state.Loading ? (
          <React.Fragment>
            {this.state.docs.length > 0 ? (
              <CardBody>
                <h3>
                  List of Submission:
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
                      <Col
                        md="3"
                        onClick={() => {
                          this.handleClick(index);
                        }}
                      >
                        <p className="h4 m-0">{item.name}</p>
                      </Col>

                      <Col md="5">
                        <p className="h4 m-0">
                          {this.state.challengeSubmission[index].description ==
                          "none" ? (
                            <React.Fragment>
                              <span className="text-warning">
                                {" "}
                                Solution Not Upload Yet{" "}
                              </span>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <a
                                href={
                                  this.state.challengeSubmission[index]
                                    .description
                                }
                                target="_blank"
                              >
                                <small>
                                  {
                                    this.state.challengeSubmission[index]
                                      .description
                                  }
                                </small>
                              </a>
                            </React.Fragment>
                          )}
                        </p>
                      </Col>

                      <Col md="4" className="text-center">
                        <Ratings
                          rating={
                            this.state.rating[
                              this.state.challengeSubmission[index]._id
                            ]
                              ? this.state.rating[
                                  this.state.challengeSubmission[index]._id
                                ]
                              : this.state.challengeSubmission[index].rating
                          }
                          widgetRatedColors="yellow"
                          changeRating={rating => {
                            this.changeRating(
                              rating,
                              this.state.challengeSubmission[index]._id
                            );
                          }}
                          widgetDimensions="30px"
                          widgetSpacings="5px"
                        >
                          <Ratings.Widget widgetHoverColor="yellow" />
                          <Ratings.Widget widgetHoverColor="yellow" />
                          <Ratings.Widget widgetHoverColor="yellow" />
                          <Ratings.Widget widgetHoverColor="yellow" />
                          <Ratings.Widget widgetHoverColor="yellow" />
                        </Ratings>
                      </Col>
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
                  List of Submission:
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
              List of Submission:
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
              <Spin tip="Loading Challenge Applicants..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
