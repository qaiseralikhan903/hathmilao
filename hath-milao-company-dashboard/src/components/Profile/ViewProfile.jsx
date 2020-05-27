import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

import { ViewCompany } from "../../services/company.service.js";
import config from "../../util/config.json";
import { Spin } from "antd";

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      setting: false,
      userdata: null,
      selectedImage: "",
      loading: false
    };
  }

  componentDidMount() {
    ViewCompany()
      .then(response => {
        if (response.data.userData.imageurl) {
          this.setState({
            userdata: response.data.userData,
            selectedImage: `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${response.data.userData.imageurl}`,
            loading: true
          });
        } else {
          this.setState({
            userdata: response.data.userData,
            selectedImage:
              "https://www.putneyhigh.gdst.net/wp-content/uploads/2018/06/person-placeholder-male-5.jpg",
            loading: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.forceUpdate();
  }

  onSetting = () => {
    this.setState(
      state => {
        state.setting = true;
      },
      () => {
        this.props.methodfromparent(this.state.setting);
      }
    );
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <Container className="mt--7" fluid>
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <img
                          alt="..."
                          className="profile-pic"
                          src={this.state.selectedImage}
                        />
                      </div>
                    </Col>
                  </Row>
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4" />
                  <CardBody className="pt-0 pt-md-4">
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          {/* <div>
                          <span className="heading">10</span>
                          <span className="description">Followers</span>
                        </div> */}
                        </div>
                      </div>
                    </Row>
                    <div className="text-center">
                      <h3>{this.state.userdata.name}</h3>

                      <div className="h5 font-weight-300">
                        {this.state.userdata.industry}
                      </div>

                      <div className="h5 font-weight-300">
                        <span>
                          Employees: &nbsp;
                          <span>
                            {this.state.userdata.minemployees}
                            &nbsp; - &nbsp;
                            {this.state.userdata.maxemployees}
                          </span>
                        </span>
                      </div>

                      <div className="h5 font-weight-300">
                        <span>
                          <i className="fa fa-envelope text-blue" />
                          &nbsp;
                          <span className="text-blue">
                            {this.props.user.email}
                          </span>
                        </span>
                      </div>

                      <div className="h5 font-weight-300">
                        <span>
                          <i className="fa fa-mobile" />
                          &nbsp;{this.state.userdata.phonenumber}
                        </span>
                      </div>

                      {/* <div className="h5 font-weight-300">
                        <span>
                          {(this.state.userdata.city || []).map(
                            (item, index) => (
                              <span key={index} className="capital-first-word">
                                {item}
                                {this.state.userdata.city.length ===
                                index + 1 ? null : (
                                  <span key={index}>, &nbsp;</span>
                                )}
                              </span>
                            )
                          )}
                        </span>
                      </div>

                      <div className="h5 font-weight-300">
                        <span>
                          {(this.state.userdata.country || []).map(
                            (item, index) => (
                              <span key={index} className="capital-first-word">
                                {item}
                                {this.state.userdata.country.length ===
                                index + 1 ? null : (
                                  <span key={index}>, &nbsp;</span>
                                )}
                              </span>
                            )
                          )}
                        </span>
                      </div>
                     */}
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">My Account</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick={this.onSetting}
                          size="sm"
                        >
                          Settings
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <h3>Description:</h3>
                    <p className="text-justify">
                      <small
                        dangerouslySetInnerHTML={{
                          __html: this.state.userdata.description
                        }}
                      />
                    </p>
                    <hr className="my-4" />
                    <h3>Specialities:</h3>
                    <p>
                      <small>
                        {(this.state.userdata.specialties || []).map(
                          (item, index) => (
                            <span key={index} className="display-tag">
                              {item} &nbsp;
                            </span>
                          )
                        )}
                      </small>
                    </p>
                    <hr className="my-4" />
                    <h3>Others:</h3>
                    <p>
                      <small>
                        <span>
                          Email: &nbsp;{" "}
                          <span className="text-blue">
                            {this.props.user.email}
                          </span>
                        </span>
                      </small>
                    </p>
                    <p>
                      <small>
                        <span>
                          Phone Number: &nbsp;{this.state.userdata.phonenumber}
                        </span>
                      </small>
                    </p>

                    <p>
                      <small>
                        <span>
                          Cities: &nbsp;
                          {(this.state.userdata.city || []).map(
                            (item, index) => (
                              <span key={index} className="capital-first-word">
                                {item}
                                {this.state.userdata.city.length ===
                                index + 1 ? null : (
                                  <span key={index}>, &nbsp;</span>
                                )}
                              </span>
                            )
                          )}
                        </span>
                      </small>
                    </p>
                    <p>
                      <small>
                        <span>
                          Countries: &nbsp;
                          {(this.state.userdata.country || []).map(
                            (item, index) => (
                              <span key={index} className="capital-first-word">
                                {item}
                                {this.state.userdata.country.length ===
                                index + 1 ? null : (
                                  <span key={index}>, &nbsp;</span>
                                )}
                              </span>
                            )
                          )}
                        </span>
                      </small>
                    </p>
                    <p>
                      <small>
                        <span>
                          Employees: &nbsp;
                          <span>
                            {this.state.userdata.minemployees}
                            &nbsp; - &nbsp;
                            {this.state.userdata.maxemployees}
                          </span>
                        </span>
                      </small>
                    </p>
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
