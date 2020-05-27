import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";

import Moment from "react-moment";

import EditExperience from "./EditExperience";

// Services
import { DeleteExperience } from "../../../services/profile/Experience.service";
import { message, Popconfirm } from "antd";

export default class AllExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: null,
      Edit: false,
      EditIndex: null,
      loading: false
    };
  }

  componentDidMount() {
    const ReverseExperience = this.props.profile.experience.reverse();

    this.setState({
      experience: ReverseExperience,
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

  handleDeleteButton = experienceid => {
    DeleteExperience(experienceid)
      .then(response => {
        const myexperience = this.state.experience;
        let new_experience = myexperience.filter(item => {
          return item._id != experienceid;
        });
        this.setState({
          experience: new_experience
        });
        message.success("Experience Delete Successfully");
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
            {(this.state.experience || []).map((item, index) => (
              <Col key={index} md="12">
                <div className="h2 mb-0">
                  {item.title}
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
                <p className="mb-0 h4">{item.company}</p>
                <p className="mb-0">
                  <small>
                    {item.city} , {item.country}
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

                    {item.enddate === null ? (
                      "Not Mentioned"
                    ) : (
                      <Moment format="YYYY/MM/DD">{item.enddate}</Moment>
                    )}
                  </small>
                </p>
                <p className="mb-0 preserve-spaces">
                  <small>
                    <strong>Description:</strong>
                    {item.description}
                  </small>
                </p>
                {this.state.Edit && this.state.EditIndex === index ? (
                  <EditExperience experience={item} />
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
