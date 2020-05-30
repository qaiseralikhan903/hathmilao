/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  TouchableHighlight,
  StatusBar,
  AsyncStorage,
  Alert
} from "react-native";
import { Container, Form, Input, Text, View, Icon, Item } from "native-base";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import { StackActions, NavigationActions } from "react-navigation";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { showMessage } from "react-native-flash-message";
import { Login as LoginUser, SaveUser } from "../../../services/auth.service";
import { sb } from "../../../services/chat.init";
import { saveExpoTokkenAPI } from "../../../services/notification.service";

const resetAction = StackActions.reset({
  index: 0,
  key: null, // <-- this
  actions: [NavigationActions.navigate({ routeName: "DrawerNavi" })]
});

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    visible: false,
    isPermissionGranted: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    console.log(status);
    if (status !== "granted") {
      Alert.alert("No notification permissions!");
      return;
    }

    this.setState({
      isPermissionGranted: true
    });
  }

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
            Invalid Username or Password
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

  onLogin = () => {
    this.setState({ visible: true });
    // console.log(this.state.username);
    // console.log(this.state.password);

    console.log("Inside Login Func");
    LoginUser(this.state.username, this.state.password)
      .then(async response => {
        const USER_ID = response.data.user.id;
        let token = null;
        if (this.state.isPermissionGranted) {
          token = await Notifications.getExpoPushTokenAsync();
          console.log("Device Token from Login :", token);
        }
        await SaveUser(response.data, token);
        await  saveExpoTokkenAPI(token);
        sb.connect(USER_ID, (user, err) => {
          if (err) {
            console.log(err);
            return;
          }
          this.props.navigation.navigate("DrawerNavi");
        });

        //
      })
      .catch(e => {
        console.log("Error: ", e);
        this.setState({
          error: "error",
          visible: false,
          password: ""
        });
        this.props.navigation.navigate("ErrorScreen");
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
  };

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
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={200}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 0.1 }} />
              <View style={{ flex: 0.8, marginTop: 150 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 0
                  }}
                />
<View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 0
                  }}
                >
                  <Text style={{ color: "#5e72e4", fontWeight: "bold", fontSize: 20 }}>
                    Welcome Students
                  </Text>

                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "#384850", fontSize: 12, textAlign: "center" }}>
                  Talent, meet opportunity. Hath Milao helps all students find meaningful careers
                  </Text>
                  
                </View>





                {/* <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "#384850", fontWeight: "bold", fontSize: 20 }}>
                    LOGIN
                  </Text>
                </View> */}

                <Form style={{marginTop: 20}}>
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
                      placeholder="Username or Email"
                      style={{
                        color: "grey"
                      }}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refs.PasswordInput._root.focus(); // <-- MADE THE CHANGE HERE
                      }}
                      onChangeText={username => this.setState({ username })}
                    />
                  </Item>

                  {
                    // password
                  }
                  <Item
                    regular
                    style={{
                      borderRadius: 8,
                      backgroundColor: "white",
                      marginTop: 20
                    }}
                  >
                    <Icon name="ios-lock" style={{ color: "#384850" }} />
                    <Input
                      placeholder="Password"
                      ref="PasswordInput"
                      secureTextEntry
                      style={{ color: "grey" }}
                      onChangeText={password => this.setState({ password })}
                      value={this.state.password}
                    />
                  </Item>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text
                      style={{ color: "#384850" }}
                      onPress={() => {
                        this.props.navigation.navigate("ForgotPassword");
                      }}
                    >
                      Forgot Password?
                    </Text>
                  </View>
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
                    onPress={this.onLogin}
                  >
                    <Text style={{ color: "white" }}>LOGIN</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={{ flex: 0.1 }} />
            </View>

            <View />
            <View />
            <View style={{ flex: 1, alignItems: "center", marginTop: 5 }}>
              <Text
                style={{ color: "#384850" }}
                onPress={() => {
                  this.props.navigation.navigate("signup");
                }}
              >
                Don't Have Account?
              </Text>
            </View>
            
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}
