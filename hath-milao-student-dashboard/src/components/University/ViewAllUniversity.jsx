import React, { Component } from "react";
// reactstrap components
import { Row, CardBody, Col, Button } from "reactstrap";

// Service
import { ViewMyUniversities } from "../../services/university.service";

// Helper Components
import SingleUniversity from "./SingleUniversity.jsx";
import { Spin } from "antd";

export default class ViewAllUniversity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOption: false,
      detailIndex: null,
      docs: null,
      Loading: false,
      contacts: null
    };
  }

  componentDidMount() {
    this.setState({
      Loading: false
    });
    ViewMyUniversities()
      .then(response => {
        this.setState({
          docs: response.data.univeristies,
          contacts: response.data.universityContacts,
          Loading: true
        });
      })
      .catch(e => {
        if (e) {
          console.log(e);
        }
      });
  }

  // To handle Detail of Company
  handleClick = index => {
    this.setState(prevState => ({
      detailOption: !prevState.detailOption,
      detailIndex: index
    }));
  };

  render() {
    return (
      <>
        {this.state.Loading ? (
          <React.Fragment>
            {this.state.docs.length > 0 ? (
              <CardBody>
                {(this.state.docs || []).map((item, index) => (
                  <React.Fragment key={index}>
                    <Row className="shadow--hover job-box">
                      <Col
                        md="3"
                        onClick={() => {
                          this.handleClick(index);
                        }}
                      >
                        <p className="h4 m-0">{item.name}</p>
                      </Col>
                      <Col md="3" className="capital-first-word">
                        {item.city}
                      </Col>
                      <Col md="6">
                        {(item.field || []).map((subitem, subindex) => (
                          <span key={subindex} className="skill-tag">
                            {subitem}
                          </span>
                        ))}
                      </Col>
                    </Row>
                    <br />
                    {/* University Detail Information  Start*/}

                    {this.state.detailIndex === index &&
                    this.state.detailOption ? (
                      <SingleUniversity
                        university={item}
                        {...this.props}
                        universityContact={this.state.contacts}
                      />
                    ) : null}

                    {/* University Detail Information  Start*/}
                  </React.Fragment>
                ))}
              </CardBody>
            ) : (
              <CardBody>
                <h1>
                  No universities Found..{" "}
                  <Button
                    className="btn-icon btn-3"
                    color="primary"
                    type="button"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-sync" />
                    </span>
                    <span className="btn-inner--text">Refresh Page</span>
                  </Button>
                </h1>
              </CardBody>
            )}
          </React.Fragment>
        ) : (
          <CardBody>
            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px"
              }}
            >
              <Spin tip="Loading Universities..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
