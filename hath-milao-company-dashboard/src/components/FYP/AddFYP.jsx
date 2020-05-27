import React, { Component } from "react";

import ReactDatetime from "react-datetime";
import Joi from "@hapi/joi";
// reactstrap components
import {
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button,
  Alert,
  Label
} from "reactstrap";

// Text Editor  Imports
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { divStyle, editorDiv, options } from "../../util/EditorStyling";

//Core Components
import MultipleArrayInput from "../Helper/MultipleArrayInput.jsx";

// Validation Schema
import FYPSchema from "../../validationSchemas/FYP/AddFYPSchema.js";

import moment from "moment";

// Services
import { AddFYP as Add_FYP_Service } from "../../services/fyp.service";
import { getCurrentUser } from "../../services/auth.service";
import { message } from "antd";

export default class AddFYP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      company: "",
      title: "",
      description: "",
      applybefore: "",
      postingdate: "",
      requireddegree: "",
      requiredSkill: [],
      city: "",
      country: "",
      field: [],
      teamMember: 1,
      status: "active",
      error: "None",
      editorState: EditorState.createEmpty(),
      visible: false,
      buttonDisabled: false
    };
  }

  componentWillMount() {
    if (getCurrentUser()) {
      const { user } = getCurrentUser();
      this.setState({
        userid: user.id,
        company: user.username
      });
    }

    let m = moment().utcOffset(0);
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    m.toISOString();
    m.format();
    const today = m.toISOString();

    this.setState({
      postingdate: today
    });
  }

  // SKill Array Function
  allSkills = data => {
    this.setState(state => {
      state.requiredSkill = data;
    });
  };

  //Field Array Function
  allFields = data => {
    this.setState(state => {
      state.field = data;
    });
  };

  // To Handle Form Input
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // To Handle Text Editor
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
    let descHTML = stateToHTML(this.state.editorState.getCurrentContent());
    this.setState({
      description: descHTML
    });
  };

  // Handle Date Change
  handleDateChange = newdate => {
    newdate = newdate._d.toISOString();

    this.setState({
      applybefore: newdate
    });
  };

  // Add FYP Handler

  AddFYPFormHandler = event => {
    event.preventDefault();
    this.setState({
      buttonDisabled: true
    });
    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, FYPSchema, (err, value) => {
      if (err === null) {
        let data = this.state;
        Add_FYP_Service(data)
          .then(response => {
            message.success("Final Year Project Added Successfully");

            window.location.reload(true);
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

  // For Showing Error
  onDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <>
        <CardBody>
          <Form>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Project Title:</h5>
                  </Label>
                  <Input
                    name="title"
                    placeholder="Project Title"
                    onChange={this.handleInputChange}
                    type="text"
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>City:</h5>
                  </Label>
                  <Input
                    name="city"
                    placeholder="City"
                    type="text"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Country:</h5>
                  </Label>
                  <Input
                    name="country"
                    placeholder="Country"
                    type="text"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Label>
                  <h5>Required Skills:</h5>
                </Label>
                <MultipleArrayInput
                  methodfromparent={this.allSkills}
                  array={[]}
                  placeHolderString="Multiple Skills [5]"
                />
              </Col>

              <Col md="4">
                <Label>
                  <h5>Specific Fields:</h5>
                </Label>
                <MultipleArrayInput
                  methodfromparent={this.allFields}
                  array={[]}
                  placeHolderString="Multiple Fields Like IT, Banking"
                />
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Required Degree:</h5>
                  </Label>
                  <Input
                    name="requireddegree"
                    placeholder="Required Degree"
                    type="text"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Total Member:</h5>
                  </Label>
                  <Input
                    name="teamMember"
                    placeholder="Total Member"
                    type="number"
                    min="0"
                    max="10"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Apply Before:</h5>
                  </Label>
                  <InputGroup className="input-group-alternative date-input">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetime
                      inputProps={{
                        placeholder: "Apply Before"
                      }}
                      utc={true}
                      timeFormat={false}
                      onChange={this.handleDateChange}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>
                    <h5>Project Description :</h5>
                  </Label>
                  <Editor
                    wrapperStyle={divStyle}
                    editorStyle={editorDiv}
                    toolbar={{ options }}
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
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
                    onClick={this.AddFYPFormHandler}
                  >
                    {this.state.buttonDisabled ? (
                      <span className="btn-inner--icon">
                        <i className="fas fa-circle-notch fa-spin"></i>
                      </span>
                    ) : null}
                    <span className="btn-inner--text">Add FYP</span>
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </>
    );
  }
}
