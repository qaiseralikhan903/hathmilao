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
import JobSchema from "../../validationSchemas/Job/AddJobSchema.js";

import moment from "moment";
//Services
import { getCurrentUser } from "../../services/auth.service";
import { AddJob as Add_Job_Service } from "../../services/job.service";
import { message } from "antd";

class AddJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      company: "",
      title: "",
      jobType: "internship",
      minexperience: 0,
      maxexperience: 0,
      totalposition: 0,
      description: "",
      applybefore: "",
      postingdate: "",
      minsalary: 0,
      maxsalary: 0,
      requireddegree: "",
      requiredSkill: [],
      city: [],
      country: [],
      field: [],
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

  //Cities Array Function
  allCities = data => {
    this.setState(state => {
      state.city = data;
    });
  };

  //Contry Array Function
  allCountries = data => {
    this.setState(state => {
      state.country = data;
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

  AddJobFormHandler = event => {
    event.preventDefault();
    this.setState({
      buttonDisabled: true
    });

    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, JobSchema, (err, value) => {
      if (err === null) {
        let data = this.state;
        Add_Job_Service(data)
          .then(response => {
            message.success("Job Added Successfully");
            window.location.reload();
          })
          .catch(e => {
            if (e) {
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
        <CardBody>
          <Form>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Job Title:</h5>
                  </Label>
                  <Input
                    name="title"
                    placeholder="Job Title"
                    onChange={this.handleInputChange}
                    type="text"
                  />
                </FormGroup>
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
              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Job Type:</h5>
                  </Label>
                  <Input
                    type="select"
                    name="jobType"
                    onChange={this.handleInputChange}
                  >
                    <option value="internship">Internship</option>
                    <option value="fulltime">Full-Time</option>
                  </Input>
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
                  <h5>City:</h5>
                </Label>
                <MultipleArrayInput
                  methodfromparent={this.allCities}
                  array={[]}
                  placeHolderString="Multiple Cities"
                />
              </Col>
              <Col md="4">
                <Label>
                  <h5>Country:</h5>
                </Label>
                <MultipleArrayInput
                  methodfromparent={this.allCountries}
                  array={[]}
                  placeHolderString="Multiple Conutries"
                />
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
              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Minimum Salary:</h5>
                  </Label>
                  <Input
                    name="minsalary"
                    placeholder="Minimum Salary"
                    type="number"
                    min="0"
                    max="1000000"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                    <h5>Maximum Salary:</h5>
                  </Label>
                  <Input
                    name="maxsalary"
                    placeholder="Maximum Salary"
                    type="number"
                    min="0"
                    max="1000000"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    <h5>Minimum Experience(Years):</h5>
                  </Label>
                  <Input
                    name="minexperience"
                    placeholder="Minimum Experience Years"
                    type="number"
                    min="0"
                    max="10"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>
                    <h5>Maximum Experience(Years):</h5>
                  </Label>
                  <Input
                    name="maxexperience"
                    placeholder="Maximum Experience Years "
                    type="number"
                    min="0"
                    max="40"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup>
                  <Label>
                    <h5>Total Position:</h5>
                  </Label>
                  <Input
                    name="totalposition"
                    placeholder="Total Position"
                    type="number"
                    min="0"
                    max="40"
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
                    <h5>Job Description :</h5>
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
                    onClick={this.AddJobFormHandler}
                  >
                    {this.state.buttonDisabled ? (
                      <span className="btn-inner--icon">
                        <i className="fas fa-circle-notch fa-spin"></i>
                      </span>
                    ) : null}
                    <span className="btn-inner--text">
                      Add Job and Internship
                    </span>
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

export default AddJob;
