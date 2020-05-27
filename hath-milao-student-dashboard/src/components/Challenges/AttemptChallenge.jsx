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
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Alert
} from "reactstrap";

import Moment from "react-moment";
import moment from "moment";

import ChallengeDetail from "./ChallengeDetail";
import { getCurrentUser } from "../../services/auth.service";

//Services
import {
  AllAttemptChallenge,
  CancelAttemptChallenge,
  UploadSolution as Solution
} from "../../services/challenege.service";

import Ratings from "react-ratings-declarative";
import { Spin, message } from "antd";

export default class AttemptChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOption: false,
      detailIndex: null,
      totalPages: null,
      currentPage: 1,
      docs: null,
      pages: null,
      modal: false,
      challengeid: null,
      description: "",
      visible: false,
      userid: "",
      Loading: false,
      todayDate: null,
      challengeSubmissionId: null
    };
  }

  //   Initail Request
  componentDidMount() {
    const user = getCurrentUser();
    let m = moment().utcOffset(0);
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    m.toISOString();
    m.format();
    const today = m.toISOString();

    this.setState({
      userid: user.user.id,
      Loading: false
    });

    AllAttemptChallenge(1)
      .then(response => {
        const pages = [];
        const totalPages = response.data.challenges.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.challenges.page,
          docs: response.data.challenges.docs,
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
    AllAttemptChallenge(index)
      .then(response => {
        this.setState({
          docs: response.data.challenges.docs,
          currentPage: response.data.challenges.page,
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
        if (e.response.data) {
          console.log(e);
        }
      });
  };

  //   To Handle Detail Option
  handleClick = index => {
    this.setState(prevState => ({
      detailOption: !prevState.detailOption,
      detailIndex: index
    }));
  };

  // Handle Cancel Challenge
  handleCancelChallenge = challengeid => {
    CancelAttemptChallenge(challengeid)
      .then(res => {
        let old_challenges = this.state.docs;
        let new_docs = old_challenges.filter(item => {
          return item._id != challengeid;
        });
        this.setState({
          docs: new_docs
        });
        message.success("Challenge Cancelled Successfully");
      })
      .catch(err => {
        message.error("Something Wrong! Try Again");
      });
  };

  //   Handle Upload Solution
  uploadSolution = () => {
    if (this.state.description.length > 8) {
      Solution(this.state.description, this.state.challengeSubmissionId);
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
      message.success("Challenge Solution Uploaded Successfully");
    } else {
      this.setState({
        visible: true
      });
    }
  };

  //   To handle Model
  toggle = id => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      challengeSubmissionId: id
    }));
  };

  // To Handle Form Input
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // For Showing Error
  onDismiss = () => {
    this.setState({ visible: false });
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
                        <p className="h4 m-0">{item.title}</p>
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

                      <Col md="4" className="text-center">
                        <Ratings
                          widgetDimensions="25px"
                          widgetSpacings="5px"
                          widgetRatedColors="yellow"
                          rating={
                            item.challengesubmission.filter(
                              subitem => subitem.studentid === this.state.userid
                            )[0].rating
                          }
                        >
                          <Ratings.Widget widgetHoverColor="yellow" />
                          <Ratings.Widget widgetHoverColor="yellow" />
                          <Ratings.Widget widgetHoverColor="yellow" />
                          <Ratings.Widget widgetHoverColor="yellow" />
                          <Ratings.Widget widgetHoverColor="yellow" />
                        </Ratings>
                      </Col>

                      {item.challengesubmission.filter(
                        subitem => subitem.studentid === this.state.userid
                      )[0].rating === 0 ? (
                        <Col md="3" className="text-center">
                          <Button
                            color="danger"
                            size="sm"
                            type="button"
                            onClick={() => {
                              this.handleCancelChallenge(item._id);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            color="success"
                            size="sm"
                            type="button"
                            onClick={() => {
                              this.toggle(item._id);
                            }}
                          >
                            Upload Solution
                          </Button>
                        </Col>
                      ) : (
                        <React.Fragment>
                          <Col
                            md="2"
                            className="text-center capital-first-word text-success"
                          >
                            congratulations &nbsp;
                            <i className="fas fa-hand-peace"></i>
                          </Col>
                        </React.Fragment>
                      )}
                    </Row>
                    <br />
                    {/* Challenge Detail Information  Start*/}

                    {this.state.detailIndex === index &&
                    this.state.detailOption ? (
                      <ChallengeDetail challenge={item} />
                    ) : null}

                    {/* Challenge Detail Information  Start*/}
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

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalBody>
                    <Form>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Label>
                              <h5> Upload Solution Link:</h5>
                            </Label>
                            <Input
                              type="textarea"
                              row="3"
                              onChange={this.handleInputChange}
                              placeholder="Put Link Here"
                              name="description"
                            ></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12" className="text-right">
                          <Alert
                            color="danger"
                            isOpen={this.state.visible}
                            toggle={this.onDismiss}
                            className="text-left"
                          >
                            Please Insert The Link !!
                          </Alert>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={this.uploadSolution}
                          >
                            Submit
                          </Button>
                          <Button
                            color="secondary"
                            size="sm"
                            onClick={this.toggle}
                          >
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </ModalBody>
                </Modal>
              </CardBody>
            ) : (
              <CardBody>
                <h1>
                  No Challenge Found..{" "}
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
              <Spin tip="Loading Attempted Challenges..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
