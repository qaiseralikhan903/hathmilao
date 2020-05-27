import React, { Component } from "react";

import { Row, Col } from "reactstrap";

import Moment from "react-moment";
import config from "../../util/config.json";

export default class StudentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL:
        "https://www.putneyhigh.gdst.net/wp-content/uploads/2018/06/person-placeholder-male-5.jpg"
    };
  }

  componentWillMount() {
    if (this.props.student.imageurl) {
      this.setState({
        imageURL: `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${
          this.props.student.imageurl
        }`
      });
    }
  }

  render() {
    return (
      <>
        <Row className="shadow--hover job-box">
          <Col md="4">
            <h4 className="text-center">{this.props.student.name}</h4>
            <h5 className="text-center">{this.props.student.headline}</h5>
            <Row className="mb-1">
              <Col md="2" sm="0" xs="0" />
              <Col md="8">
                <img
                  src={this.state.imageURL}
                  alt="Profile Student"
                  className="profile-pic img-fluid rounded shadow "
                />
              </Col>
              <Col md="2" sm="0" xs="0" />
            </Row>
            <hr className="mt-2 mb-2" />
            <h4 className="mt-1 mb-0">Skills:</h4>
            {(this.props.student.skill || []).map((item, index) => (
              <h5 key={index} className="skill-tag">
                {item}
              </h5>
            ))}
            <h4 className="mt-1 mb-0">Languages:</h4>
            {(this.props.student.language || []).map((item, index) => (
              <h5 key={index} className="skill-tag">
                {item}
              </h5>
            ))}
            <h4 className="mt-1 mb-0">Address:</h4>
            <small>
              {this.props.student.city}, {this.props.student.country}
            </small>
            <h4 className="mt-1 mb-0">Contact:</h4>
            <small>{this.props.student.phonenumber}</small>
            <h4 className="mt-1 mb-0">Links:</h4>
            Github: &nbsp;
            <a
              target="_blank"
              href={this.props.student.githublink}
              rel="noopener noreferrer"
            >
              <i className="fab fa-github github" />
            </a>
          </Col>
          <Col md="8">
            {/* <h4>{this.props.student.name}</h4>
            <h5>{this.props.student.headline}</h5>
            <hr className="mt-1 mb-1" /> */}
            <h4>
              Profile Summary:
              <p className="mb-0">
                <small>{this.props.student.summary}</small>
              </p>
            </h4>
            <hr className="mt-1 mb-1" />

            <h4>
              Education:
              {(this.props.student.education || [])
                .reverse()
                .map((item, index) => (
                  <p key={index} className="mb-1">
                    <small>
                      <strong>
                        {item.institution}
                        <br />
                      </strong>
                      {item.degree} ,{item.field}
                      <br />
                      <Moment format="YYYY">{item.startdate}</Moment>,&nbsp;
                      <Moment format="YYYY">{item.enddate}</Moment>
                      <br />
                      {item.description}
                    </small>
                  </p>
                ))}
            </h4>
            <hr className="mt-1 mb-1" />

            <h4>
              Experience:
              {(this.props.student.experience || [])
                .reverse()
                .map((item, index) => (
                  <p key={index} className="mb-1">
                    <small>
                      <strong>
                        {item.title}
                        <br />
                      </strong>
                      {item.company}
                      <br />
                      {item.city} ,{item.country}
                      <br />
                      <Moment format="YYYY">{item.startdate}</Moment>,&nbsp;
                      <Moment format="YYYY">{item.enddate}</Moment>
                      <br />
                      {item.description}
                    </small>
                  </p>
                ))}
            </h4>
          </Col>
        </Row>
        <br />
      </>
    );
  }
}
