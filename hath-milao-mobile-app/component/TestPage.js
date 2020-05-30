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
import config from "../util/config.json";

export default class SkillsUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: ["skilss"],
      current: "",
      currentError: false,
      refreshing: false
    };
  }

  onAddPress() {
    if (this.state.current) {
      // let result = this.arraySearch(this.state.array, this.state.current);
      // console.log(result);
      const item = String(this.state.current);
      const item1 = item.toLowerCase();
      if (
        !this.state.array.includes(this.state.current) &&
        !this.state.array.includes(item1)
      ) {
        this.setState({ currentError: false, current: "" });
        const arr = this.state.array;
        arr.push(this.state.current);
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

  render() {
    return (
      <Container>
        <Content>
          <View style={{ flex: 1, flexDirection: "column" }}>
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
                <Button style={{ height: 50 }} primary>
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
