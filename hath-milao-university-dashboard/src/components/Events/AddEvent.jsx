import React from "react";
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
import EventSchema from "../../validationSchemas/Event/AddEventSchema";

import moment from "moment";
//Services
import { getCurrentUser } from "../../services/auth.service";
import { AddEvent as Add_Event } from "../../services/event.service";
import { message } from "antd";

export default class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      title: "",
      eventType: "workshop",
      venue: "",
      description: "",
      dateAt: "",
      startTime: "",
      endTime: "",
      createdBy: "",
      postingdate: "",
      field: [],
      status: "active",
      error: "None",
      visible: false,
      editorState: EditorState.createEmpty(),
      buttonDisabled: false
    };
  }

  componentWillMount() {
    if (getCurrentUser()) {
      const { user } = getCurrentUser();
      this.setState({
        userid: user.id,
        createdBy: user.username
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

  // Handle Date Change
  handleDateChange = newdate => {
    newdate = newdate._d.toISOString();

    this.setState({
      dateAt: newdate
    });
  };

  //   Add Form Handler
  AddEventFormHandler = event => {
    event.preventDefault();
    this.setState({
      buttonDisabled: true
    });
    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, EventSchema, (err, value) => {
      if (err === null) {
        let data = this.state;
        Add_Event(data)
          .then(response => {
            message.success("Event Added Successfully");

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

  //  To Dimiss Error Message
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
                    <h5>Event Title:</h5>
                  </Label>
                  <Input
                    name="title"
                    placeholder="Event Title"
                    onChange={this.handleInputChange}
                    type="text"
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Event Type:</h5>
                  </Label>
                  <Input
                    type="select"
                    name="eventType"
                    onChange={this.handleInputChange}
                  >
                    <option value="workshop">Workshop</option>
                    <option value="jobfair">JobFair</option>
                    <option value="webinar">Webinar</option>
                    <option value="networking">Networking</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Venue:</h5>
                  </Label>
                  <Input
                    name="venue"
                    placeholder="Venue"
                    onChange={this.handleInputChange}
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
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
              <Col md="2">
                <FormGroup>
                  <Label>
                    <h5>Start Time:</h5>
                  </Label>
                  <Input
                    type="time"
                    name="startTime"
                    onChange={this.handleInputChange}
                    placeholder="Start Time"
                  />
                </FormGroup>
              </Col>

              <Col md="2">
                <FormGroup>
                  <Label>
                    <h5>End Time:</h5>
                  </Label>
                  <Input
                    type="time"
                    name="endTime"
                    placeholder="End Time"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Date At:</h5>
                  </Label>
                  <InputGroup className="input-group-alternative date-input">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetime
                      inputProps={{
                        placeholder: "Date At"
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
                    <h5>Event Description :</h5>
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
                    onClick={this.AddEventFormHandler}
                  >
                    {this.state.buttonDisabled ? (
                      <span className="btn-inner--icon">
                        <i className="fas fa-circle-notch fa-spin"></i>
                      </span>
                    ) : null}
                    <span className="btn-inner--text">Add Event</span>
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
