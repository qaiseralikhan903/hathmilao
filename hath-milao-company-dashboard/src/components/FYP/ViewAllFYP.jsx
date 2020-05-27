import React, { Component } from "react";
import ReactDatetime from "react-datetime";

import {
  Row,
  Col,
  CardBody,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

import Moment from "react-moment";
import moment from "moment";

//Services
import {
  ViewAllFYP as ViewFYP,
  DeleteFYP,
  SearchFYP
} from "../../services/fyp.service";

import FYPDetail from "./FYPDetail.jsx";
import EditFYP from "./EditFYP.jsx";
import ApplicantsFYP from "./ApplicantsFYP.jsx";
import { Spin, message, Popconfirm } from "antd";
export default class ViewAllFYP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOption: false,
      totalPages: null,
      currentPage: 1,
      docs: null,
      pages: null,
      Loading: false,
      Edit: false,
      EditIndex: null,
      DetailIndex: null,
      showApplicants: false,
      fypid: null,
      title: null,
      date: null,
      field: null,
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
    ViewFYP(1)
      .then(response => {
        const pages = [];
        const totalPages = response.data.fyps.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.fyps.page,
          docs: response.data.fyps.docs,
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

  // TO handle All View FYP Change
  handlePageChange = index => {
    this.setState({
      Loading: false
    });
    ViewFYP(index)
      .then(response => {
        this.setState({
          docs: response.data.fyps.docs,
          currentPage: response.data.fyps.page,
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
    const { title, date, field } = this.state;
    SearchFYP(1, title, date, field)
      .then(response => {
        const pages = [];
        const totalPages = response.data.fyps.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.fyps.page,
          docs: response.data.fyps.docs,
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
    const { title, date, field } = this.state;
    SearchFYP(index, title, date, field)
      .then(response => {
        this.setState({
          docs: response.data.fyps.docs,
          currentPage: response.data.fyps.page,
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
  handleFYPDelete = fypid => {
    DeleteFYP(fypid)
      .then(response => {
        const myFYPS = this.state.docs;
        let new_fyps = myFYPS.filter(item => {
          return item._id != fypid;
        });
        this.setState({
          docs: new_fyps
        });
        message.success("Final Year Project Delete Successfully");
      })
      .catch(err => {
        message.error("Something Wrong! Try Again");
      });
  };

  // Applicant Handler
  handleApplicantChange = fypid => {
    this.setState(prevState => ({
      showApplicants: !prevState.showApplicants,
      fypid: fypid
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
                  <ApplicantsFYP
                    fypid={this.state.fypid}
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
                              placeholder="Title"
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
                              name="field"
                              placeholder="Field "
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
                            <p className="h4 m-0">{item.title}</p>
                          </Col>
                          <Col md="3" className="text-center">
                            {item.field[0]}
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
                                this.handleFYPDelete(item._id);
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
                              List of Applicants {item.fypapplicants.length}
                            </Button>
                          </Col>
                        </Row>
                        <br />
                        {/* FYP Detail Information  Start*/}

                        {this.state.detailOption &&
                        this.state.DetailIndex === index ? (
                          <FYPDetail fyp={item} />
                        ) : null}

                        {this.state.Edit && this.state.EditIndex === index ? (
                          <EditFYP fyp={item} />
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
                )}
              </React.Fragment>
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
              <Spin tip="Loading Final Year Project..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
