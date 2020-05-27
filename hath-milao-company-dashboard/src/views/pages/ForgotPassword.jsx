import React from "react";
import Joi from "@hapi/joi";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Alert
} from "reactstrap";

// Validation Schema
import ForgotSchema from "../../validationSchemas/User/ForgotPassword.js";

// Services
import { ForgotPassword as Forgot_Password } from "../../services/auth.service";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: "None",
      sucessMessage: "",
      visible: false,
      visibleSucess: false,
      buttonDisabled: false

    };
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  };

  onDismiss = () => {
    this.setState({ visible: false, visibleSucess: false });
  };

  onDismissSucess = () => {
    this.setState({ visible: false, visibleSucess: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      buttonDisabled: true
    });

    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, ForgotSchema, (err, value) => {
      if (err === null) {
        const { email } = this.state;

        Forgot_Password(email)
          .then(response => {
            this.setState({
              error: "",
              sucessMessage:
                "Reset Password Link Send Successfully!! Check Your Email",
              visible: false,
              visibleSucess: true
            });
          })
          .catch(e => {
            this.setState({
              error: e.response.data.err,
              visible: true,
              visibleSucess: false,
              buttonDisabled: false

            });
          });
      } else {
        this.setState({
          error: err.details[0].message,
          visible: true,
          visibleSucess: false,
          buttonDisabled: false

        });
      }
    }); // err === null -> valid
  };

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4 h4">
                FORGOT PASSWORD
              </div>
              <Alert
                color="danger"
                isOpen={this.state.visible}
                toggle={this.onDismiss}
              >
                {this.state.error}
              </Alert>
              <Alert
                color="success"
                isOpen={this.state.visibleSucess}
                toggle={this.onDismiss}
              >
                {this.state.sucessMessage}
              </Alert>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="text"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button
                    className="btn-icon btn-3"
                    color="primary"
                    type="button"
                    disabled={this.state.buttonDisabled}
                    onClick={this.handleSubmit}
                  >
                    {this.state.buttonDisabled ? (
                      <span className="btn-inner--icon">
                        <i className="fas fa-circle-notch fa-spin"></i>
                      </span>
                    ) : null}
                    <span className="btn-inner--text">Reset Password</span>
                  </Button>
                </div>
              

               
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default ForgotPassword;
