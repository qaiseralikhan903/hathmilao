/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  Tabs,
  Tab
} from "native-base";
import { Block } from "galio-framework";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class MyHeader extends Component {
  renderHeader() {
    // eslint-disable-next-line prefer-destructuring
    let routeName = this.props.navigation.state.routeName;
    return (
      <Header
        span
        style={{
          height: 80,
          backgroundColor: "white",
          marginLeft: 0,
          elevation: 1
        }}
      >
        <Block
          style={{ flex: 1, flexDirection: "row", marginTop: 25, width: 40 }}
        >
          <Block style={{ flex: 0.2 }}>
            <Button transparent>
              <Icon
                name="menu"
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}
                style={{ color: "#172B4D" }}
                size={14}
              />
            </Button>
          </Block>
          <Block style={{ flex: 0.5, marginTop: 10 }}>
            <Text style={{ fontWeight: "600", color: "#525F7F" }}>
              {this.props.heading}
            </Text>
          </Block>
        </Block>
        <Animatable.View>
          <Button
            transparent
            style={{
              position: "absolute",
              bottom: 10,
              right: 20,
              fontSize: 30,
              alignItems: "center"
            }}
            onPress={() => {
              this.props.navigation.navigate("Notification", {
                rName: routeName
              });
            }}
          >
            <Icon
              type="Ionicons"
              name="ios-notifications-outline"
              style={{ color: "#172B4D" }}
            />
          </Button>
        </Animatable.View>
      </Header>
    );
  }

  render() {
    if (this.props.heading === "Jobs") {
      return <Block>{this.renderHeader()}</Block>;
    } else if (this.props.heading === "Event") {
      return <Block>{this.renderHeader()}</Block>;
    } else if (this.props.heading === "Final Year Project") {
      return <Block>{this.renderHeader()}</Block>;
    } else if (this.props.heading === "Challenge") {
      return <Block>{this.renderHeader()}</Block>;
    }
    return <Block shadow>{this.renderHeader()}</Block>;
  }
}
