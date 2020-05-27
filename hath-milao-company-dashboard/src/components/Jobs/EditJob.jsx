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
import JobSchema from "../../validationSchemas/Job/AddJobSchema.js";

//Services

import { UpdateJob } from "../../services/job.service";
import { Spin, message } from "antd";

class EditJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
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
      visible: false,
      editorState: EditorState.createEmpty(),
      Loading: false,
      jobid: "",
      company: "",
      buttonDisabled: false
    };
  }

  componentWillMount() {
    const { job } = this.props;

    let editorState = EditorState.createEmpty();
    const blocksFromHtml = htmlToDraft(job.description);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      editorState = EditorState.createWithContent(contentState);
    }

    this.setState({
      userid: job.userid,
      title: job.title,
      jobType: job.jobType,
      minexperience: job.minexperience,
      maxexperience: job.maxexperience,
      totalposition: job.totalposition,
      description: job.description,
      applybefore: job.applybefore,
      postingdate: job.postingdate,
      minsalary: job.minsalary,
      maxsalary: job.maxsalary,
      requireddegree: job.requireddegree,
      requiredSkill: job.requiredSkill,
      city: job.city,
      country: job.country,
      field: job.field,
      jobid: job._id,
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

  EditJobFormHandler = event => {
    event.preventDefault();

    this.setState({
      buttonDisabled: true
    });

    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, JobSchema, (err, value) => {
      if (err === null) {
        let data = this.state;
        UpdateJob(data)
          .then(response => {
            message.success("Job Information Updated Successfully");
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

  onDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <>
        {this.state.Loading ? (
          <React.Fragment>
            <CardBody className="shadow--hover job-box">
              <h4>Edit Job:</h4>
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
                        value={this.state.title}
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
                        value={this.state.requireddegree}
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
                        value={this.state.jobType}
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
                      array={this.state.requiredSkill}
                      placeHolderString="Multiple Skills [5]"
                    />
                  </Col>
                  <Col md="4">
                    <Label>
                      <h5>City:</h5>
                    </Label>
                    <MultipleArrayInput
                      methodfromparent={this.allCities}
                      array={this.state.city}
                      placeHolderString="Multiple Cities"
                    />
                  </Col>
                  <Col md="4">
                    <Label>
                      <h5>Country:</h5>
                    </Label>
                    <MultipleArrayInput
                      methodfromparent={this.allCountries}
                      array={this.state.country}
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
                      array={this.state.field}
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
                        value={this.state.minsalary}
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
                        value={this.state.maxsalary}
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
                        value={this.state.minexperience}
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
                        value={this.state.maxexperience}
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
                        value={this.state.totalposition}
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
                        onClick={this.EditJobFormHandler}
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
              <Spin tip="Loading Edit Job..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}

export default EditJob;
