/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
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
import { Image, TouchableOpacity } from "react-native";
import { Block } from "galio-framework";
import Modal from "react-native-modal";
import { DangerToast, SuccessToast } from "./MyToast";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import HTMLView from "react-native-htmlview";
import { CancelAppliedFYP, ApplyFYP } from "../../services/fyp.service";

export default class FYPCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      isModalVisible: false,
      expanded: false,
      registered: this.props.registered,
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
  renderArray(data) {
    const items = data.map(item => {
      return (
        <Button
          key={item}
          style={{
            backgroundColor: "#5E72E4",
            margin: 5,
            flexWrap: "wrap",
            height: 25,
            borderRadius: 10
          }}
        >
          <Text style={{ textAlign: "center" }}>{item}</Text>
        </Button>
      );
    });

    return items;
  }
  strSplit(date) {
    const str = String(date).split("T");
    return str[0];
  }

  STRIPHTML(myString) {
    return myString.replace(/<[^>]*>?/gm, "");
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

    return (
      <Animatable.View style={{ flexDirection: "column" }}>
        {this.cardDetailDescription(
          "Description",
          this.STRIPHTML(this.props.data.description),
          null,
          "description",
          "MaterialIcons"
        )}
        {this.cardDetail(
          "Apply Before",
          this.strSplit(this.props.data.applybefore),
          null,
          "clockcircleo",
          "AntDesign"
        )}
        {this.cardDetail(
          "City",
          this.props.data.city,
          null,
          "location-on",
          "MaterialIcons"
        )}
        <Text
          style={{
            color: "#32325D",
            fontSize: 16,
            fontWeight: "bold",
            top: 10,
            padding: 5
          }}
        >
          Required Skills
        </Text>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", top: 3, padding: 5 }}
        >
          {this.renderArray(this.state.data.requiredSkill)}
        </View>

        <Text />

        <View
          style={{
            flexDirection: "row",
            top: 30,
            flexWrap: "wrap"
          }}
        >
          {this.state.screen === "register" || this.state.registered ? (
            <Button
              block
              style={[styles.showMoreButton, { width: "45%" }]}
              onPress={() => {
                CancelAppliedFYP(this.state.data._id);
                this.setState({ registered: false, screen: "fyp" });
                SuccessToast("Applied FYP Cancelled");
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 12 }}>Cancel</Text>
            </Button>
          ) : (
            <Button
              block
              style={[styles.showMoreButton, { width: "45%" }]}
              onPress={() => {
                ApplyFYP(this.state.data._id);
                this.setState({ registered: true, screen: "register" });
                SuccessToast("Applied For FYP Successfully");
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

  cardDetail(heading, detail, myColor, icon, fonttype) {
    return (
      <View style={{ flexDirection: "row", padding: 5 }}>
        <View style={{ flex: 0.5, flexDirection: "row" }}>
          <Icon type={fonttype} name={icon} style={{ fontSize: 14, top: 15 }} />
          <Text
            style={{
              color: "#32325D",
              fontSize: 14,
              fontWeight: "bold",
              left: 10,
              top: 15
            }}
          >
            {heading}
          </Text>
        </View>
        <View style={{ flex: 0.5, flexWrap: "wrap" }}>
          <Text style={{ color: myColor ? "#FB6340" : "#525F7F", top: 15 }}>
            {detail}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Animatable.View ref="view" animation="slideInUp" duration={1500}>
        <TouchableWithoutFeedback>
          <Card>
            <CardItem style={{ backgroundColor: "#f4f4f4" }} header bordered>
              <Icon
                type="MaterialIcons"
                name="title"
                style={{ fontSize: 18, color: "#32325D" }}
              />
              <Text style={{ fontSize: 18, color: "#32325D" }}>
                {this.props.data.title}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Body style={{ flexWrap: "wrap", flexDirection: "column" }}>
                {this.cardDetail(
                  "Team Member",
                  this.props.data.teamMember,
                  null,
                  "users",
                  "Entypo"
                )}
                {this.cardDetail(
                  "Required Degree",
                  this.props.data.requireddegree,
                  null,
                  "graduation-cap",
                  "FontAwesome"
                )}
                {this.cardDetail(
                  "Company",
                  this.props.data.company,
                  null,
                  "office-building",
                  "MaterialCommunityIcons"
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
