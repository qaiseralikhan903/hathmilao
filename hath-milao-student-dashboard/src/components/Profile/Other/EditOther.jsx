import React, { Component } from "react";
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
  Alert
} from "reactstrap";

// Helper Component
import MultipleArrayInput from "../../Helper/MultipleArrayInput";

// Validation Schema
import OtherSchema from "../../../validationSchemas/User/OtherSchema";

// Services
import { UpdateOther as Edit_Other } from "../../../services/profile/Other.service";
import { message } from "antd";

export default class EditOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: null,
      language: null,
      cvurl: null,
      looking: null,
      desiredjob: null,
      loading: false,
      error: "None",
      visible: false,
      buttonDisabled: false
    };
  }

  componentWillMount() {
    const { profile } = this.props;

    this.setState({
      skill: profile.skill,
      language: profile.language,
      cvurl: "Http://HElloWOrld.com/KalBilalKarayga",
      looking: profile.looking,
      desiredjob: profile.desiredjob,
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

  //Skill Array Function
  allSkills = data => {
    this.setState(state => {
      state.skill = data;
    });
  };

  //Language Array Function
  allLanguages = data => {
    this.setState(state => {
      state.language = data;
    });
  };

  //   ALert Handler
  onDismiss = () => {
    this.setState({ visible: false });
  };

  //  Edit Other Form Handler

  EditOtherFormHandler = event => {
    event.preventDefault();
    this.setState({
      buttonDisabled: true
    });
    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, OtherSchema, (err, value) => {
      if (err === null) {
        let data = this.state;
        console.log(data);
        Edit_Other(data)
          .then(response => {
            message.success("Information Added Successfully");
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
                    <Label for="skill">
                      <h4>Skills:</h4>
                    </Label>
                    <MultipleArrayInput
                      methodfromparent={this.allSkills}
                      array={this.state.skill}
                      placeHolderString="Multiple Skills"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label for="language">
                      <h4>Languages:</h4>
                    </Label>
                    <MultipleArrayInput
                      methodfromparent={this.allLanguages}
                      array={this.state.language}
                      placeHolderString="Multiple Languages"
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label for="desiredjob">
                      <h4>Desired Job:</h4>
                    </Label>
                    <Input
                      name="desiredjob"
                      placeholder="Desired Job"
                      value={this.state.desiredjob}
                      onChange={this.handleInputChange}
                      type="textarea"
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label for="looking">
                      <h4>Looking For Job:</h4>
                    </Label>

                    <label className="custom-radio">
                      <input
                        type="radio"
                        name="looking"
                        value="true"
                        checked={this.state.looking === "true"}
                        onChange={this.handleInputChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        name="looking"
                        value="false"
                        checked={this.state.looking === "false"}
                        onChange={this.handleInputChange}
                        type="radio"
                      />
                      No
                    </label>
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
                      onClick={this.EditOtherFormHandler}
                    >
                      {this.state.buttonDisabled ? (
                        <span className="btn-inner--icon">
                          <i className="fas fa-circle-notch fa-spin"></i>
                        </span>
                      ) : null}
                      <span className="btn-inner--text">Update </span>
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
