import React, { Component } from "react";

import { Row, Col, Button } from "reactstrap";

import config from "../../util/config.json";

import { AddToContactUniversity } from "../../services/chat.service";

import { sb } from "../../util/chat.init";

export default class SingleUniversity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL:
        "https://www.putneyhigh.gdst.net/wp-content/uploads/2018/06/person-placeholder-male-5.jpg",
      userid: "",
      universityid: "",
      contact: ""
    };
  }

  componentWillMount() {
    const studentid = this.props.user.user.id;
    const universityid = this.props.university.userid;

    sb.connect(universityid, (user, err) => {
      if (err) {
        console.log(err);
        return;
      }
      sb.reconnect();
    });

    let checkContact = this.props.universityContact.includes(universityid);

    if (this.props.university.imageurl) {
      this.setState({
        imageURL: `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${this.props.university.imageurl}`,
        contact: checkContact,
        universityid: universityid,
        userid: studentid
      });
    }
  }

  handleAddToContact = () => {
    AddToContactUniversity(this.state.universityid);
    const isOneToOne = true;
    const { userid, universityid } = this.state;

    sb.GroupChannel.createChannelWithUserIds(
      [userid, universityid],
      isOneToOne,
      (conversation, error) => {
        if (!error) {
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
                  alt="Profile University"
                  className="profile-pic img-fluid rounded shadow "
                />
              </Col>
              <Col md="2" sm="0" xs="0" />
            </Row>
            <hr className="mt-2 mb-2" />
            <h3>{this.props.university.name}</h3>
            <hr className="mt-2 mb-2" />
            <h4 className="mt-1 mb-0">City:</h4>
            <h5 className="skill-tag">{this.props.university.city}</h5>
            <h4 className="mt-1 mb-0">Country:</h4>
            <h5 className="skill-tag">{this.props.university.country}</h5>
            <h4 className="mt-1 mb-0">Field:</h4>
            {(this.props.university.field || []).map((item, index) => (
              <h5 key={index} className="skill-tag">
                {item}
              </h5>
            ))}
            <h4 className="mt-1 mb-0">Contact:</h4>
            <small>{this.props.university.phonenumber}</small>
            <h4 className="mt-1 mb-0">Links:</h4>
            <a
              target="_blank"
              href={"http://" + this.props.university.websiteurl}
              rel="noopener noreferrer"
            >
              <i className="fa fa-globe github" />
            </a>
          </Col>
          <Col md="8">
            <h4>
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
                  __html: this.props.university.description
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
