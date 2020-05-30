/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-else-return */
/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Container, Text, View } from "native-base";
import { Image } from "react-native";

export default class ErrorScreen extends Component {
  render() {
    // this.getData();
    return (
      <Container>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            textAlign: "center"
          }}
        >
          <Image
            style={{ width: 300, height: 300, resizeMode: "contain" }}
            source={require("../../assets/imgs/error.png")}
          />
          <Text style={{ textAlign: "center" }}>
            Something Went Wrong {"\n"} Try Again
          </Text>
        </View>
      </Container>
    );
  }
}
