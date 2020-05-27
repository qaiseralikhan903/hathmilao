import React, { Component } from "react";
// reactstrap components
import {
  Row,
  CardBody,
  Col,
  PaginationItem,
  PaginationLink,
  Button,
  Pagination
} from "reactstrap";

// Service
import { RecommendedStudents } from "../../services/student.service";

// Components
import SingleStudent from "./SingleStudent.jsx";
import Spin from "antd/lib/spin";

export default class RecommendedStudent extends Component {
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
      contacts: null
    };
  }

  componentDidMount() {
    this.setState({
      Loading: false
    });
    RecommendedStudents(1)
      .then(response => {
        const pages = [];
        const totalPages = response.data.students.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.students.page,
          docs: response.data.students.docs,
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
    RecommendedStudents(index)
      .then(response => {
        this.setState({
          docs: response.data.students.docs,
          currentPage: response.data.students.page,
          contacts: response.data.studentContacts,
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
        if (e) {
          console.log(e);
        }
      });
  };

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
          <React.Fragment>
            {this.state.docs.length > 0 ? (
              <CardBody>
                {(this.state.docs || []).map((item, index) => (
                  <React.Fragment key={index}>
                    {item.skill.length !== 0 ? (
                      <React.Fragment>
                        <Row className="shadow--hover job-box">
                          <Col
                            md="3"
                            onClick={() => {
                              this.handleClick(index);
                            }}
                          >
                            <p className="h4 m-0">{item.name}</p>
                          </Col>
                          <Col md="3" className="capital-first-word">
                            {item.headline}
                          </Col>
                          <Col md="6">
                            {(item.skill || []).map((subitem, subindex) => (
                              <span key={subindex} className="skill-tag">
                                {subitem}
                              </span>
                            ))}
                          </Col>
                        </Row>
                        <br />
                        {/* Student Detail Information  Start*/}

                        {this.state.detailIndex === index &&
                        this.state.detailOption ? (
                          <SingleStudent
                            student={item}
                            {...this.props}
                            studentContact={this.state.contacts}
                          />
                        ) : null}

                        {/* Student Detail Information  Start*/}
                      </React.Fragment>
                    ) : null}
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
                  No Students Found..{" "}
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
              <Spin tip="Loading Recommended Students..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
