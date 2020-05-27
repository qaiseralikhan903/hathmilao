import React from "react";
// reactstrap components
import { Row, Col } from "reactstrap";

import Moment from "react-moment";

export default class ChallengeDetail extends React.Component {
  render() {
    return (
      <>
        <Row className="shadow--hover job-box">
          <Col md="8">
            <h4>{this.props.challenge.title}</h4>

            <h5>{this.props.challenge.company}</h5>
            <hr className="m-0" />
            <h4>Description: </h4>
            <p className="text-justify">
              <small
                dangerouslySetInnerHTML={{
                  __html: this.props.challenge.description
                }}
              />
            </p>
          </Col>
          <Col md="4">
            <Row>
              <h4>Skills:</h4>
            </Row>
            <Row>
              {(this.props.challenge.requiredSkill || []).map((item, index) => (
                <h5 key={index} className="skill-tag">
                  {item}
                </h5>
              ))}
            </Row>

            <Row>
              <h4>Field:</h4>
            </Row>

            <Row>
              {(this.props.challenge.field || []).map((item, index) => (
                <h5 key={index} className="skill-tag">
                  {item}
                </h5>
              ))}
            </Row>

            <Row>
              <h4>Challenge Details: </h4>
            </Row>
            <Row>
              <Col md="7" xs="7">
                <h5>Total Member</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted capital-first-word">
                  {this.props.challenge.teamMember}
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Apply Before</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  <Moment format="YYYY/MM/DD">
                    {this.props.challenge.applybefore}
                  </Moment>
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Posted Date</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  <Moment format="YYYY/MM/DD">
                    {this.props.challenge.postingdate}
                  </Moment>
                </h5>
              </Col>

              <Col md="7" xs="7">
                <h5>City</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  <span className="capital-first-word ">
                    {this.props.challenge.city}
                  </span>
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Country</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  <span className="capital-first-word ">
                    {this.props.challenge.country}
                  </span>
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Required Degree</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  {this.props.challenge.requireddegree}
                </h5>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
      </>
    );
  }
}
