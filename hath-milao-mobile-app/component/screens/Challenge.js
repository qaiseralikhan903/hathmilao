/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Text, Container, Content, Tabs, Tab } from "native-base";
import { StatusBar } from "react-native";
import MyHeader from "../src/header";
import Appliedchallenges from "../ChallengeTabs/AppliedChallenges";
import MyChallenges from "../ChallengeTabs/MyChallenges";

class ChallengeScreen extends Component {
  render() {
    return (
      <Container>
        <MyHeader heading="Challenge" navigation={this.props.navigation} />
        <StatusBar hidden />
        <Tabs
          tabContainerStyle={{ borderBottomWidth: 0, elevation: 1 }}
          initialPage={0}
        >
          <Tab
            tabStyle={{
              backgroundColor: "white",
              borderWidth: 0,
              borderTopWidth: 0
            }}
            activeTabStyle={{
              backgroundColor: "white",
              borderWidth: 0,
              borderTopWidth: 0
            }}
            activeTextStyle={{
              color: "#32325D",
              fontWeight: "500",
              borderTopWidth: 0
            }}
            heading="Challenges"
          >
            <MyChallenges navigation={this.props.navigation} />
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: "white", borderWidth: 0 }}
            activeTabStyle={{ backgroundColor: "white", borderWidth: 0 }}
            activeTextStyle={{
              color: "#32325D",
              fontWeight: "500",
              borderTopWidth: 0
            }}
            heading="Accepted"
          >
            <Appliedchallenges navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default ChallengeScreen;
