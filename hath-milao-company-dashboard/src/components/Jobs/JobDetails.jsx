import React from "react";
// reactstrap components
import { Row, Col } from "reactstrap";

import Moment from "react-moment";

class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobid: ""
    };
  }
  render() {
    return (
      <>
        <Row className="shadow--hover job-box">
          <Col md="8">
            <h4>{this.props.job.title}</h4>

            <h5>
              PKR {this.props.job.minsalary} - {this.props.job.maxsalary}{" "}
            </h5>
            <hr className="m-0" />
            <h4>Description: </h4>
            <p className="text-justify">
              <small
                dangerouslySetInnerHTML={{
                  __html: this.props.job.description
                }}
              />
            </p>
          </Col>
          <Col md="4">
            <Row>
              <h4>Skills:</h4>
            </Row>
            <Row>
              {(this.props.job.requiredSkill || []).map((item, index) => (
                <h5 key={index} className="skill-tag">
                  {item}
                </h5>
              ))}
            </Row>

            <Row>
              <h4>Field:</h4>
            </Row>

            <Row>
              {(this.props.job.field || []).map((item, index) => (
                <h5 key={index} className="skill-tag">
                  {item}
                </h5>
              ))}
            </Row>

            <Row>
              <h4>Job Details: </h4>
            </Row>
            <Row>
              <Col md="7" xs="7">
                <h5>Job Type</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted capital-first-word">
                  {this.props.job.jobType}
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Minimum Experience</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  {this.props.job.minexperience}-Year
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Maximum Experience</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  {this.props.job.maxexperience}-Year
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Total Position</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">{this.props.job.totalposition}</h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Apply Before</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  <Moment format="YYYY/MM/DD">
                    {this.props.job.applybefore}
                  </Moment>
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Posted Date</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  <Moment format="YYYY/MM/DD">
                    {this.props.job.postingdate}
                  </Moment>
                </h5>
              </Col>

              <Col md="7" xs="7">
                <h5>City</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  {(this.props.job.city || []).map((item, index) => (
                    <span key={index} className="capital-first-word ">
                      {item}
                      {this.props.job.city.length === index + 1 ? null : (
                        <span key={index}>,</span>
                      )}
                    </span>
                  ))}
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Country</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">
                  {(this.props.job.country || []).map((item, index) => (
                    <span key={index} className="capital-first-word ">
                      {item}
                      {this.props.job.country.length === index + 1 ? null : (
                        <span key={index}>,</span>
                      )}
                    </span>
                  ))}
                </h5>
              </Col>
              <Col md="7" xs="7">
                <h5>Required Degree</h5>
              </Col>
              <Col md="5" xs="5">
                <h5 className="text-muted">{this.props.job.requireddegree}</h5>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
      </>
    );
  }
}

export default JobDetails;
