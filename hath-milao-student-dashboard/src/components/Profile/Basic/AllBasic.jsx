import React, { Component } from "react";
import { Row, CardBody } from "reactstrap";

export default class AllBasic extends Component {
  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-0 pt-md-4">
          <Row>
            <div className="col">
              <div className="card-profile-stats d-flex justify-content-center mt-md-5 github-logo-setting" />
            </div>
          </Row>
          <div className="text-center">
            <h3>{this.props.profile.name}</h3>
            <div className="h5 font-weight-300">
              <i className="ni location_pin mr-2" />
              {this.props.profile.city}, {this.props.profile.country}
            </div>
            <div className="h5 ">
              <i className="ni business_briefcase-24 mr-2" />
              {this.props.profile.headline}
            </div>
            <div className="h5 font-weight-300 email-text">
              <i className="fa fa-envelope" />
              &nbsp;
              {this.props.user.user.email}
            </div>
            <div className="h5 font-weight-300">
              <i className="fa fa-mobile" />
              &nbsp;
              {this.props.profile.phonenumber}
            </div>
            <div>
              <a
                target="_blank"
                href={this.props.profile.githublink}
                rel="noopener noreferrer"
              >
                <i className="fab fa-github github" />
              </a>
            </div>
            <hr className="my-4" />
            <p>{this.props.profile.summary}</p>
          </div>
        </CardBody>
      </React.Fragment>
    );
  }
}
