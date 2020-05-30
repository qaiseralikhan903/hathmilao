/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-string-refs */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
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
  View,
  Card,
  CardItem,
  Text as NativeText
} from "native-base";
import {} from "galio-framework";
import { Text, Icon as reactnativeIcon } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import HTMLView from "react-native-htmlview";
import { DangerToast, SuccessToast } from "../src/MyToast";
import {
  SaveJob,
  ApplyJob,
  CancelAppliedJob,
  UnSaveJob
} from "../../services/job.service";

export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apply: false,
      save: false
    };

    // expire: this.props.navigation.getParam("expire", "")
  }

  async componentWillMount() {
    const { navigation } = this.props;
    const fPage = navigation.getParam("fromPage", "");
    const savedjob = navigation.getParam("savedjob", "");
    const appliedjob = navigation.getParam("appliedjob", "");
    const id = navigation.getParam("id", "");
    const jobId = navigation.getParam("_id", "NO-ID");

    if (fPage === "save") {
      await this.setState({ save: true });
    } else if (fPage === "apply") {
      await this.setState({ apply: true });
    }

    this.checkAppliedJob(appliedjob, jobId);
    this.checkSavedJob(savedjob, jobId);
  }

  checkSavedJob(jobs, jobId) {
    if (jobs) {
      jobs.forEach(item => {
        if (item === jobId) {
          this.setState({ save: true });
        }
      });
    }
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
  checkAppliedJob(jobs, jobId) {
    if (jobs) {
      jobs.forEach(item => {
        if (item === jobId) {
          this.setState({ apply: true });
        }
      });
    }
  }

  bounce() {
    this.refs.view.animate({ 0: { opacity: 0 }, 1: { opacity: 1 } });
  }
  cardItemWithoutArray(heading, detail, myColor) {
    return (
      <View style={{ flex: 1, flexDirection: "row", top: 10 }}>
        <View style={{ flex: 0.3 }}>
          <Text
            style={{
              color: "#32325D",
              fontSize: 16,
              fontWeight: "bold"
            }}
          >
            {heading}
          </Text>
        </View>
        <View style={{ flex: 0.7, flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ color: myColor ? "#FB6340" : "#525F7F" }}>
            {detail}
          </Text>
        </View>
      </View>
    );
  }
  cardDetailWithoutArray(heading, detail, myColor) {
    return (
      <View style={{ flex: 1, flexDirection: "row", top: 10 }}>
        <View style={{ flex: 0.3 }}>
          <Text
            style={{
              color: "#32325D",
              fontSize: 16,
              fontWeight: "bold"
            }}
          >
            {heading}
          </Text>
        </View>
        <View style={{ flex: 0.7, flexDirection: "row", flexWrap: "wrap" }}>
          <Text>{"       "}</Text>
          <HTMLView value={detail} />
          <Text>{"       "}</Text>
        </View>
      </View>
    );
  }

  cardItemWithArray(heading, detail) {
    return (
      <CardItem bordered>
        <Body>
          <NativeText
            style={{ color: "#32325D", fontSize: 16, fontWeight: "bold" }}
          >
            {heading}
          </NativeText>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.renderArray(detail)}
          </View>
        </Body>
      </CardItem>
    );
  }
  strSplit(date) {
    const str = String(date).split("T");
    return str[0];
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
          <NativeText style={{ textAlign: "center" }}>{item}</NativeText>
        </Button>
      );
    });

    return items;
  }

  renderApplyButton() {
    // console.log(this.state.expire);
    if (this.state.expire || !this.isDate()) {
      // console.log("jsdhfhsd");
      return null;
    }
    // console.log(this.state.apply);
    if (this.state.apply) {
      return (
        <Button
          block
          ref="btn"
          bordered
          style={{
            bottom: 15,
            elevation: 3,
            width: "80%",
            borderRadius: 11
          }}
          onPress={() => {
            this.setState({ apply: false });
            SuccessToast("Job Cancelled Successfully");
            CancelAppliedJob(
              this.props.navigation.getParam("_id", "NO-Salary")
            );
          }}
        >
          <NativeText style={{ color: "#5E72E4" }}>Cancel</NativeText>
        </Button>
      );
    }
    return (
      <Button
        block
        ref="btn"
        bordered
        style={{
          bottom: 15,
          elevation: 3,
          width: "80%",
          borderRadius: 11
        }}
        onPress={() => {
          ApplyJob(this.props.navigation.getParam("_id", "NO-Salary"));
          this.setState({ apply: true });
          SuccessToast("Job Applied Successfully");
        }}
      >
        <NativeText style={{ color: "#5E72E4" }}>apply now</NativeText>
      </Button>
    );
  }

  renderSaveIcon() {
    const fPage = this.props.navigation.getParam("fromPage", "");
    if (fPage === "apply") {
      return null;
    }
    if (this.state.save) {
      return (
        <Button
          transparent
          style={{
            flexDirection: "row-reverse",
            flexWrap: "wrap",
            width: "40%"
          }}
          onPress={() => {
            UnSaveJob(this.props.navigation.getParam("_id", "NO-Salary"));
            this.setState({ save: false });
            // console.log("unsave");
            SuccessToast("Job Unsaved Successfully");
          }}
        >
          <Icon
            type="MaterialIcons"
            style={{ color: "#32325D", fontSize: 30 }}
            name="bookmark"
          />
        </Button>
      );
    }
    return (
      <Button
        transparent
        style={{
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          width: "40%"
        }}
        onPress={() => {
          SaveJob(this.props.navigation.getParam("_id", "NO-Salary"));
          this.setState({ save: true });
          // console.log("save");
          SuccessToast("Job Saved Successfully");
        }}
      >
        <Icon
          type="MaterialIcons"
          style={{ color: "#32325D", fontSize: 30 }}
          name="bookmark-border"
        />
      </Button>
    );
  }

  isDate() {
    const str = this.props.navigation.getParam("applybefore", "no date");
    const d1 = new Date(str);
    const d2 = new Date();

    return d1 > d2;
  }

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "NO-ID");
    const description = String(
      navigation.getParam("description", "NO-description")
    );
    const d = description.split("<p>");
    const d1 = String(d[1]).split("</p>");
    const jobType = navigation.getParam("jobType", "NO-jobType");
    const totalposition = navigation.getParam(
      "totalposition",
      "NO-totalposition"
    );
    const min = navigation.getParam("minsalary", "NO-Salary");
    const max = navigation.getParam("maxsalary", "NO-Salary");
    const salary = `${min} - ${max} Rs`;

    const minex = navigation.getParam("minexperience", "NO-experience");
    const maxex = navigation.getParam("maxexperience", "NO-experience");
    const experience = `${minex} - ${maxex} Years`;

    const field = navigation.getParam("field", "NO-field");
    const city = navigation.getParam("city", "NO-city");
    const country = navigation.getParam("country", "NO-country");
    const requiredSkill = navigation.getParam("requiredSkill", "NO-skills");
    // console.log(this.props.navigation.getParam("_id", "NO-Salary"));
    return (
      <Container>
        <Header style={{ backgroundColor: "white" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon style={{ color: "#32325D" }} name="arrow-back" />
              <Text
                style={{ color: "#32325D", fontSize: 20, fontWeight: "500" }}
              >
                Detail
              </Text>
            </Button>
          </View>
        </Header>
        <ScrollView style={{ marginLeft: 5, marginRight: 5 }}>
          <Card style={{ marginTop: 10, marginLeft: 5, marginRight: 5 }}>
            <CardItem header bordered>
              <NativeText>
                {this.props.navigation.getParam("company", "no-company name")}
              </NativeText>
              <Right>{this.renderSaveIcon()}</Right>
            </CardItem>
            <CardItem bordered>
              <Body>
                {this.cardItemWithoutArray("Title", title)}
                {this.cardItemWithoutArray("Job Type", jobType)}
                {this.cardItemWithoutArray("Total Positions", totalposition)}
                {this.cardItemWithoutArray("Salary", salary)}
                {this.cardItemWithoutArray("Experience", experience)}

                {this.isDate()
                  ? this.cardItemWithoutArray(
                      "Apply Before",
                      this.strSplit(
                        this.props.navigation.getParam("applybefore", "no date")
                      ),
                      null,
                      "calendar",
                      "FontAwesome"
                    )
                  : this.cardItemWithoutArray(
                      "Apply Before",
                      this.strSplit(
                        this.props.navigation.getParam("applybefore", "no date")
                      ),
                      "red",
                      "calendar",
                      "FontAwesome"
                    )}

                {/* {this.cardDetailWithoutArray("Description", description)} */}
              </Body>
            </CardItem>

            {this.cardItemWithArray("Required Skills", requiredSkill)}
            {this.cardItemWithArray("Field", field)}
            {this.cardItemWithArray("City", city)}
            {this.cardItemWithArray("Country", country)}
            <CardItem>
              {this.cardDetailDescription("Description", description)}
            </CardItem>
            <CardItem>
              <Animatable.View
                ref="view"
                duration={1000}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20
                }}
              >
                {this.renderApplyButton()}
              </Animatable.View>
              <Text />
            </CardItem>
          </Card>
        </ScrollView>
      </Container>
    );
  }
}
