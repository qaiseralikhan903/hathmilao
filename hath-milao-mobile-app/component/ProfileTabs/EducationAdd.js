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
import { AddEducation as Add_Education } from "../../services/profile/Education.service";

import { getCurrentUser } from "../../services/auth.service";

export default class EducationAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      campus: "",
      degree: "",
      description: "",
      field: "",
      institution: "",
      country: "",
      startdate: "",
      enddate: "",
      loading: false,
      isStartDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
      visible: false,
      cE: false,
      degE: false,
      disE: false,
      fieE: false,
      InsE: false,
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
            Education not added
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
            Education Added Successfully
          </Text>
        </View>
      );
    }
    return null;
  }

  async EdUpdate() {
    if (!this.state.campus) {
      await this.setState({ cE: true });
    } else {
      await this.setState({ cE: false });
    }

    if (!this.state.degree) {
      await this.setState({ degE: true });
    } else {
      await this.setState({ degE: false });
    }

    if (!this.state.description) {
      await this.setState({ disE: true });
    } else {
      await this.setState({ disE: false });
    }

    if (!this.state.field) {
      await this.setState({ fieE: true });
    } else {
      await this.setState({ fieE: false });
    }

    if (!this.state.institution) {
      await this.setState({ InsE: true });
    } else {
      await this.setState({ InsE: false });
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
      !this.state.cE &&
      !this.state.disE &&
      !this.state.degE &&
      !this.state.fieE &&
      !this.state.InsE &&
      !this.state.startE &&
      !this.state.endE
    ) {
      this.setState({ visible: true, success: false, error: false });
      let data = this.state;
      Add_Education(data)
        .then(response => {
          this.setState({
            visible: false,
            campus: null,
            degree: null,
            description: null,
            field: null,
            institution: null,
            country: null,
            startdate: null,
            enddate: null,
            success: true,
            error: false
          });
        })
        .catch(e => {
          this.props.navigation.navigate("ErrorScreen");
          if (e) {
            console.log(e);
            this.setState({ visible: false, success: true, error: false });
          }
        });
    }
  }
  renderEndButtonType = () => {
    if (this.state.startE) {
      console.log("end button if", this.state.startE);
      return true;
    } else {
      console.log("end button else", this.state.startE);
      return false;
    }
  };
  renderStartButtonType = () => {
    if (this.state.startE) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    return (
      <Container>
        <Spinner
          visible={this.state.visible}
          textContent="Adding Education"
          textStyle={{
            color: "#FFF"
          }}
        />
        <Content>
          <ScrollView style={{ flexWrap: "wrap", flex: 1 }}>
            <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={50}>
              <Form>
                {this.showError()}
                <Item stackedLabel last error={this.state.cE}>
                  <Label>Campus</Label>
                  <Input
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.refs.degree._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    placeholder="Islamabad, Rawalpindi"
                    onChangeText={campus => this.setState({ campus })}
                    value={this.state.campus}
                  />
                </Item>
                <Item
                  style={{ padding: 0 }}
                  stackedLabel
                  last
                  error={this.state.degE}
                >
                  <Label>Degree</Label>
                  <Input
                    returnKeyType="next"
                    ref="Degree"
                    onSubmitEditing={() => {
                      this.refs.description._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    placeholder="BSCS"
                    onChangeText={degree => this.setState({ degree })}
                    value={this.state.degree}
                  />
                </Item>
                <Item stackedLabel last error={this.state.disE}>
                  <Label>Decription</Label>
                  <Input
                    multiline
                    returnKeyType="next"
                    ref="description"
                    onSubmitEditing={() => {
                      this.refs.field._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    onChangeText={description => this.setState({ description })}
                    value={this.state.description}
                  />
                </Item>
                <Item stackedLabel last error={this.state.fieE}>
                  <Label>Field</Label>
                  <Input
                    returnKeyType="next"
                    ref="field"
                    onSubmitEditing={() => {
                      this.refs.institution._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    onChangeText={field => this.setState({ field })}
                    value={this.state.field}
                  />
                </Item>

                <Item stackedLabel last error={this.state.InsE}>
                  <Label>Institution</Label>
                  <Input
                    ref="institution"
                    onChangeText={institution => this.setState({ institution })}
                    value={this.state.institution}
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
