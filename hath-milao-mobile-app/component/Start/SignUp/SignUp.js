/* eslint-disable no-else-return */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableHighlight, StatusBar } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Container,
  Header,
  Content,
  Form,
  Input,
  Label,
  Button,
  Text,
  View,
  Icon,
  Left,
  Item
} from "native-base";
import Joi from "react-native-joi";
// Services
import { Register as RegisterUser } from "../../../services/auth.service";
import RegisterSchema from "../../../validationSchemas/User/RegisterSchema";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      uError: false,
      password: "",
      confirmPassword: "",
      pError: false,
      cpError: false,
      email: "",
      eError: false,
      role: "student",
      error: "",
      visible: false,
      success: false,
      visibleError: false
    };
  }

  showError() {
    if (this.state.visibleError) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#f8d7da",
            minHeight: 35,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            flexDirection: "column"
          }}
        >
          <Text
            style={{
              color: "#721c24",
              borderColor: "#f5c6cb",

              fontSize: 12,
              fontWeight: "400"
            }}
          >
            Cannot Create Account Please Try Again
          </Text>
          <Text
            style={{
              color: "#721c24",
              borderColor: "#f5c6cb",

              fontSize: 12,
              fontWeight: "400"
            }}
          >
            {this.state.error}
          </Text>
        </View>
      );
    } else if (this.state.success) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#d4edda",
            minHeight: 35,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8
          }}
        >
          <Text
            style={{
              color: "#155724",
              borderColor: "#155724",

              fontSize: 12,
              fontWeight: "400"
            }}
          >
            Account Created Successfully
          </Text>
        </View>
      );
    }
    return null;
  }

  async onSignUp() {
    if (this.state.password === "") {
      await this.setState({ pError: true });
    } else {
      await this.setState({ pError: false });
    }
    if (this.state.username === "") {
      await this.setState({ uError: true });
      // console.log(this.state.username);
    } else {
      await this.setState({ uError: false });
      // console.log(this.state.username);
    }

    if (this.state.email === "") {
      await this.setState({ eError: true });
      //  console.log(this.state.email);
    } else {
      await this.setState({ eError: false });
    }
    //  console.log(this.state.email);

    if (this.state.confirmPassword === "") {
      await this.setState({ cpError: true });
      //   console.log(this.state.confirmPassword);
    } else {
      await this.setState({ cpError: false });
      if (this.state.confirmPassword !== this.state.password) {
        await this.setState({ cpError: true, pError: true });
      } else {
        await this.setState({ cpError: false, pError: false });
      }
    }

    // console.log(this.state.confirmPassword);}

    if (
      !this.state.cpError &&
      !this.state.eError &&
      !this.state.uError &&
      !this.state.pError
    ) {
      const data = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        role: this.state.role
      };

      Joi.validate(data, RegisterSchema, (err, val) => {
        // console.log("error: ", err);
        // console.log("value: ", val);

        if (!err) {
          this.setState({ visible: true });
          RegisterUser(data)
            .then(response => {
              // console.log(response.data);
              this.setState({
                visibleError: false,
                visible: false,
                password: "",
                confirmPassword: "",
                success: true,
                error: false
              });
            })
            .catch(e => {
              this.setState({
                error: "username and password should be unique",
                visibleError: true,
                visible: false,
                success: false,
                password: "",
                confirmPassword: ""
              });
              this.props.navigation.navigate("ErrorScreen");
              // console.log(e.response.data.err.errors.username.message);
            });
        } else {
          //const errorString = err[0].ValidationError.split("[");
          const s = err.toString().split("[");
          const strError = s[1].split("]");
          // console.log(s1[0]);
          this.setState({
            error: strError[0],
            visibleError: true,
            visible: false,
            success: false,
            password: "",
            confirmPassword: ""
          });
        }
      });
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#f4f5f7" }}>
        <Spinner
          visible={this.state.visible}
          textContent={"Creating Account, Wait....."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <StatusBar hidden />
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={150}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 0.1 }} />
              <View style={{ flex: 0.8, marginTop: 70 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "#384850",
                      fontWeight: "bold",
                      fontSize: 20
                    }}
                  >
                    Create Your Account Here
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10
                  }}
                />

                <Form>
                  {this.showError()}
                  <Item
                    regular
                    error={this.state.uError ? true : false}
                    style={{
                      borderRadius: 8,
                      backgroundColor: "white",
                      marginTop: 20
                    }}
                  >
                    <Icon name="ios-person" style={{ color: "#384850" }} />
                    <Input
                      placeholder="Username: A-z 0-9"
                      style={{
                        color: "grey"
                      }}
                      onChangeText={username => {
                        this.setState({ username });
                      }}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refs.NameInput._root.focus(); // <-- MADE THE CHANGE HERE
                      }}
                    />
                  </Item>

                  {
                    // username
                  }
                  <Item
                    regular
                    error={this.state.eError ? true : false}
                    style={{
                      borderRadius: 8,
                      backgroundColor: "white",
                      marginTop: 20,
                      borderWidth: 20
                    }}
                  >
                    <Icon name="ios-mail" style={{ color: "#384850" }} />
                    <Input
                      placeholder="Email"
                      ref="NameInput"
                      style={{ color: "grey" }}
                      onChangeText={email => {
                        this.setState({ email });
                      }}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refs.PasswordInput._root.focus(); // <-- MADE THE CHANGE HERE
                      }}
                    />
                  </Item>
                  {
                    // password
                  }
                  <Item
                    regular
                    error={this.state.pError ? true : false}
                    style={{
                      borderRadius: 8,
                      backgroundColor: "white",
                      marginTop: 20
                    }}
                  >
                    <Icon name="ios-lock" style={{ color: "#384850" }} />
                    <Input
                      onChangeText={password => {
                        this.setState({ password });
                      }}
                      value={this.state.password}
                      placeholder="Password"
                      ref="PasswordInput"
                      secureTextEntry
                      style={{ color: "grey" }}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refs.ConfirmPasswordInput._root.focus();
                      }}
                    />
                  </Item>
                  {
                    // confirm password
                  }
                  <Item
                    regular
                    error={this.state.cpError ? true : false}
                    style={{
                      borderRadius: 8,
                      backgroundColor: "white",
                      marginTop: 20
                    }}
                  >
                    <Icon name="md-lock" style={{ color: "#384850" }} />
                    <Input
                      placeholder="Confirm Password"
                      onChangeText={confirmPassword => {
                        this.setState({ confirmPassword });
                      }}
                      value={this.state.confirmPassword}
                      secureTextEntry
                      ref="ConfirmPasswordInput"
                      stackedLabel
                      style={{ color: "grey" }}
                    />
                  </Item>
                </Form>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <TouchableHighlight
                    style={{
                      marginTop: 25,
                      borderRadius: 8,
                      width: 200,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#5e72e4",
                      height: 37
                    }}
                    onPress={() => {
                      this.onSignUp();
                    }}
                  >
                    <Text style={{ color: "white" }}>SignUp</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={{ flex: 0.1 }} />
            </View>

            <View />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}
