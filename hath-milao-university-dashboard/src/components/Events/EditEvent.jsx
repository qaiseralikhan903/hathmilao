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
import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { divStyle, editorDiv, options } from "../../util/EditorStyling";

//Core Components
import MultipleArrayInput from "../Helper/MultipleArrayInput.jsx";

// Validation Schema
import EventSchema from "../../validationSchemas/Event/AddEventSchema";

//Services
import { UpdateEvent } from "../../services/event.service";
import { Spin, message } from "antd";

export default class EditEvent extends React.Component {
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
      Loading: false,
      eventid: "",
      editorState: EditorState.createEmpty(),
      buttonDisabled: false
    };
  }

  componentWillMount() {
    const { event } = this.props;
    let editorState = EditorState.createEmpty();
    const blocksFromHtml = htmlToDraft(event.description);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      editorState = EditorState.createWithContent(contentState);
    }

    this.setState({
      userid: event.userid,
      title: event.title,
      eventType: event.eventType,
      venue: event.venue,
      description: event.description,
      dateAt: event.dateAt,
      startTime: event.startTime,
      endTime: event.endTime,
      createdBy: event.createdBy,
      postingdate: event.postingdate,
      field: event.field,
      status: "active",
      eventid: event._id,
      editorState,
      Loading: true
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

  // To handle edit Button
  EditEventFormHandler = event => {
    event.preventDefault();
    this.setState({
      buttonDisabled: true
    });

    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, EventSchema, (err, value) => {
      if (err === null) {
        let data = this.state;
        UpdateEvent(data)
          .then(response => {
            message.success("Event Information Updated Successfully");
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

  // To handle error message
  onDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <>
        {this.state.Loading ? (
          <React.Fragment>
            <CardBody className="shadow--hover job-box">
              <h4>Edit Event:</h4>
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
                        value={this.state.title}
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
                        value={this.state.eventType}
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
                        value={this.state.venue}
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
                      array={this.state.field}
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
                        value={this.state.startTime}
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
                        value={this.state.endTime}
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
                          defaultValue={this.state.dateAt}
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
                        onClick={this.EditEventFormHandler}
                      >
                        {this.state.buttonDisabled ? (
                          <span className="btn-inner--icon">
                            <i className="fas fa-circle-notch fa-spin"></i>
                          </span>
                        ) : null}
                        <span className="btn-inner--text">Update</span>
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <br />
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
              <Spin tip="Loading Event Information..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
