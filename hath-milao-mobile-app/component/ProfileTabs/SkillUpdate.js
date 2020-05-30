/* eslint-disable camelcase */
/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unused-expressions */
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
import {
  ScrollView,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  RefreshControl
} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon,
  ListItem
} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import config from "../../util/config.json";
// Services
import { UpdateOther as Edit_Other } from "../../services/profile/Other.service";

export default class SkillsUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: null,
      language: null,
      cvurl: null,
      looking: null,
      desiredjob: null,
      array: [],
      current: "",
      currentError: false,
      refreshing: false,
      success: false,
      error: false,
      visible: false
    };
  }
  async componentWillMount() {
    const data = this.props.navigation.getParam("data", "");

    await this.setState({
      skill: data.skill,
      language: data.language ? data.language : [],
      cvurl: "Http://HElloWOrld.com/KalBilalKarayga",
      looking: data.looking ? data.looking : false,
      desiredjob: "desired",
      array: data.skill ? data.skill : []
    });
  }

  onAddPress() {
    if (this.state.current) {
      // let result = this.arraySearch(this.state.array, this.state.current);
      // console.log(result);
      const item = String(this.state.current);
      const item1 = item.toLowerCase();
      // console.log(this.state.array.length);
      if (this.state.array.length === 0) {
        this.setState({ currentError: false, current: "" });
        const arr = this.state.array;
        arr.push(item1);
      } else if (
        !this.state.array.includes(this.state.current) &&
        !this.state.array.includes(item1)
      ) {
        this.setState({ currentError: false, current: "" });
        const arr = this.state.array;
        arr.push(item1);
      } else {
        this.setState({ currentError: true });
      }

      // console.log(this.state.array);
    } else {
      this.setState({ currentError: true });
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function(ele) {
      return ele !== value;
    });
  }

  listItem(item) {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, flexDirection: "row", marginLeft: 15 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 5 }}>
            {item}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
          <Button
            transparent
            style={{}}
            onPress={() => {
              const result = this.arrayRemove(this.state.array, item);
              this.setState({ array: result });
            }}
          >
            <Text>
              <Icon
                type="Entypo"
                name="cross"
                style={{
                  position: "absolute",
                  color: "black",
                  fontSize: 25
                }}
              />
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  async onUpdate() {
    const data = await this.state.array;
    // console.log(data);
    await this.setState({ visible: true, skill: data });
    // console.log(this.state);
    Edit_Other(this.state)
      .then(response => {
        this.setState({
          success: true,
          error: false,
          visible: false
        });
      })
      .catch(e => {
        if (e) {
          console.log(e);
          this.setState({
            success: false,
            error: true,
            visible: false
          });
        }
        this.props.navigation.navigate("ErrorScreen");
      });
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
            Skills not Updated
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
            Skills Updated Successfully
          </Text>
        </View>
      );
    }
    return null;
  }
  render() {
    return (
      <Container>
        <Spinner
          visible={this.state.visible}
          textContent="Updating Skills"
          textStyle={{
            color: "black"
          }}
        />
        <Content>
          <View style={{ flex: 1, flexDirection: "column" }}>
            {this.showError()}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 0.6 }}>
                <Item
                  style={{ height: 50 }}
                  regular
                  error={this.state.currentError}
                >
                  <Input
                    onChangeText={value => {
                      this.setState({ current: value });
                    }}
                    value={this.state.current}
                  />
                </Item>
              </View>
              <View style={{ flex: 0.17 }}>
                <Button
                  style={{ height: 50 }}
                  success
                  onPress={() => {
                    this.onAddPress();
                  }}
                >
                  <Text>
                    <Icon
                      type="Ionicons"
                      name="md-add"
                      style={{
                        position: "absolute",
                        color: "white",
                        fontSize: 25
                      }}
                    />
                  </Text>
                </Button>
              </View>
              <View style={{ flex: 0.3, marginLeft: 2 }}>
                <Button
                  style={{ height: 50 }}
                  primary
                  onPress={() => {
                    this.onUpdate();
                  }}
                >
                  <Text>Update</Text>
                </Button>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <ScrollView>
                <FlatList
                  data={this.state.array}
                  renderItem={({ item }) => this.listItem(item)}
                  keyExtractor={item => item}
                  extraData={this.state}
                />
              </ScrollView>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
