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

// Validation Schema
import BasicSchema from "../../../validationSchemas/User/BasicSchema";

import * as Mime from "mime-types";

// Services
import { UpdateBasic as Edit_Basic } from "../../../services/profile/Basic.service";

import config from "../../../util/config.json";
import { sb } from "../../../util/chat.init";
import { getCurrentUser } from "../../../services/auth.service";
import { message } from "antd";

export default class EditBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      headline: null,
      summary: null,
      phonenumber: null,
      city: null,
      country: null,
      githublink: null,
      loading: false,
      error: "None",
      visible: false,
      image: null,
      selectedImage: null,
      image_meta: null,
      buttonDisabled: false
    };
  }

  componentWillMount() {
    const { profile } = this.props;

    this.setState({
      name: profile.name,
      headline: profile.headline,
      summary: profile.summary,
      phonenumber: profile.phonenumber,
      city: profile.city,
      country: profile.country,
      githublink: profile.githublink,
      selectedImage: `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${profile.imageurl}`,
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

  // Image Upload Handler
  handleFileChange = e => {
    if (e.target.files.length < 1) {
      this.setState({
        ...this.state,
        image: null,
        selectedImage: null,
        image_meta: null
      });
      return;
    }
    const image = e.target.files[0];
    const extension = Mime.extension(image.type) || "jpg";
    const meta = {
      size: image.size,
      name: image.name,
      contentType: image.type,
      extension: extension
    };
    this.setState({
      image: image,
      selectedImage: URL.createObjectURL(image),
      image_meta: meta
    });
  };

  //   ALert Handler
  onDismiss = () => {
    this.setState({ visible: false });
  };

  //  Edit Basic Form Handler

  EditBasicFormHandler = event => {
    event.preventDefault();
    this.setState({
      buttonDisabled: true
    });

    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, BasicSchema, (err, value) => {
      if (err === null) {
        const profileData = this.state;
        const data = {
          image: this.state.image,
          profileData
        };

        let chatImageURl = null;
        if (this.state.image_meta !== null) {
          chatImageURl = `${config.STORAGE_LINK}/${config.BUCKET_NAME}/public/student/${this.state.name}/profile.${this.state.image_meta.extension}`;
        } else {
          chatImageURl = this.state.selectedImage;
        }

        Edit_Basic(data)
          .then(response => {
            const USER_ID = getCurrentUser().user.id;
            sb.connect(USER_ID);
            sb.updateCurrentUserInfo(this.state.name, chatImageURl, function(
              response,
              error
            ) {
              if (error) {
                console.log(error);
                return;
              }
              message.success("Update Profile Infomration Successfully");
              window.location.reload(true);
            });
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
          <CardBody>
            <Form>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>
                      <h5>Profile Pic:</h5>
                    </Label>
                    <Input
                      type="file"
                      name="picture"
                      onChange={this.handleFileChange}
                    />
                  </FormGroup>
                </Col>

                {this.state.selectedImage !== null ? (
                  <Col md="12">
                    <FormGroup>
                      <Label>
                        <h5>Image Preview:</h5>
                      </Label>
                      <img
                        src={this.state.selectedImage}
                        className="img-thumbnail"
                        alt="Preview Profile"
                      />
                    </FormGroup>
                  </Col>
                ) : null}

                <Col md="12">
                  <FormGroup>
                    <Label for="name" className="mb-0">
                      <h5>Full Name:</h5>
                    </Label>
                    <Input
                      name="name"
                      placeholder="Full Name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label for="headline" className="mb-0">
                      <h5>Headline Text:</h5>
                    </Label>
                    <Input
                      name="headline"
                      placeholder="Headline Text"
                      value={this.state.headline}
                      onChange={this.handleInputChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label for="summary" className="mb-0">
                      <h5>Profile Summary:</h5>
                    </Label>
                    <Input
                      name="summary"
                      placeholder="Profile Summary"
                      value={this.state.summary}
                      onChange={this.handleInputChange}
                      type="textarea"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label for="phonenumber" className="mb-0">
                      <h5>Phone Number:</h5>
                    </Label>
                    <Input
                      name="phonenumber"
                      placeholder="0315-XXXXXXX"
                      value={this.state.phonenumber}
                      onChange={this.handleInputChange}
                      type="text"
                    />
                  </FormGroup>
                </Col>

                <Col md="6">
                  <FormGroup>
                    <Label for="field" className="mb-0">
                      <h5>City: </h5>
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
                    <Label for="field" className="mb-0">
                      <h5>Country: </h5>
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
                    <Label for="githublink" className="mb-0">
                      <h5>GitHub Link:</h5>
                    </Label>
                    <Input
                      name="githublink"
                      placeholder="Github Link"
                      value={this.state.githublink}
                      onChange={this.handleInputChange}
                      type="text"
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
                      onClick={this.EditBasicFormHandler}
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
        ) : (
          <h1>Loading...</h1>
        )}
      </React.Fragment>
    );
  }
}
