/* eslint-disable global-require */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import { Image, AsyncStorage } from "react-native";
import { Icon, Button } from "native-base";
import { Logout } from "../../services/auth.service";

class DrawerMenu extends Component {
  constructor() {
    super();
    this.state = { selected: "Profile" };
  }

  getMenuSelectedStyle(text) {
    if (this.state.selected === text) {
      return { height: 50, backgroundColor: "#12caef", color: "white" };
    }
    return { height: 50, color: "#808080" };
  }

  getTextColor(text, iconColor) {
    if (this.state.selected === text)
      return { color: "white", fontWeight: "500" };

    return { color: "#808080", fontWeight: "normal" };
  }

  getIconColor(text, iconColor) {
    if (this.state.selected === text)
      return { color: "white", left: 10, top: 10 };

    return { color: iconColor, left: 10, top: 10 };
  }

  navLink(nav, text, icon, iconType, iconColor) {
    return (
      <TouchableOpacity
        style={[this.getMenuSelectedStyle(text)]}
        onPress={async () => {
          this.setState({ selected: text });
          if (text === "Logout") {
            // console.log("clicked");
            await Logout();
            this.props.navigation.navigate(nav);
          } else {
            this.props.navigation.navigate(nav);
          }
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 0.1, bottom: 5 }}>
            <Icon
              type={iconType}
              name={icon}
              style={this.getIconColor(text, iconColor)}
            />
          </View>
          <View style={{ flex: 0.7, bottom: 5 }}>
            <Text
              style={[
                this.getTextColor(text, iconColor),
                { marginLeft: 30, top: 10 }
              ]}
            >
              {text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.topLink}>
          <Text
            style={{
              fontFamily: "sans-serif-medium",
              fontSize: 30,
              color: "#5E72E4"
            }}
          >
            Hath Milao
          </Text>
        </View>
        <View style={styles.bottomLink}>
          {this.navLink("Profile", "Profile", "user", "FontAwesome", "#ffd600")}
          {this.navLink(
            "Jobs",
            "Jobs",
            "graduation-cap",
            "FontAwesome",
            "#5e72e4"
          )}
          {this.navLink(
            "Events",
            "Events",
            "briefcase",
            "FontAwesome",
            "#8898aa"
          )}
          {this.navLink(
            "Company",
            "Company",
            "home-modern",
            "MaterialCommunityIcons",
            "#fb6340"
          )}
          {this.navLink("Challenge", "Challenges", "trophy", "FontAwesome","#11CDEF")}
          {this.navLink("FYP", "Final Year Project", "book-open", "Feather", "#5E72E4")}
          {/* {this.navLink("Messages", "Messages", "chat", "Entypo")} */}
          {this.navLink("Conversations", "Messages", "chat", "Entypo")}
          {/* {this.navLink("SingleChat", "SingleChat", "chat", "Entypo")} */}
          {this.navLink("LoginPage", "Logout", "logout", "SimpleLineIcons")}
        </View>
      </View>
    );
  }
}

const styles = {
  topLink: {
    height: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomLink: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 400
  },
  link: {
    flex: 1,
    fontSize: 20,
    padding: 6,
    paddingLeft: 14,
    margin: 5,
    textAlign: "left"
  }
};

export default DrawerMenu;
