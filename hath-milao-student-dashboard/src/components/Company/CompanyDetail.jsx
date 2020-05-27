import React from "react";
// reactstrap components
import { Row, Col, Button } from "reactstrap";

import config from "../../util/config.json";
// Services
import {
  FollowCompany,
  UnFollowCompany,
  AddToContact
} from "../../services/company.service";
import { sb } from "../../util/chat.init.js";
import { message } from "antd";

export default class CompanyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL:
        "https://www.putneyhigh.gdst.net/wp-content/uploads/2018/06/person-placeholder-male-5.jpg",

      companyid: "",
      userid: "",
      follow: "",
      contact: ""
    };
  }

  componentWillMount() {
    const userid = this.props.user.user.id;
    const companyid = this.props.company.userid;

    sb.connect(userid, (user, err) => {
      if (err) {
        console.log(err);
        return;
      }
      sb.reconnect();
    });
    let checkFollow = this.props.company.followers.includes(userid);
    let checkContact = this.props.companyContact.includes(companyid);

    if (this.props.company.imageurl) {
      this.setState({
        imageURL: `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${this.props.company.imageurl}`,
        companyid: this.props.company.userid,
        userid: userid,
        follow: checkFollow,
        contact: checkContact
      });
    }
  }

  handleFollowCompany = () => {
    FollowCompany(this.state.companyid);
    message.success("Follow Successfully");
    window.location.reload(true);
  };

  handleUnFollowCompany = () => {
    UnFollowCompany(this.state.companyid);
    message.success("UnFollow Successfully");
    window.location.reload(true);
  };

  handleAddToContact = () => {
    AddToContact(this.state.companyid);
    const isOneToOne = true;
    const { userid, companyid } = this.state;
    console.log("User: ", userid);
    console.log("Company ID: ", companyid);
    sb.GroupChannel.createChannelWithUserIds(
      [userid, companyid],
      isOneToOne,
      (conversation, error) => {
        if (!error) {
          message.success("Contact Added Successfully");
          window.location.reload(true);
        } else {
          console.log(error);
        }
      }
    );
  };

  render() {
    return (
      <>
        <Row className="shadow--hover job-box">
          <Col md="4">
            <Row className="mb-1">
              <Col md="2" sm="0" xs="0" />
              <Col md="8">
                <img
                  src={this.state.imageURL}
                  alt="Profile company"
                  className="profile-pic img-fluid rounded shadow "
                />
              </Col>
              <Col md="2" sm="0" xs="0" />
            </Row>
            <hr className="mt-2 mb-2" />
            <h3>{this.props.company.name}</h3>
            <hr className="mt-2 mb-2" />
            <h4 className="mt-1 mb-0">City:</h4>
            {(this.props.company.city || []).map((item, index) => (
              <h5 key={index} className="skill-tag">
                {item}
              </h5>
            ))}
            <h4 className="mt-1 mb-0">Country:</h4>
            {(this.props.company.country || []).map((item, index) => (
              <h5 key={index} className="skill-tag">
                {item}
              </h5>
            ))}
            <h4 className="mt-1 mb-0">Specialties:</h4>
            {(this.props.company.specialties || []).map((item, index) => (
              <h5 key={index} className="skill-tag">
                {item}
              </h5>
            ))}
            <h4 className="mt-1 mb-0">Contact:</h4>
            <small>{this.props.company.phonenumber}</small>
            <h4 className="mt-1 mb-0">Links:</h4>
            <a
              target="_blank"
              href={"http://" + this.props.company.websiteurl}
              rel="noopener noreferrer"
            >
              <i className="fa fa-globe github" />
            </a>
          </Col>
          <Col md="8">
            <h4>
              {this.state.follow ? (
                <Button
                  color="danger"
                  type="button"
                  size="sm"
                  onClick={this.handleUnFollowCompany}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  color="primary"
                  type="button"
                  size="sm"
                  onClick={this.handleFollowCompany}
                >
                  Follow
                </Button>
              )}

              {this.state.contact ? (
                <span className="mr-1 badge badge-success contact">
                  Already in Contact <i className="fa fa-check"></i>
                </span>
              ) : (
                <Button
                  color="primary"
                  type="button"
                  size="sm"
                  onClick={this.handleAddToContact}
                >
                  Add to Contact
                </Button>
              )}
            </h4>

            <hr className="mt-1 mb-1" />

            <h4>
              Description:
              <p
                className="mb-0"
                dangerouslySetInnerHTML={{
                  __html: this.props.company.description
                }}
              />
            </h4>
            <hr className="mt-1 mb-1" />
          </Col>
        </Row>
        <br />
      </>
    );
  }
}
