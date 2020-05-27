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
import FYPSchema from "../../validationSchemas/FYP/AddFYPSchema";

//Services

import { UpdateFYP } from "../../services/fyp.service";
import { Spin, message } from "antd";

export default class EditFYP extends React.Component {
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
      visible: false,
      Loading: false,
      editorState: EditorState.createEmpty(),
      fypid: "",
      buttonDisabled: false
    };
  }

  componentWillMount() {
    const { fyp } = this.props;
    let editorState = EditorState.createEmpty();
    const blocksFromHtml = htmlToDraft(fyp.description);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      editorState = EditorState.createWithContent(contentState);
    }

    this.setState({
      userid: fyp.userid,
      title: fyp.title,
      description: fyp.description,
      applybefore: fyp.applybefore,
      postingdate: fyp.postingdate,
      requireddegree: fyp.requireddegree,
      requiredSkill: fyp.requiredSkill,
      city: fyp.city,
      country: fyp.country,
      field: fyp.field,
      fypid: fyp._id,
      teamMember: fyp.teamMember,
      editorState,
      Loading: true
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

  EditFYPFormHandler = event => {
    event.preventDefault();
    this.setState({
      buttonDisabled: true
    });
    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, FYPSchema, (err, value) => {
      if (err === null) {
        let data = this.state;
        UpdateFYP(data)
          .then(response => {
            message.success(
              "Final Year Project Information Updated Successfully"
            );
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

  onDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <>
        {this.state.Loading ? (
          <React.Fragment>
            <CardBody className="shadow--hover job-box">
              <h4>Edit FYP:</h4>
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
                        value={this.state.title}
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
                        value={this.state.city}
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
                        value={this.state.country}
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
                      array={this.state.requiredSkill}
                      placeHolderString="Multiple Skills [5]"
                    />
                  </Col>

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
                        value={this.state.requireddegree}
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
                        value={this.state.teamMember}
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
                          defaultValue={this.state.applybefore}
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
                        onClick={this.EditFYPFormHandler}
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
              <Spin tip="Loading FYP Information..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
