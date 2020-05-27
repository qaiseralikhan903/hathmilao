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
  Badge,
  Form,
  FormGroup,
  Input
} from "reactstrap";

import { Spin, message } from "antd";

import Moment from "react-moment";
import moment from "moment";

import ChallengeDetail from "./ChallengeDetail";

//Services

import {
  ViewAllChallenge,
  AttemptChallenge,
  SearchChallenge
} from "../../services/challenege.service";

export default class ViewAllChallenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOption: false,
      detailIndex: null,
      totalPages: null,
      currentPage: 1,
      docs: null,
      pages: null,
      studentAttemptChallenge: null,
      Loading: false,
      todayDate: null,
      field: null,
      city: null,
      company: null,
      requireddegree: null
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
    ViewAllChallenge(1)
      .then(response => {
        const pages = [];
        const totalPages = response.data.challenges.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.challenges.page,
          docs: response.data.challenges.docs,
          studentAttemptChallenge:
            response.data.studentDoc[0].attemptchallenges,
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
    ViewAllChallenge(index)
      .then(response => {
        this.setState({
          docs: response.data.challenges.docs,
          currentPage: response.data.challenges.page,
          studentAttemptChallenge:
            response.data.studentDoc[0].attemptchallenges,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.challenges.totalPages;

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
    const { field, city, company, requireddegree } = this.state;
    SearchChallenge(1, field, city, company, requireddegree)
      .then(response => {
        const pages = [];
        const totalPages = response.data.challenges.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.challenges.page,
          docs: response.data.challenges.docs,
          studentAttemptChallenge:
            response.data.studentDoc[0].attemptchallenges,
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
        if (e) {
          console.log(e);
        }
      });
  };

  // To handle Search Page Change
  handleSearchPageChange = index => {
    this.setState({
      Loading: false
    });
    const { field, city, company, requireddegree } = this.state;
    SearchChallenge(index, field, city, company, requireddegree)
      .then(response => {
        this.setState({
          docs: response.data.challenges.docs,
          currentPage: response.data.challenges.page,
          studentAttemptChallenge:
            response.data.studentDoc[0].attemptchallenges,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.challenges.totalPages;

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
        if (e) {
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

  // TO handle Detail Change
  handleClick = index => {
    this.setState(prevState => ({
      detailOption: !prevState.detailOption,
      detailIndex: index
    }));
  };

  // Handle Attempt Challenge
  handleAttemptChallenge = challengeid => {
    AttemptChallenge(challengeid)
      .then(res => {
        let old_challenges = this.state.studentAttemptChallenge;
        old_challenges.push(challengeid);
        this.setState({
          studentAttemptChallenge: old_challenges
        });
        message.success("Challenge Attempted Successfully");
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
                <Form>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <Input
                          name="field"
                          placeholder="Field"
                          onChange={this.handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Input
                          name="city"
                          placeholder="City"
                          onChange={this.handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="2">
                      <FormGroup>
                        <Input
                          name="company"
                          placeholder="Company"
                          onChange={this.handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Input
                          name="requireddegree"
                          placeholder="Degree(BSCS, BSSE)"
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
                        <p className="h4 m-0 capital-first-word">
                          {item.title}
                        </p>
                      </Col>
                      <Col md="2" className="text-center capital-first-word">
                        {item.company}
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

                      <Col md="3" className="text-center">
                        {item.city}, {item.country}
                      </Col>

                      <Col md="2" className="text-center">
                        {this.state.studentAttemptChallenge.includes(
                          item._id
                        ) ? (
                          <Badge color="success" className="mr-1 sorry-badge">
                            Attempted <i className="fa fa-check" />
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
                                  this.handleAttemptChallenge(item._id);
                                }}
                              >
                                Attempt
                              </Button>
                            )}
                          </React.Fragment>
                        )}
                      </Col>
                    </Row>
                    <br />
                    {/* challenge Detail Information  Start*/}
                    {this.state.detailIndex === index &&
                    this.state.detailOption ? (
                      <ChallengeDetail challenge={item} />
                    ) : null}
                    {/* challenge Detail Information  Start*/}
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
                  No Challenges Found..{" "}
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
              <Spin tip="Loading Challenges..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
