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
import EducationSchema from "../../../validationSchemas/User/EducationSchema.js";

// Services
import { EditEducation as Edit_Education } from "../../../services/profile/Education.service";
import { message } from "antd";

export default class EditEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      institution: "",
      campus: "",
      degree: "",
      field: "",
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
    const { education } = this.props;

    this.setState({
      id: education._id,
      institution: education.institution,
      campus: education.campus,
      degree: education.degree,
      field: education.field,
      startdate: education.startdate,
      enddate: education.enddate,
      description: education.description,
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

  //   Edit Education Form Handler

  EditEducationFormHandler = event => {
    event.preventDefault();

    this.setState({
      buttonDisabled: true
    });
    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, EducationSchema, (err, value) => {
      if (err === null) {
        let data = this.state;
        Edit_Education(data)
          .then(response => {
            message.success("Education Information Updated Successfully");
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
                      <h4>Institution Name:</h4>
                    </Label>
                    <Input
                      name="institution"
                      placeholder="Institution Name"
                      value={this.state.institution}
                      onChange={this.handleInputChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label for="campus">
                      <h4>Campus Name :</h4>
                    </Label>
                    <Input
                      name="campus"
                      placeholder="Campus(Islamabad, Lahore, etc)"
                      value={this.state.campus}
                      onChange={this.handleInputChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label for="degree">
                      <h4>Degree:</h4>
                    </Label>
                    <Input
                      name="degree"
                      placeholder="Degree Like BSCS,BSSE"
                      value={this.state.degree}
                      onChange={this.handleInputChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label for="field">
                      <h4>Field Name:</h4>
                    </Label>
                    <Input
                      name="field"
                      placeholder="Field Like Computer Science, Electrical Engineering"
                      value={this.state.field}
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
                        timeFormat={false}
                        defaultValue={this.state.startdate}
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
                      onClick={this.EditEducationFormHandler}
                    >
                      {this.state.buttonDisabled ? (
                        <span className="btn-inner--icon">
                          <i className="fas fa-circle-notch fa-spin"></i>
                        </span>
                      ) : null}
                      <span className="btn-inner--text">Update Education</span>
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
