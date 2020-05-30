/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable object-shorthand */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-state */
/* eslint-disable global-require */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { ScrollView, Image, View, TouchableHighlight } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "react-native-modal-datetime-picker";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";
import config from "../../util/config.json";
// Services
import { AddExperience as Add_Experience } from "../../services/profile/Experience.service";

import { getCurrentUser } from "../../services/auth.service";

export default class ExperienceAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      title: "",
      company: "",
      city: "",
      country: "",
      description: "",
      startdate: "",
      enddate: "",
      loading: false,
      isStartDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
      visible: false,
      titE: false,
      comE: false,
      disE: false,
      citE: false,

      CouE: false,
      startE: false,
      endE: false,
      error: false,
      success: false
    };
  }
  async componentWillMount() {
    if (getCurrentUser()) {
      const { user } = await getCurrentUser();
      this.setState({
        userid: user.id
      });
    }
  }

  // console.log(result);

  showStartDateTimePicker = () => {
    this.setState({ isStartDateTimePickerVisible: true });
  };

  showEndDateTimePicker = () => {
    this.setState({ isEndDateTimePickerVisible: true });
  };
  hideEndDateTimePicker = () => {
    this.setState({ isEndDateTimePickerVisible: false });
  };
  hideStartDateTimePicker = () => {
    this.setState({ isStartDateTimePickerVisible: false });
  };

  handleStartDatePicked = async date => {
    await this.setState({ startdate: date });
    // console.log("A date has been picked: ", this.state.startdate);
    this.hideStartDateTimePicker();
  };
  handleEndDatePicked = async date => {
    await this.setState({ enddate: date });
    // console.log("A date has been picked: ", this.state.enddate);
    this.hideEndDateTimePicker();
  };
  strSplit(date) {
    if (date) {
      return new Date(date).toDateString();
    }
    return "";
  }

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
            Experience not added
          </Text>
        </View>
      );
    } else if (this.state.success) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#d4edda",
            minHeight: 35,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8
          }}
        >
          <Text
            style={{
              color: "#155724",
              borderColor: "#155724",

              fontSize: 12,
              fontWeight: "400"
            }}
          >
            Experience Added Successfully
          </Text>
        </View>
      );
    }
    return null;
  }

  async EdUpdate() {
    if (!this.state.title) {
      await this.setState({ titE: true });
    } else {
      await this.setState({ titE: false });
    }

    if (!this.state.company) {
      await this.setState({ comE: true });
    } else {
      await this.setState({ comE: false });
    }

    if (!this.state.description) {
      await this.setState({ disE: true });
    } else {
      await this.setState({ disE: false });
    }

    if (!this.state.city) {
      await this.setState({ citE: true });
    } else {
      await this.setState({ citE: false });
    }

    if (!this.state.country) {
      await this.setState({ CouE: true });
    } else {
      await this.setState({ CouE: false });
    }

    if (!this.state.startdate) {
      await this.setState({ startE: true });
    } else {
      await this.setState({ startE: false });
    }

    if (!this.state.enddate) {
      await this.setState({ endE: true });
    } else {
      await this.setState({ endE: false });
    }

    if (this.state.startdate && this.state.enddate) {
      let sDate = new Date(this.state.startdate);
      let eDate = new Date(this.state.enddate);

      if (sDate < eDate) {
        await this.setState({ endE: false, startE: false });
      } else {
        await this.setState({ endE: true, startE: true });
      }
    }

    if (
      !this.state.titE &&
      !this.state.disE &&
      !this.state.comE &&
      !this.state.citE &&
      !this.state.CouE &&
      !this.state.startE &&
      !this.state.endE
    ) {
      this.setState({ visible: true, success: false, error: false });
      let data = this.state;
      Add_Experience(data)
        .then(response => {
          this.setState({
            visible: false,
            title: "",
            company: "",
            city: "",
            country: "",
            description: "",
            startdate: "",
            enddate: "",
            success: true,
            error: false
          });
        })
        .catch(e => {
          if (e) {
            console.log(e);
            this.setState({ visible: false, success: true, error: false });
          }
          this.props.navigation.navigate("ErrorScreen");
        });
    }
  }

  render() {
    return (
      <Container>
        <Spinner
          visible={this.state.visible}
          textContent="Adding Experience"
          textStyle={{
            color: "black"
          }}
        />
        <Content>
          <ScrollView style={{ flexWrap: "wrap", flex: 1 }}>
            <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={50}>
              <Form>
                {this.showError()}
                <Item stackedLabel last error={this.state.titE}>
                  <Label>Title</Label>
                  <Input
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.refs.company._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    placeholder="Jr. Front End Developer"
                    onChangeText={title => this.setState({ title })}
                    value={this.state.title}
                  />
                </Item>
                <Item
                  style={{ padding: 0 }}
                  stackedLabel
                  last
                  error={this.state.comE}
                >
                  <Label>Company</Label>
                  <Input
                    returnKeyType="next"
                    ref="company"
                    onSubmitEditing={() => {
                      this.refs.description._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    placeholder="Name of Company"
                    onChangeText={company => this.setState({ company })}
                    value={this.state.company}
                  />
                </Item>
                <Item stackedLabel last error={this.state.disE}>
                  <Label>Decription</Label>
                  <Input
                    multiline
                    returnKeyType="next"
                    ref="description"
                    placeholder="What you learned there?"
                    onSubmitEditing={() => {
                      this.refs.city._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    onChangeText={description => this.setState({ description })}
                    value={this.state.description}
                  />
                </Item>
                <Item stackedLabel last error={this.state.citE}>
                  <Label>City</Label>
                  <Input
                    returnKeyType="next"
                    ref="city"
                    onSubmitEditing={() => {
                      this.refs.country._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    placeholder="rawalpindi, islamabad,..."
                    onChangeText={city => this.setState({ city })}
                    value={this.state.city}
                  />
                </Item>

                <Item stackedLabel last error={this.state.CouE}>
                  <Label>Country</Label>
                  <Input
                    ref="country"
                    placeholder="Pakistan"
                    onChangeText={country => this.setState({ country })}
                    value={this.state.country}
                  />
                </Item>
              </Form>
            </KeyboardAwareScrollView>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                top: 10,
                justifyContent: "center"
              }}
            >
              <View style={{ flex: 0.9 }}>
                <Button
                  bordered
                  info
                  onPress={this.showStartDateTimePicker}
                  style={{ borderColor: this.state.startE ? "red" : "blue" }}
                >
                  <Text>
                    Start Date :{" "}
                    {this.state.startdate
                      ? this.strSplit(this.state.startdate)
                      : "Select date"}
                  </Text>
                </Button>
                <DateTimePicker
                  isVisible={this.state.isStartDateTimePickerVisible}
                  onConfirm={this.handleStartDatePicked}
                  onCancel={this.hideStartDateTimePicker}
                />
              </View>
              {/* <View style={{ flex: 0.7 }}>
                <Item error={this.state.startE}>
                  <Input
                    value={this.strSplit(this.state.startdate)}
                    editable={false}
                    placeholder="dd-mm-yy"
                  />
                </Item>
              </View> */}
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                top: 20,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View style={{ flex: 0.9 }}>
                <Button
                  bordered
                  info
                  onPress={this.showEndDateTimePicker}
                  style={{ borderColor: this.state.endE ? "red" : "blue" }}
                >
                  <Text>
                    End Date :{" "}
                    {this.state.enddate
                      ? this.strSplit(this.state.enddate)
                      : "Select date"}
                  </Text>
                </Button>
                <DateTimePicker
                  isVisible={this.state.isEndDateTimePickerVisible}
                  onConfirm={this.handleEndDatePicked}
                  onCancel={this.hideEndDateTimePicker}
                />
              </View>
              {/* <View style={{ flex: 0.7 }}>
                <Item error={this.state.endE}>
                  <Input
                    onFocus={this.handleEndDatePicked}
                    value={this.strSplit(this.state.enddate)}
                    editable={false}
                    placeholder="dd-mm-yy"
                  />
                </Item>
              </View> */}
            </View>
           
            
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                marginTop: 40,
                right: 10,
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              <Button
                danger
                style={{ elevation: 8, width: 100 }}
                onPress={() => this.EdUpdate()}
              >
                <Text>Add</Text>
              </Button>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ color: "white" }}>hdfk</Text>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
