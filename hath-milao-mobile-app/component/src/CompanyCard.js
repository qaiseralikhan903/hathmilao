/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
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
  Icon,
  Spinner
} from "native-base";
import * as Animatable from "react-native-animatable";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  WebView
} from "react-native";
import { DangerToast, SuccessToast } from "./MyToast";
import { Block } from "galio-framework";
import Modal from "react-native-modal";
import HTMLView from "react-native-htmlview";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  FollowCompany,
  UnFollowCompany,
  AddToContact,
  RemoveContact
} from "../../services/company.service";
import { sb } from "../../services/chat.init";
import config from "../../util/config.json";

const { width, height } = Dimensions.get("window");
let f = 1;
export default class CompanyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      isModalVisible: false,
      expanded: false,
      contactAdded: false,
      addingToContact: false,
      followed: false,
      image:
        "https://www.putneyhigh.gdst.net/wp-content/uploads/2018/06/person-placeholder-male-5.jpg"
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
  componentDidMount() {
    this.checkFollower();
    this.checkContact();
    const imageURL = `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${this.props.data.imageurl}`;
    if (imageURL) {
      this.setState({
        image: imageURL
      });
    }
  }

  checkContact() {
    let checkContact =
      this.props.data.studentContacts.indexOf(this.props.user_id) > -1;

    this.setState({ contactAdded: checkContact });
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

  showExpanded() {
    if (!this.state.expanded) {
      return (
        <View
          style={{
            width: width * 0.9,
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{ width: width * 0.9, alignItems: "center" }}
            onPress={this.onClick.bind(this)}
          >
            <Text style={{ color: "#32325D" }}>
              <Icon type="Ionicons" name="ios-arrow-down" />
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        style={{ flexDirection: "column" }}
      >
        <Text />

        <View
          style={{
            width: width * 0.9,
            flexDirection: "column"
          }}
        >
          {this.cardDetailDescription(
            "Description",
            this.props.data.description,
            null,
            "description",
            "MaterialIcons"
          )}
          {this.cardDetail(
            "Specialities",
            this.detailArray(this.props.data.specialties),
            null,
            "grade",
            "MaterialIcons"
          )}
          {this.cardDetail(
            "Cities",
            this.detailArray(this.props.data.city),
            null,
            "location",
            "Entypo"
          )}
          {this.cardDetail(
            "Countries",
            this.detailArray(this.props.data.country),
            null,
            "map",
            "Entypo"
          )}
          <Text />
          <Text />
          <View
            style={{
              width: width * 0.9,
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{ width: width * 0.9, alignItems: "center" }}
              onPress={this.onClick.bind(this)}
            >
              <Text style={{ color: "#32325D" }}>
                <Icon type="Ionicons" name="ios-arrow-up" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  }

  STRIPHTML(myString) {
    const regex = /(<([^>]+)>)/gi;
    const result = myString.replace(regex, "");
    return result;
  }

  countFollowers() {
    const followers = this.props.data.followers;
    // console.log(followers);

    if (followers) {
      return followers.length;
    }

    return 0;
  }

  detailArray(array) {
    if (array) {
      let str = "";
      let len = 0;
      array.forEach(element => {
        len += 1;
        if (len === array.length) {
          str += element;
        } else {
          str += `${element}, `;
        }
      });
      return str;
    }

    return "N/A";
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
        <View style={{ flexWrap: "wrap", marginTop: 5 }}>
          <Text
            style={{
              color: myColor ? "#FB6340" : "#525F7F",
              top: 15,
              fontSize: 14
            }}
          >
            {"       "}
            {this.STRIPHTML(detail)}
          </Text>
        </View>
      </View>
    );
  }

  startFollowing() {
    if (this.state.followed) {
      // console.log(this.props.data.userid);
      UnFollowCompany(this.props.data.userid);
      this.setState({ followed: false });
      SuccessToast("Company Unfollowed");
    } else {
      FollowCompany(this.props.data.userid);
      this.setState({ followed: true });
      SuccessToast("Company Followed");
    }
  }

  checkFollower() {
    // console.log(this.props.data.followers);
    // console.log(this.props.data);
    const b = this.props.data.followers.indexOf(this.props.user_id) > -1;
    // console.log(b);
    this.setState({ followed: b });
  }

  handleAddToContact() {
    this.setState({ addingToContact: true });
    AddToContact(this.props.data.userid);

    const isOneToOne = true;
    const companyid = this.props.data.userid;
    const userid = this.props.user_id;
    sb.connect(userid, (user, err) => {
      if (err) {
        console.log(err);
        return;
      }
      sb.reconnect();
    });
    console.log("User: ", userid);
    console.log("Company ID: ", companyid);
    sb.GroupChannel.createChannelWithUserIds(
      [userid, companyid],
      isOneToOne,
      (conversation, error) => {
        if (!error) {
          this.setState({ contactAdded: true, addingToContact: false });
        } else {
          this.setState({ addingToContact: false });
          RemoveContact(this.props.data.userid);
          console.log(error);
        }
      }
    );
  }

  render() {
    return (
      <Animatable.View>
        <TouchableWithoutFeedback>
          <Card>
            <CardItem style={{ backgroundColor: "#f4f4f4" }} header bordered>
              <Icon
                type="MaterialIcons"
                name="title"
                style={{ fontSize: 18, color: "#32325D" }}
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 18, color: "#32325D" }}>
                  {this.props.data.name}
                </Text>
                <Text note>{this.props.data.industry}</Text>
              </View>
              <Right>
                <Button
                  transparent
                  style={{
                    flexDirection: "row-reverse",
                    flexWrap: "wrap",
                    width: "50%",
                    padding: 0
                  }}
                  onPress={() => this.startFollowing()}
                >
                  {this.state.followed ? (
                    <Icon
                      type="SimpleLineIcons"
                      style={{ color: "#32325D", fontSize: 25 }}
                      name="user-following"
                    />
                  ) : (
                    <Icon
                      type="SimpleLineIcons"
                      style={{ color: "#32325D", fontSize: 25 }}
                      name="user-unfollow"
                    />
                  )}
                </Button>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Body style={{ flexWrap: "wrap", flexDirection: "column" }}>
                <View
                  style={{
                    width: width * 0.9,
                    flexDirection: "row"
                  }}
                >
                  <View style={{ width: width * 0.3 }}>
                    <Image
                      source={{
                        uri: this.state.image
                      }}
                      style={{
                        width: width * 0.3,
                        height: 200,
                        resizeMode: "contain",
                        borderRadius: 8
                      }}
                      resizeMethod="auto"
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.6,
                      marginTop: 40,
                      marginLeft: 14
                    }}
                  >
                    <View style={{}}>
                      <Text
                        style={{
                          backgroundColor: "#f4f4f4",
                          alignSelf: "flex-start",
                          color: "#32325D"
                        }}
                      >
                        Followers :{" "}
                        {this.countFollowers(this.props.data.followers)}
                      </Text>
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <Text style={{ color: "#32325D" }}>
                        {this.props.data.phonenumber}
                      </Text>
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <Text style={{ color: "#32325D" }}>
                        {this.props.data.websiteurl}
                      </Text>
                    </View>

                    <View style={{ marginTop: 10 }}>
                      {!this.state.contactAdded ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#5E72E4",
                            width: width * 0.5,
                            alignItems: "center",
                            borderRadius: 4,
                            alignSelf: "flex-start"
                          }}
                          onPress={() => this.handleAddToContact()}
                        >
                          <View style={{ flexDirection: "row" }}>
                            {this.state.addingToContact ? (
                              <Spinner
                                color="white"
                                size="small"
                                style={{ height: 20 }}
                              />
                            ) : null}
                            <Text style={{ color: "white" }}>
                              Add to Contact
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#2DCE89",
                            width: width * 0.4,
                            alignItems: "center",
                            borderRadius: 7
                          }}
                          onPress={() => this.handleAddToContact()}
                        >
                          <Text style={{ color: "white" }}>
                            Already in Contact
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
                {this.showExpanded()}
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
