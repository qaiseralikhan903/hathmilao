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

import EventDetail from "./EventDetail";

//Services
import { ViewAllJobFairs } from "../../services/event.service";
import { Spin } from "antd";

export default class JobFairs extends React.Component {
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

  componentDidMount() {
    let m = moment().utcOffset(0);
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    m.toISOString();
    m.format();
    const today = m.toISOString();

    this.setState({
      Loading: false
    });
    ViewAllJobFairs(1)
      .then(response => {
        const pages = [];
        const totalPages = response.data.events.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.events.page,
          docs: response.data.events.docs,
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
    ViewAllJobFairs(index)
      .then(response => {
        this.setState({
          docs: response.data.events.docs,
          currentPage: response.data.events.page,
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
                        <p className="h4 m-0 capital-first-word">
                          {item.title}
                        </p>
                      </Col>
                      <Col md="4" className="text-center ">
                        {item.createdBy}
                      </Col>

                      <Col md="2" className="text-center capital-first-word">
                        {moment(item.dateAt).isSameOrBefore(
                          this.state.today
                        ) ? (
                          <span className="text-danger">
                            <Moment format="YYYY/MM/DD">{item.dateAt}</Moment>
                          </span>
                        ) : (
                          <span className="text-success">
                            <Moment format="YYYY/MM/DD">{item.dateAt}</Moment>
                          </span>
                        )}
                      </Col>

                      <Col md="3" className="text-center">
                        {item.startTime} - {item.endTime}
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
              <Spin tip="Loading Job Fairs..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
