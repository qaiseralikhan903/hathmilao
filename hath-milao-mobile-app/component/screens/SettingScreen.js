/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Text, Container, Content } from "native-base";
import { StatusBar } from "react-native";
import MyHeader from "../src/header";

class SettingScreen extends Component {
  render() {
    return (
      <Container>
        <MyHeader heading="Settings" navigation={this.props.navigation} />
        <StatusBar hidden />
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text>Setting Screen</Text>
        </Content>
      </Container>
    );
  }
}

export default SettingScreen;
