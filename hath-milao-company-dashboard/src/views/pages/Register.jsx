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
  Alert,
  Col
} from "reactstrap";

// Validation Schema
import RegisterSchema from "../../validationSchemas/User/RegisterSchema.js";

// Services
import { Register as RegisterUser } from "../../services/auth.service";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      role: "company",
      error: "None",
      visible: false,
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

  AddUserFormHandler = event => {
    event.preventDefault();

    this.setState({
      buttonDisabled: true
    });

    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, RegisterSchema, (err, value) => {
      if (err === null) {
        const data = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          role: this.state.role
        };
        RegisterUser(data)
          .then(response => {
            this.props.history.push("/");
          })
          .catch(e => {
            this.setState({
              error: e.response.data.err,
              visible: true,
              buttonDisabled: false
            });
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
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4 h4">SIGN UP</div>

              <Alert
                color="danger"
                isOpen={this.state.visible}
                toggle={this.onDismiss}
              >
                {this.state.error}
              </Alert>
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="User Name"
                      name="username"
                      onChange={this.handleChange}
                      type="text"
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                      type="email"
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                      type="password"
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button
                    className="btn-icon btn-3"
                    color="primary"
                    type="button"
                    disabled={this.state.buttonDisabled}
                    onClick={this.AddUserFormHandler}
                  >
                    {this.state.buttonDisabled ? (
                      <span className="btn-inner--icon">
                        <i className="fas fa-circle-notch fa-spin"></i>
                      </span>
                    ) : null}
                    <span className="btn-inner--text">Sign Up</span>
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

export default Register;
