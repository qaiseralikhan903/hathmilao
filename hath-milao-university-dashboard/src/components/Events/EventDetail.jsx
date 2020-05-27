import React from "react";
// reactstrap components
import { Row, Col } from "reactstrap";

import Moment from "react-moment";

export default class EventDetail extends React.Component {
  render() {
    return (
      <>
        <Row className="shadow--hover job-box">
          <Col md="8">
            <h4>
              <span className="capital-first-word">
                {this.props.event.title}
              </span>
            </h4>

            <h5>
              <span className="capital-first-word">
                {this.props.event.createdBy}
              </span>
            </h5>
            <h5>
              Venue:{" "}
              <span className="capital-first-word">
                {this.props.event.venue}
              </span>
            </h5>

            <hr className="m-0" />
            <h4>Description: </h4>
            <p className="text-justify">
              <small
                dangerouslySetInnerHTML={{
                  __html: this.props.event.description
                }}
              />
            </p>
          </Col>
          <Col md="4">
            <Row>
              <h4>Event Type:</h4>
            </Row>

            <Row>
              <h5 className="skill-tag">{this.props.event.eventType}</h5>
            </Row>

            <Row>
              <h4>Related Fields:</h4>
            </Row>

            <Row>
              {(this.props.event.field || []).map((item, index) => (
                <h5 key={index} className="skill-tag">
                  {item}
                </h5>
              ))}
            </Row>

            <Row>
              <h4>Event Details: </h4>
            </Row>
            <Row>
              <Col md="7" xs="7">
                <h5>Date At</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  <Moment format="YYYY/MM/DD">{this.props.event.dateAt}</Moment>
                </h5>
              </Col>

              <Col md="7" xs="7">
                <h5>Start Time</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">{this.props.event.startTime}</h5>
              </Col>

              <Col md="7" xs="7">
                <h5>End Time</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">{this.props.event.endTime}</h5>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
      </>
    );
  }
}
