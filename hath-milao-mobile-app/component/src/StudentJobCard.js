/* eslint-disable dot-notation */
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
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { Block } from "galio-framework";
import Modal from "react-native-modal";

export default class StudentJobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      isModalVisible: false,
      expanded: false
    };
  }
  async bounce() {
    this.refs.view.transition(
      {
        opacity: 0.6
      },
      { opacity: 1 },
      200,
      "bounceIn"
    );
    let newData = await this.props.data;
    newData["fromPage"] = this.props.fromPage;
    newData["appliedjob"] = this.props.appliedjob;
    newData["savedjob"] = this.props.savedjob;
    newData["id"] = this.props.id;
    newData["expire"] = this.props.expire ? true : false;
    // console.log(this.props.expire);

    setTimeout(
      () => this.props.navigation.navigate("Job_Detail", newData),
      200
    );
  }

  isDate() {
    const str = this.state.Jobs.applybefore;
    const d1 = new Date(str);
    const d2 = new Date();

    return d1 > d2;
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  onClick() {
    this.setState({ expanded: !this.state.expanded });
  }
  showExpanded() {
    if (!this.state.expanded) {
      return (
        <Button
          block
          style={{
            backgroundColor: "#5E72E4",
            top: 15,
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
      <View>
        <Text
          style={{ color: "#32325D", fontSize: 16, fontWeight: "bold", top: 5 }}
        >
          Specific Field
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", top: 3 }}>
          {this.renderArray(this.state.data.specific_field)}
        </View>

        <Text
          style={{ color: "#32325D", fontSize: 16, fontWeight: "bold", top: 5 }}
        >
          Required Degree
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", top: 3 }}>
          {this.renderArray(this.state.data.required_degree)}
        </View>

        <Text
          style={{ color: "#32325D", fontSize: 16, fontWeight: "bold", top: 5 }}
        >
          City
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", top: 3 }}>
          {this.renderArray(this.state.data.city)}
        </View>
        <View
          style={{
            flexDirection: "row",
            top: 30
          }}
        >
          <Button
            block
            style={[styles.showMoreButton, { width: "33%" }]}
            onPress={this.toggleModal}
          >
            <Text style={{ textAlign: "center", fontSize: 12 }}>Apply Now</Text>
          </Button>
          <Button block style={[styles.showMoreButton, { width: "23%" }]}>
            <Text style={{ textAlign: "center", fontSize: 12 }}>Save</Text>
          </Button>
          <Button
            block
            style={[styles.showMoreButton, { width: "35%" }]}
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
      </View>
    );
  }

  cardDetail(heading, detail, myColor, icon, fonttype) {
    return (
      <View
        style={{ flex: 1, flexDirection: "row", top: 2, alignItems: "center" }}
      >
        <View style={{ flex: 0.4, flexDirection: "row", alignItems: "center" }}>
          <Icon type={fonttype} name={icon} style={{ fontSize: 16 }} />
          <Text
            style={{
              color: "#32325D",
              fontSize: 16,
              fontWeight: "bold",
              left: 10
            }}
          >
            {heading}
          </Text>
        </View>
        <View style={{ flex: 0.6, flexWrap: "wrap", left: 8 }}>
          <Text style={{ color: myColor ? "#FB6340" : "#525F7F" }}>
            {detail}
          </Text>
        </View>
      </View>
    );
  }
  isDate() {
    const str = this.props.data.applybefore;
    const d1 = new Date(str);
    const d2 = new Date();

    return d1 > d2;
  }
  strSplit(date) {
    const str = String(date).split("T");
    return str[0];
  }

  render() {
    return (
      <Animatable.View ref="view">
        <TouchableWithoutFeedback onPress={() => this.bounce()}>
          <Card style={{}}>
            <CardItem
              header
              bordered
              style={{ backgroundColor: "#f4f4f4", padding: 10 }}
            >
              <Text style={{ color: "#32325D" }}>{this.props.data.title}</Text>
            </CardItem>
            <CardItem bordered>
              <Body style={{ flexWrap: "wrap" }}>
                {this.cardDetail(
                  "Company",
                  this.props.data.company,
                  null,
                  "institution",
                  "FontAwesome"
                )}
                {this.cardDetail(
                  "Job Type",
                  this.props.data.jobType,
                  null,
                  "graduation",
                  "SimpleLineIcons"
                )}
                {this.isDate()
                  ? this.cardDetail(
                      "Apply Before",
                      this.strSplit(this.props.data.applybefore),
                      null,
                      "calendar",
                      "FontAwesome"
                    )
                  : this.cardDetail(
                      "Apply Before",
                      this.strSplit(this.props.data.applybefore),
                      "red",
                      "calendar",
                      "FontAwesome"
                    )}

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
    backgroundColor: "#F5365C",
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
