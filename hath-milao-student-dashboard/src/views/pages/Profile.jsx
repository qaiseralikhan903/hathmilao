import React from "react";

import { Container, Row, Card, CardHeader, CardBody } from "reactstrap";

// core components
import Header from "components/Headers/Header.jsx";

//Profile Components
import ViewProfile from "../../components/Profile/ViewProfile";

import { ViewProfile as View_Profile } from "../../services/profile/Basic.service";
import { Spin } from "antd";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: false,
      profile: null,
      Loading: false
    };
  }

  componentDidMount() {
    View_Profile()
      .then(response => {
        this.setState({
          profile: response.data.userData,
          Loading: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        {this.state.Loading ? (
          <ViewProfile
            user={this.props.user.user}
            profile={this.state.profile}
            {...this.props}
          />
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
export default Profile;
