import React from "react";
import classnames from "classnames";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane
} from "reactstrap";

// Profile Components
import ViewEducation from "./Education/ViewEducation";
import ViewExperience from "./Experience/ViewExperience";
import ViewOther from "./Other/ViewOther";
import ViewBasic from "./Basic/ViewBasic";
import { Spin } from "antd";

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: 1,
      loading: true
    };
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <Container className="mt--7" fluid>
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card className="card-profile shadow">
                  <ViewBasic {...this.props} />
                </Card>
              </Col>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h2 className="mb-0">My Account </h2>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="nav-wrapper">
                      <Nav
                        className="nav-fill flex-column flex-md-row"
                        id="tabs-icons-text"
                        pills
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            aria-selected={this.state.tabs === 1}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: this.state.tabs === 1
                            })}
                            onClick={e => this.toggleNavs(e, "tabs", 1)}
                            href="#pablo"
                            role="tab"
                          >
                            <i className="ni ni-hat-3  mr-2" />
                            Education
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-selected={this.state.tabs === 2}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: this.state.tabs === 2
                            })}
                            onClick={e => this.toggleNavs(e, "tabs", 2)}
                            href="#pablo"
                            role="tab"
                          >
                            <i className="ni ni-briefcase-24 mr-2" />
                            Experience
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-selected={this.state.tabs === 3}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: this.state.tabs === 3
                            })}
                            onClick={e => this.toggleNavs(e, "tabs", 3)}
                            href="#pablo"
                            role="tab"
                          >
                            <i className="ni ni-collection mr-2" />
                            Other
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                    <Card className="shadow">
                      <CardBody>
                        <TabContent activeTab={"tabs" + this.state.tabs}>
                          <TabPane tabId="tabs1">
                            <ViewEducation {...this.props} />
                          </TabPane>
                          <TabPane tabId="tabs2">
                            <ViewExperience {...this.props} />
                          </TabPane>
                          <TabPane tabId="tabs3">
                            <ViewOther {...this.props} />
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </Card>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container className=" mt--7" fluid>
            {/* Table */}
            <Row>
              <div className=" col">
                <Card className=" shadow">
                  <CardHeader className=" bg-transparent">
                    <h2 className="mb-0">My Account </h2>
                  </CardHeader>

                  <CardBody>
                    <div
                      style={{
                        textAlign: "center",
                        paddingTop: "20px",
                        paddingBottom: "20px"
                      }}
                    >
                      <Spin tip="Loading Profile..." size="large" />
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
export default ViewProfile;
