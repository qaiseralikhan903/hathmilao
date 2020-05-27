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

import Moment from "react-moment";
import moment from "moment";

import { Spin, message } from "antd";

import FYPDetail from "./FYPDetail";

//Services

import {
  ApplyFYP,
  ViewAllFYP as View_FYP,
  SearchFYP
} from "../../services/fyp.service";

export default class ViewAllFYP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOption: false,
      detailIndex: null,
      totalPages: null,
      currentPage: 1,
      docs: null,
      pages: null,
      studentAppliedFYPS: null,
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
    View_FYP(1)
      .then(response => {
        const pages = [];
        const totalPages = response.data.fyps.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.fyps.page,
          docs: response.data.fyps.docs,
          studentAppliedFYPS: response.data.studentDoc[0].appliedfyp,
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
    View_FYP(index)
      .then(response => {
        this.setState({
          docs: response.data.fyps.docs,
          currentPage: response.data.fyps.page,
          studentAppliedFYPS: response.data.studentDoc[0].appliedfyp,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.fyps.totalPages;

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
    SearchFYP(1, field, city, company, requireddegree)
      .then(response => {
        const pages = [];
        const totalPages = response.data.fyps.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.fyps.page,
          docs: response.data.fyps.docs,
          studentAppliedFYPS: response.data.studentDoc[0].appliedfyp,
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
    SearchFYP(index, field, city, company, requireddegree)
      .then(response => {
        this.setState({
          docs: response.data.fyps.docs,
          currentPage: response.data.fyps.page,
          studentAppliedFYPS: response.data.studentDoc[0].appliedfyp,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.fyps.totalPages;

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

  // Handle Apply FYP
  handleApplyFYP = fypid => {
    ApplyFYP(fypid)
      .then(res => {
        let old_appliedfyp = this.state.studentAppliedFYPS;
        old_appliedfyp.push(fypid);
        this.setState({
          studentAppliedFYPS: old_appliedfyp
        });
        message.success("Final Year Project Applied Successfully");
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
                        {this.state.studentAppliedFYPS.includes(item._id) ? (
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
                                  this.handleApplyFYP(item._id);
                                }}
                              >
                                Apply
                              </Button>
                            )}
                          </React.Fragment>
                        )}
                      </Col>
                    </Row>
                    <br />
                    {/* FYP Detail Information  Start*/}
                    {this.state.detailIndex === index &&
                    this.state.detailOption ? (
                      <FYPDetail fyp={item} />
                    ) : null}
                    {/* FYP Detail Information  Start*/}
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
                  No Project Found..{" "}
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
              <Spin tip="Loading Final Year Projects..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
