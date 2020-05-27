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

import EventDetail from "./EventDetail";

//Services
import {
  RegisterEvent,
  ViewAllEvent as View_Event,
  SearchEvent
} from "../../services/event.service";

export default class ViewAllEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOption: false,
      detailIndex: null,
      totalPages: null,
      currentPage: 1,
      docs: null,
      pages: null,
      studentRegisterEvents: null,
      Loading: false,
      todayDate: null,
      title: null,
      venue: null,
      field: null,
      eventType: null
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
    View_Event(1)
      .then(response => {
        const pages = [];
        const totalPages = response.data.events.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.events.page,
          docs: response.data.events.docs,
          studentRegisterEvents: response.data.studentDoc[0].registeredevents,
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
    View_Event(index)
      .then(response => {
        this.setState({
          docs: response.data.events.docs,
          currentPage: response.data.events.page,
          studentRegisterEvents: response.data.studentDoc[0].registeredevents,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.events.totalPages;

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
    const { title, venue, field, eventType } = this.state;
    SearchEvent(1, title, venue, field, eventType)
      .then(response => {
        const pages = [];
        const totalPages = response.data.events.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.events.page,
          docs: response.data.events.docs,
          studentRegisterEvents: response.data.studentDoc[0].registeredevents,
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
    const { title, venue, field, eventType } = this.state;
    SearchEvent(index, title, venue, field, eventType)
      .then(response => {
        this.setState({
          docs: response.data.events.docs,
          currentPage: response.data.events.page,
          studentRegisterEvents: response.data.studentDoc[0].registeredevents,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.events.totalPages;

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

  // Handle Register Event
  handleRegisterEvent = eventid => {
    RegisterEvent(eventid)
      .then(res => {
        let old_registerEvent = this.state.studentRegisterEvents;
        old_registerEvent.push(eventid);
        this.setState({
          studentRegisterEvents: old_registerEvent
        });
        message.success("Event Registered Successfully");
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
                          name="title"
                          placeholder="Event Title"
                          onChange={this.handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Input
                          name="venue"
                          placeholder="City"
                          onChange={this.handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>

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
                    <Col md="2">
                      <FormGroup>
                        <Input
                          type="select"
                          name="eventType"
                          onChange={this.handleInputChange}
                        >
                          <option value="null">Event Type</option>
                          <option value="jobfair">Jobfair</option>
                          <option value="networking">Networking</option>
                          <option value="webinar">Webinar</option>
                          <option value="workshop">Workshop</option>
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
                        <p className="h4 m-0 capital-first-word">
                          {item.title}
                        </p>
                      </Col>
                      <Col md="2" className="text-center capital-first-word">
                        {item.createdBy}
                      </Col>

                      <Col md="2" className="text-center capital-first-word">
                        {moment(item.dateAt).isSameOrBefore(
                          this.state.today
                        ) ? (
                          <span className="date-apply-danger">
                            <Moment format="YYYY/MM/DD">{item.dateAt}</Moment>
                          </span>
                        ) : (
                          <span className="date-apply-success">
                            <Moment format="YYYY/MM/DD">{item.dateAt}</Moment>
                          </span>
                        )}
                      </Col>

                      <Col md="3" className="text-center">
                        {item.startTime} - {item.endTime}
                      </Col>

                      <Col md="2" className="text-center">
                        {this.state.studentRegisterEvents.includes(item._id) ? (
                          <Badge color="success" className="mr-1 sorry-badge">
                            Registered <i className="fa fa-check" />
                          </Badge>
                        ) : (
                          <React.Fragment>
                            {moment(item.dateAt).isSameOrBefore(
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
                                  this.handleRegisterEvent(item._id);
                                }}
                              >
                                Register
                              </Button>
                            )}
                          </React.Fragment>
                        )}
                      </Col>
                    </Row>
                    <br />
                    {/* Event Detail Information  Start*/}
                    {this.state.detailIndex === index &&
                    this.state.detailOption ? (
                      <EventDetail event={item} />
                    ) : null}
                    {/* Event Detail Information  Start*/}
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
                  No Events Found..{" "}
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
              <Spin tip="Loading Events..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
