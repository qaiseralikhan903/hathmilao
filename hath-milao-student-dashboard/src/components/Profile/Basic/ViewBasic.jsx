import React, { Component } from "react";
import { Row, Col, CardHeader, Button } from "reactstrap";

// Util
import config from "../../../util/config.json";

// Basic Components
import AllBasic from "./AllBasic";
import EditBasic from "./EditBasic";

export default class ViewBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BasicOption: "all",
      ImageSource: null
    };
  }

  componentDidMount() {
    if (this.props.profile.imageurl) {
      this.setState({
        ImageSource: `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${
          this.props.profile.imageurl
        }`
      });
    } else {
      this.setState({
        ImageSource:
          "https://www.putneyhigh.gdst.net/wp-content/uploads/2018/06/person-placeholder-male-5.jpg"
      });
    }
  }

  // Handle Add Basic Button
  onAddChange = () => {
    this.setState({
      BasicOption: "Edit"
    });
  };

  // Handle Back Buttton
  onBackChange = () => {
    this.setState({
      BasicOption: "All"
    });
  };

  render() {
    let show;
    if (this.state.BasicOption === "Edit") {
      show = <EditBasic {...this.props} />;
    } else {
      show = <AllBasic {...this.props} />;
    }

    return (
      <React.Fragment>
        {this.state.BasicOption === "Edit" ? (
          <CardHeader>
            <h3>
              Edit Basic Information:
              <Button
                color="default"
                size="sm"
                type="button"
                className="float-right"
                onClick={this.onBackChange}
              >
                Back
              </Button>
            </h3>
          </CardHeader>
        ) : (
          <React.Fragment>
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img
                      alt="..."
                      className="profile-pic"
                      src={this.state.ImageSource}
                    />
                  </a>
                </div>
              </Col>
            </Row>
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div className="d-flex float-right justify-content-between">
                <Button
                  className="float-right"
                  color="primary"
                  onClick={this.onAddChange}
                  size="sm"
                >
                  Edit
                </Button>
              </div>
            </CardHeader>
          </React.Fragment>
        )}
        {show}
      </React.Fragment>
    );
  }
}
