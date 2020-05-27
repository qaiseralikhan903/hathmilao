import React, { Component } from "react";
import ReactDatetime from "react-datetime";
import Joi from "@hapi/joi";

import {
  Button,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert
} from "reactstrap";

// Validation Schema
import ExperienceSchema from "../../../validationSchemas/User/ExperienceSchema";

// Services
import { EditExperience as Edit_Experience } from "../../../services/profile/Experience.service";
import { message } from "antd";

export default class EditExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      company: "",
      city: "",
      country: "",
      startdate: "",
      enddate: "",
      description: "",
      loading: false,
      error: "None",
      visible: false,
      buttonDisabled: false
    };
  }

  componentWillMount() {
    const { experience } = this.props;

    this.setState({
      id: experience._id,
      title: experience.title,
      company: experience.company,
      city: experience.city,
      country: experience.country,
      startdate: experience.startdate,
      enddate: experience.enddate,
      description: experience.description,
      loading: true
    });
  }

  // To Handle Form Input
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Handle Start Date Change
  handleStartDateChange = newdate => {
    newdate = newdate._d.toISOString();

    this.setState({
      startdate: newdate
    });
  };

  // Handle End Date Change
  handleEndDateChange = newdate => {
    newdate = newdate._d.toISOString();

    this.setState({
      enddate: newdate
    });
  };

  //   ALert Handler
  onDismiss = () => {
    this.setState({ visible: false });
  };

  //  Edit Experience Form Handler

  EditExperienceFormHandler = event => {
    event.preventDefault();

    this.setState({
      buttonDisabled: true
    });
    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, ExperienceSchema, (err, value) => {
      if (err === null) {
        let data = this.state;
        Edit_Experience(data)
          .then(response => {
            message.success("Experience Information Updated Successfully");

            window.location.reload();
          })
          .catch(e => {
            if (e) {
              console.log(e);
              this.setState({
                error: "Something Wrong!!",
                visible: true,
                buttonDisabled: false
              });
            }
          });
      } else {
        this.setState({
          error: err.details[0].message,
          visible: true,
          buttonDisabled: false
        });
      }
    }); // err === null -> valid
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <CardBody className="shadow job-box mt-3">
            <Form>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label for="institution">
                      <h4>Designation Name:</h4>
                    </Label>
                    <Input
                      name="title"
                      placeholder="Designation Name"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label for="institution">
                      <h4>Comapny Name:</h4>
                    </Label>
                    <Input
                      name="company"
                      placeholder="Company Name"
                      value={this.state.company}
                      onChange={this.handleInputChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="field">
                      <h4>City: </h4>
                    </Label>
                    <Input
                      name="city"
                      placeholder="City"
                      value={this.state.city}
                      onChange={this.handleInputChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="field">
                      <h4>Country: </h4>
                    </Label>
                    <Input
                      name="country"
                      placeholder="Country"
                      value={this.state.country}
                      onChange={this.handleInputChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label for="startdate">
                      <h4>Start Date:</h4>
                    </Label>
                    <InputGroup className="input-group-alternative date-input">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Start Date"
                        }}
                        utc={true}
                        defaultValue={this.state.startdate}
                        timeFormat={false}
                        onChange={this.handleStartDateChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label for="enddate">
                      <h4>End Date:</h4>
                    </Label>
                    <InputGroup className="input-group-alternative date-input">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "End Date"
                        }}
                        utc={true}
                        defaultValue={this.state.enddate}
                        timeFormat={false}
                        onChange={this.handleEndDateChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label for="description">
                      <h4>Description:</h4>
                    </Label>
                    <Input
                      name="description"
                      placeholder="Description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      type="textarea"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <Alert
                    color="danger"
                    isOpen={this.state.visible}
                    toggle={this.onDismiss}
                  >
                    {this.state.error}
                  </Alert>
                  <FormGroup>
                    <Button
                      className="btn-icon btn-3"
                      color="primary"
                      type="button"
                      disabled={this.state.buttonDisabled}
                      onClick={this.EditExperienceFormHandler}
                    >
                      {this.state.buttonDisabled ? (
                        <span className="btn-inner--icon">
                          <i className="fas fa-circle-notch fa-spin"></i>
                        </span>
                      ) : null}
                      <span className="btn-inner--text">Update Experience</span>
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        ) : (
          <h1>Loading...</h1>
        )}
      </React.Fragment>
    );
  }
}
