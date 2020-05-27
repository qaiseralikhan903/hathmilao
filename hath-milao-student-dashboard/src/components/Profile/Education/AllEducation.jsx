import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";

import Moment from "react-moment";

import EditEducation from "./EditEducation";

// Services
import { DeleteEducation } from "../../../services/profile/Education.service";
import { Popconfirm, message } from "antd";

export default class AllEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      education: null,
      Edit: false,
      EditIndex: null,
      loading: false
    };
  }

  componentDidMount() {
    const ReverseEducation = this.props.profile.education.reverse();

    this.setState({
      education: ReverseEducation,
      loading: true
    });
  }

  // Show edit page
  handleEditPage = index => {
    this.setState(prevState => ({
      Edit: !prevState.Edit,
      EditIndex: index
    }));
  };

  // Delete Button Logic

  handleDeleteButton = educationid => {
    DeleteEducation(educationid)
      .then(response => {
        const myeducation = this.state.education;
        let new_education = myeducation.filter(item => {
          return item._id != educationid;
        });
        this.setState({
          education: new_education
        });
        message.success("Education Delete Successfully");
      })
      .catch(err => {
        message.error("Something Wrong! Try Again");
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <Row>
            {(this.state.education || []).map((item, index) => (
              <Col key={index} md="12">
                <div className="h2">
                  {item.institution}, {item.campus}
                  <span>
                    <Popconfirm
                      title="Are you sure delete this?"
                      onConfirm={() => {
                        this.handleDeleteButton(item._id);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        color="danger"
                        size="sm"
                        type="button"
                        className="float-right"
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Popconfirm>

                    {this.state.Edit && this.state.EditIndex === index ? (
                      <Button
                        color="default"
                        size="sm"
                        type="button"
                        className="float-right mr-1"
                        onClick={() => {
                          this.handleEditPage(index);
                        }}
                      >
                        Close
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        size="sm"
                        type="button"
                        className="float-right mr-1"
                        onClick={() => {
                          this.handleEditPage(index);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                  </span>
                </div>
                <p className="mb-0">
                  <small>
                    {item.degree} , {item.field}
                  </small>
                </p>
                <p className="mb-0">
                  <small>
                    <strong>Start Date:&nbsp;</strong>
                    <Moment format="YYYY/MM/DD">{item.startdate}</Moment>
                  </small>
                </p>
                <p className="mb-0">
                  <small>
                    <strong>End Date: &nbsp;</strong>

                    <Moment format="YYYY/MM/DD">{item.enddate}</Moment>
                  </small>
                </p>
                <p className="mb-0 preserve-spaces">
                  <small>
                    <strong>Description:</strong>
                    {item.description}
                  </small>
                </p>
                {this.state.Edit && this.state.EditIndex === index ? (
                  <EditEducation education={item} />
                ) : null}
                <hr />
              </Col>
            ))}
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
