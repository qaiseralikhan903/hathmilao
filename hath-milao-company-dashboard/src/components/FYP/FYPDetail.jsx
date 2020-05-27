import React from "react";
// reactstrap components
import { Row, Col } from "reactstrap";

import Moment from "react-moment";

export default class FYPDetail extends React.Component {
  render() {
    return (
      <>
        <Row className="shadow--hover job-box">
          <Col md="8">
            <h3>{this.props.fyp.title}</h3>

            {/* <h5>{this.props.fyp.company}</h5> */}
            <hr className="m-0" />
            <h4>Description: </h4>
            <p className="text-justify">
              <small
                dangerouslySetInnerHTML={{
                  __html: this.props.fyp.description
                }}
              />
            </p>
          </Col>
          <Col md="4">
            <Row>
              <h4>Skills:</h4>
            </Row>
            <Row>
              {(this.props.fyp.requiredSkill || []).map((item, index) => (
                <h5 key={index} className="skill-tag">
                  {item}
                </h5>
              ))}
            </Row>

            <Row>
              <h4>Field:</h4>
            </Row>

            <Row>
              {(this.props.fyp.field || []).map((item, index) => (
                <h5 key={index} className="skill-tag">
                  {item}
                </h5>
              ))}
            </Row>

            <Row>
              <h4>FYP Details: </h4>
            </Row>
            <Row>
              <Col md="7" xs="7">
                <h5>Total Member</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted capital-first-word">
                  {this.props.fyp.teamMember}
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Apply Before</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  <Moment format="YYYY/MM/DD">
                    {this.props.fyp.applybefore}
                  </Moment>
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Posted Date</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  <Moment format="YYYY/MM/DD">
                    {this.props.fyp.postingdate}
                  </Moment>
                </h5>
              </Col>

              <Col md="7" xs="7">
                <h5>City</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  <span className="capital-first-word ">
                    {this.props.fyp.city}
                  </span>
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Country</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  <span className="capital-first-word ">
                    {this.props.fyp.country}
                  </span>
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Required Degree</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">{this.props.fyp.requireddegree}</h5>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
      </>
    );
  }
}
