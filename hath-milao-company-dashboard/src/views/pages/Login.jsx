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
  Row,
  Alert,
  NavLink
} from "reactstrap";

import { Link } from "react-router-dom";

// Validation Schema
import LoginSchema from "../../validationSchemas/User/LoginSchema.js";

// Services
import { Login as LoginUser, SaveUser } from "../../services/auth.service";
import { sb } from "../../util/chat.init";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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

  onDismiss = () => {
    this.setState({ visible: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      buttonDisabled: true
    });

    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate(this.state, LoginSchema, (err, value) => {
      if (err === null) {
        const { username, password } = this.state;
        LoginUser(username, password)
          .then(response => {
            const USER_ID = response.data.user.id;
            SaveUser(response.data);
            sb.connect(USER_ID, (user, err) => {
              if (err) {
                console.log(err);
                return;
              }
              this.props.history.push("/");
            });
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

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4 h4">LOGIN</div>
              <Alert
                color="danger"
                isOpen={this.state.visible}
                toggle={this.onDismiss}
              >
                {this.state.error}
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
                      placeholder="Username or Email"
                      type="text"
                      name="username"
                      onChange={this.handleChange}
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
                      type="password"
                      name="password"
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
                    <span className="btn-inner--text">Login</span>
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6"></Col>
            <Col className="text-right" xs="6">
              <NavLink
                className="nav-link-icon"
                to="/auth/forgotpassword"
                tag={Link}
              >
                Forgot password?
              </NavLink>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
