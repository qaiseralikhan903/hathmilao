/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Container, Tabs, Tab, TabHeading, Icon, Text } from "native-base";
import { StatusBar } from "react-native";
import MyHeader from "../src/header";
import Jobs from "../ProfileTabs/Jobs";
import Saved from "../ProfileTabs/Saved";

import Applied from "../ProfileTabs/Applied";
import Recommendation from "../ProfileTabs/Recommendation";

class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <MyHeader heading="Jobs" navigation={this.props.navigation} />
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
            heading="Jobs"
          >
            <Jobs navigation={this.props.navigation} />
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: "white", borderWidth: 0 }}
            activeTabStyle={{ backgroundColor: "white", borderWidth: 0 }}
            activeTextStyle={{
              color: "#32325D",
              fontWeight: "500",
              borderTopWidth: 0
            }}
            heading="Saved"
          >
            <Saved navigation={this.props.navigation} />
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: "white", borderWidth: 0 }}
            activeTabStyle={{ backgroundColor: "white", borderWidth: 0 }}
            activeTextStyle={{
              color: "#32325D",
              fontWeight: "500",
              borderTopWidth: 0
            }}
            heading="Applied"
          >
            <Applied navigation={this.props.navigation} />
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: "white", borderWidth: 0 }}
            activeTabStyle={{ borderWidth: 0, backgroundColor: "lightblue" }}
            activeTextStyle={{
              color: "yellow",
              fontWeight: "500",
              borderTopWidth: 0
            }}
            heading={
              <TabHeading
                activeTextStyle={{
                  color: "yellow",
                  fontWeight: "500",
                  borderTopWidth: 0
                }}
                style={{ backgroundColor: "white" }}
                activeTabStyle={{ color: "red", backgroundColor: "lightblue" }}
              >
                <Icon style={{ color: "lightblue" }} name="star" />
              </TabHeading>
            }
          >
            <Recommendation navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default HomeScreen;
