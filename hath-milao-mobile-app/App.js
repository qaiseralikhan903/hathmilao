/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from "react";

import {
  TouchableHighlight,
  StatusBar,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  AsyncStorage
} from "react-native";

import { AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { light as lightTheme, mapping } from "@eva-design/eva";
import { View, Root } from "native-base";
import { ApplicationProvider } from "react-native-ui-kitten";
import Drawer from "./component/navigator/drawer";

class App extends Component {
  state = { fontsAreLoaded: false };

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ fontsAreLoaded: true });
  }

  async componentDidMount() {}

  render() {
    // const ret =  AsyncStorage.setItem("user", "");
    console.disableYellowBox = true;
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <View style={{ flex: 1 }}>
          <StatusBar hidden />
          <Root>
            <Drawer />
          </Root>
        </View>
      </ApplicationProvider>
    );
  }
}

export default App;
