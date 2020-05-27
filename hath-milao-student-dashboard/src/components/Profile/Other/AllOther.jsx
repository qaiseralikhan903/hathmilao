import React, { Component } from "react";

import { Row, Col, Badge } from "reactstrap";

export default class AllOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      skill: null,
      language: null,
      cvurl: null,
      looking: null,
      desiredjob: null
    };
  }
  componentDidMount() {
    const { profile } = this.props;
    this.setState({
      skill: profile.skill,
      language: profile.language,
      cvurl: profile.cvurl,
      looking: profile.looking,
      desiredjob: profile.desiredjob,
      loading: true
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <Row>
            <Col md="12">
              <div className="h4">
                Skill:
                <br />
                {(this.state.skill || []).map((item, index) => (
                  <span key={index} className="skill-tag">
                    {item}
                  </span>
                ))}
              </div>
              <div className="h4">
                Language:
                <br />
                {(this.state.language || []).map((item, index) => (
                  <span key={index} className="skill-tag">
                    {item}
                  </span>
                ))}
              </div>

              <div className="h4">
                Looking For Job:&nbsp;
                {this.state.looking ? (
                  <Badge color="danger">Yes</Badge>
                ) : (
                  <Badge color="success">No</Badge>
                )}
              </div>

              <div className="h4">
                Desired Job:&nbsp;
                <p>{this.state.desiredjob}</p>
              </div>

              <hr />
            </Col>
          </Row>
        ) : (
          <Col>
            <h1>Loading....</h1>
          </Col>
        )}
      </React.Fragment>
    );
  }
}
