/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/sort-comp */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import {
  Text,
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Button,
  View,
  Right,
  Left,
  Icon
} from "native-base";
import * as Animatable from "react-native-animatable";
import HTMLView from "react-native-htmlview";
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { Block } from "galio-framework";
import Modal from "react-native-modal";
import { DangerToast, SuccessToast } from "./MyToast";
import {
  RegisterEvent,
  CancelRegisterEvent
} from "../../services/event.service";

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      expanded: false,
      registered: false,
      screen: this.props.screen
    };
  }
  bounce() {
    this.refs.view.transition(
      {
        opacity: 0.6
      },
      { opacity: 1 },
      200,
      "bounceIn"
    );
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  onClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  strSplit(date) {
    if (date) {
      return new Date(date).toDateString();
    }
    return "";
  }
  showExpanded() {
    if (!this.state.expanded) {
      return (
        <Button
          bordered
          block
          style={{
            borderColor: "#5E72E4",
            top: 30,
            bottom: 15,
            elevation: 3
          }}
          onPress={this.onClick.bind(this)}
        >
          <Text>Show More</Text>
        </Button>
      );
    }
    const time = this.props.data.startTime + " - " + this.props.data.endTime;
    return (
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        style={{ flexDirection: "column" }}
      >
        {this.cardDetail("Time", time, null, "clockcircleo", "AntDesign")}
        {this.cardDetail(
          "Location",
          this.props.data.venue,
          null,
          "location-on",
          "MaterialIcons"
        )}
        {this.cardDetailDescription(
          "Description",
          this.STRIPHTML(this.props.data.description),
          null,
          "description",
          "MaterialIcons"
        )}
        <Text />
        <Text />
        
        <View
          style={{
            flexDirection: "row",
            top: 30,
            flexWrap: "wrap"
          }}
        >
          {this.state.registered || this.state.screen === "register" ? (
            <Button
              onPress={() => {
                CancelRegisterEvent(this.props.data._id);
                this.setState({ registered: false, screen: "event" });
                SuccessToast("Event Cancelled Successfully");
              }}
              block
              style={[styles.showMoreButton, { width: "45%" }]}
            >
              <Text style={{ textAlign: "center", fontSize: 12 }}>Cancel</Text>
            </Button>
          ) : (
            <Button
              block
              style={[styles.showMoreButton, { width: "45%" }]}
              onPress={() => {
                this.setState({ registered: true, screen: "register" });
                RegisterEvent(this.props.data._id);
                SuccessToast("Event Registered Successfully");
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 12 }}>
                Apply Now
              </Text>
            </Button>
          )}

          <Button
            block
            style={[styles.showLessButton, { width: "45%" }]}
            onPress={this.onClick.bind(this)}
          >
            <Text style={{ textAlign: "center", fontSize: 12 }}>Show Less</Text>
          </Button>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{ flex: 1 }}>
              <Text>Hello!</Text>
              <Button title="Hide modal" onPress={this.toggleModal}>
                <Text>Hide Model</Text>
              </Button>
              <Image
                style={{ width: 300, height: 200 }}
                source={{
                  uri: "https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif"
                }}
              />
            </View>
          </Modal>
        </View>
      </Animatable.View>
    );
  }

  cardDetail(heading, detail, myColor, icon, fonttype) {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.45, flexDirection: "row" }}>
          <Icon type={fonttype} name={icon} style={{ fontSize: 13, top: 15 }} />
          <Text
            style={{
              color: "#32325D",
              fontSize: 13,
              fontWeight: "bold",
              left: 10,
              top: 15
            }}
          >
            {heading}
          </Text>
        </View>
        <View style={{ flex: 0.55, flexWrap: "wrap" }}>
          <Text style={{ color: myColor ? "#FB6340" : "#525F7F", top: 15 }}>
            {detail}
          </Text>
        </View>
      </View>
    );
  }
  cardDetailDescription(heading, detail, myColor, icon, fonttype) {
    return (
      <View style={{ flexDirection: "column", padding: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon type={fonttype} name={icon} style={{ fontSize: 14, top: 15 }} />
          <Text
            style={{
              color: "#32325D",
              fontSize: 18,
              fontWeight: "bold",
              left: 10,
              top: 15
            }}
          >
            {heading}
          </Text>
        </View>
        <View style={{ flexWrap: "wrap", marginTop: 14, flexDirection: "row" }}>
          <Text>{"       "}</Text>
          <HTMLView value={detail} />
        </View>
      </View>
    );
  }
  STRIPHTML(myString) {
    return myString.replace(/<[^>]*>?/gm, "");
  }

  render() {
    return (
      <Animatable.View ref="view">
        <TouchableWithoutFeedback onPress={() => this.bounce()}>
          <Card>
            <CardItem style={{ backgroundColor: "#f4f4f4" }} header bordered>
              <Icon
                type="MaterialIcons"
                name="event"
                style={{ fontSize: 18, color: "#32325D" }}
              />
              <Text style={{ fontSize: 18, color: "#32325D" }}>
                {this.strSplit(this.props.data.dateAt)}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Body style={{ flexWrap: "wrap", flexDirection: "column" }}>
                {this.cardDetail(
                  "Title",
                  this.props.data.title,
                  null,
                  "title",
                  "MaterialIcons"
                )}
                {this.cardDetail(
                  "Company",
                  this.props.data.createdBy,
                  null,
                  "office-building",
                  "MaterialCommunityIcons"
                )}
                {this.cardDetail(
                  "Event Type",
                  this.props.data.eventType,
                  null,
                  "event",
                  "SimpleLineIcons"
                )}

                {this.showExpanded()}
                <Text />
                <Text />
              </Body>
            </CardItem>
          </Card>
        </TouchableWithoutFeedback>
      </Animatable.View>
    );
  }
}

const styles = {
  showMoreButton: {
    backgroundColor: "#5E72E4",
    marginTop: 10,
    marginRight: 10,
    bottom: 15,
    width: "30%",
    elevation: 6,
    borderRadius: 12
  },
  showLessButton: {
    backgroundColor: "#172B4D",
    marginTop: 10,
    marginRight: 10,
    bottom: 15,
    width: "30%",
    elevation: 6,
    borderRadius: 12
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
    backgroundColor: "#ecf0f1"
  }
};
