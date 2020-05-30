/* eslint-disable react/no-did-update-set-state */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable react/state-in-constructor */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-fragments */
import React from "react";
import { View, StyleSheet } from "react-native";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";

// import { switchLanguage } from "../../redux/actions/language.action";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons
} from "@expo/vector-icons";
import {
  TopNavigationAction,
  TopNavigation,
  Text,
  Button
} from "react-native-ui-kitten";
// import { SafeAreaView } from "./safeAreaView.component";
// import Modal from "react-native-modal";
// import Hr from "react-native-hr-component";
// import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

class ChatHeaderComponent extends React.Component {
  state = {
    // lang: this.props.language.current
  };

  items = [{ text: "اردو" }, { text: "English" }];

  componentDidMount() {
    // StatusBar.setHidden(true);
    console.log(this.props.language);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language.current !== this.props.language.current) {
      const updatedLang = this.props.language.current;
      await this.setState({
        lang: updatedLang
      });
    }
  }

  onLeftControlPress = () => {
    // Handle Left Control press
    this.props.navigation.goBack();
  };

  onItemSelect = index => {
    const language = this.items[index].text;
    // this.props.switchLanguage(language);
    // this.toggleMenu();
  };

  onRightControlPress = () => {
    //   Implement Fetching Implementation about Expert and analyzed predictions.
    this.props.onInfoButtonPressed();
  };

  renderControlIcon = style => {
    return <Ionicons name="ios-arrow-round-back" size={22} />;
  };
  renderRightControlIcon = style => {
    return <Ionicons name="md-information-circle-outline" size={22} />;
  };

  renderLeftControl = () => {
    return (
      <TopNavigationAction
        icon={this.renderControlIcon}
        onPress={this.onLeftControlPress}
      />
    );
  };

  renderRightControl = () => {
    return (
      <TopNavigationAction
        icon={this.renderRightControlIcon}
        onPress={this.onRightControlPress}
      />
    );
  };

  render() {
    const user = this.props.user;
    const isActive = user.isActive;
    const lastSeenAt = user.lastSeenAt;
    const isTyping = this.props.isTyping;
    console.log("Is User Active: ", isActive);
    console.log("User Last Seen: ", lastSeenAt);
    return (
      <React.Fragment>
        <View>
          <View>
            <TopNavigation
              title={user.nickname}
              subtitle={
                isTyping
                  ? this.state.lang === "English"
                    ? "typing..."
                    : "typing..."
                  : user.isActive && lastSeenAt === 0
                  ? this.state.lang === "English"
                    ? "Online"
                    : "Online"
                  : this.state.lang === "English"
                  ? // eslint-disable-next-line prefer-template
                    "Active " +
                    moment(lastSeenAt)
                      .locale(this.state.lang === "English" ? "en" : "en")
                      .fromNow()
                  : moment(lastSeenAt)
                      .locale(this.state.lang === "English" ? "en" : "en")
                      .fromNow() + "  "
              }
              subtitleStyle={{
                color: isActive || isTyping ? "green" : "grey"
              }}
              alignment="center"
              leftControl={this.renderLeftControl()}
              rightControls={this.renderRightControl()}
              titleStyle={{ fontSize: 18 }}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5
              }}
            />
          </View>
        </View>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => {
//   const { language } = state;
//   return { language };
// };

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       switchLanguage
//     },
//     dispatch
//   );

// const ChatTopBar = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ChatHeaderComponent);

export default ChatHeaderComponent;
