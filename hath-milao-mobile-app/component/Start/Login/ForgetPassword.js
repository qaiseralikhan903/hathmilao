/* eslint-disable no-else-return */
/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableHighlight, StatusBar, AsyncStorage } from "react-native";
import { Container, Form, Input, Text, View, Icon, Item } from "native-base";
import { StackActions, NavigationActions } from "react-navigation";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { showMessage } from "react-native-flash-message";
import Joi from "react-native-joi";
import { ForgotPassword } from "../../../services/auth.service";
import ForgotPasswordSchema from "../../../validationSchemas/User/ForgotPasswordSchema";
import { sb } from "../../../services/chat.init";

const resetAction = StackActions.reset({
  index: 0,
  key: null, // <-- this
  actions: [NavigationActions.navigate({ routeName: "DrawerNavi" })]
});

export default class ForgotPass extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    visible: false,
    success: ""
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  showError() {
    if (this.state.error) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#f8d7da",
            minHeight: 35,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8
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
            {this.state.success}
          </Text>
        </View>
      );
    }
    return null;
  }

  componentWillUnmount() {
    this.setState({
      error: "",
      visible: false,
      username: "",
      password: ""
    });
  }

  render() {
    // this.getData();
    return (
      <Container style={{ backgroundColor: "#f4f5f7" }}>
        <Spinner
          visible={this.state.visible}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <StatusBar hidden />
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={150}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 0.1 }} />
              <View style={{ flex: 0.8, marginTop: 150 }}>
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
                    Enter Your Email Here
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
                  {
                    // name
                  }
                  {this.showError()}
                  <Item
                    regular
                    style={{
                      borderRadius: 8,
                      backgroundColor: "white",
                      marginTop: 20
                    }}
                  >
                    <Icon name="ios-person" style={{ color: "#384850" }} />
                    <Input
                      placeholder="Email"
                      style={{
                        color: "grey"
                      }}
                      returnKeyType="Done"
                      onChangeText={username => this.setState({ username })}
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
                      const data = {
                        email: this.state.username
                      };
                      Joi.validate(data, ForgotPasswordSchema, (err, val) => {
                        // console.log("error: ", err);
                        // console.log("value: ", val);

                        if (!err) {
                          this.setState({ visible: true });

                          ForgotPassword(this.state.username)
                            .then(response => {
                              console.log(response.data);
                              this.setState({
                                success: response.data.message,
                                visible: false,
                                error: ""
                              });
                              //
                            })
                            .catch(e => {
                              // console.log(e.response.data);
                              
                              this.setState({
                                error: e.response,
                                visible: false,
                                success: ""
                              });
                              this.props.navigation.navigate("ErrorScreen");
                            });
                        } else {
                          const s = err.toString().split("[");
                          const strError = s[1].split("]");
                          // console.log(s1[0]);
                          this.setState({
                            error: strError[0],

                            visible: false
                          });
                        }
                      });

                      // axios
                      //   .get(
                      //     "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=3a31a881817a041a63eac1c1bbbba705"
                      //   )
                      //   .then(response => {
                      //     console.log(response);
                      //   })
                      //   .catch(e => {
                      //     console.log(e);
                      //   });
                    }}
                  >
                    <Text style={{ color: "white" }}>Submit</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={{ flex: 0.1 }} />
            </View>

            <View />
            <View />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}
