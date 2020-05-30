/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/sort-comp */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable global-require */
/* eslint-disable object-shorthand */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  TouchableNativeFeedback,
  RefreshControl
} from "react-native";
import { Block, theme, Text as Text1 } from "galio-framework";
import { Notifications } from "expo";
import {
  Card,
  Body,
  CardItem,
  Container,
  View,
  Button,
  Text,
  Icon,
  Spinner,
  Right,
  Left,
  Switch
} from "native-base";
import * as Animatable from "react-native-animatable";
import { ViewProfile as View_Profile } from "../../services/profile/Basic.service";
import MyHeader from "../src/header";
import { HeaderHeight } from "../../constants/utils";
import config from "../../util/config.json";
import { DeleteEducation } from "../../services/profile/Education.service";
// Services
import { DeleteExperience } from "../../services/profile/Experience.service";
import { UpdateOther as Edit_Other } from "../../services/profile/Other.service";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
let data;
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      imageUrl: null,
      Looking: false,
      loading: false,
      errorLoading: false
    };
    data = null;
  }

  // async componentWillMount() {
  //   let token = await Notifications.getExpoPushTokenAsync();
  //   console.log("device token :", token);
  // }

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    const didBlurSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.setState({ profile: null });
        View_Profile()
          .then(response => {
            // console.log("response");
            // console.log(response.data);
            data = {
              skill: response.data.userData.skill,
              language: response.data.userData.language,
              cvurl: "Http://HElloWOrld.com/KalBilalKarayga",
              looking: response.data.userData.looking,
              desiredjob: "desired"
            };

            if (response.data.userData.imageurl) {
              this.setState({
                profile: response.data.userData,
                imageUrl: `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${response.data.userData.imageurl}`,
                Looking: response.data.userData.looking,
                errorLoading: false
              });
            } else {
              this.setState({
                profile: response.data.userData,
                imageUrl:
                  "https://www.putneyhigh.gdst.net/wp-content/uploads/2018/06/person-placeholder-male-5.jpg",
                errorLoading: false,
                Looking: response.data.userData.looking
              });
            }
          })
          .catch(err => {
            this.setState({
              errorLoading: true,
              profile: null,
              imageUrl: null,
              Looking: false,
              loading: false
            });
            console.log(err);
          });
        this.renderProfile();
      }
    );
  }

  reload() {
    this.setState({ profile: null });
    View_Profile()
      .then(response => {
        // console.log("response");
        // console.log(response.data);
        data = {
          skill: response.data.userData.skill,
          language: response.data.userData.language,
          cvurl: "Http://HElloWOrld.com/KalBilalKarayga",
          looking: response.data.userData.looking,
          desiredjob: "desired"
        };

        if (response.data.userData.imageurl) {
          this.setState({
            profile: response.data.userData,
            imageUrl: `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${response.data.userData.imageurl}`,
            Looking: response.data.userData.looking,
            loading: false,
            errorLoading: false
          });
        } else {
          this.setState({
            profile: response.data.userData,
            imageUrl:
              "https://www.putneyhigh.gdst.net/wp-content/uploads/2018/06/person-placeholder-male-5.jpg",
            errorLoading: false,
            Looking: response.data.userData.looking
          });
        }
      })
      .catch(err => {
        this.setState({
          errorLoading: true,
          profile: null,
          imageUrl: null,
          Looking: false,
          loading: false
        });
        console.log(err);
      });
    this.renderProfile();
  }

  renderWait() {
    return <Spinner color="blue" />;
  }

  strSplit(date) {
    const str = String(date).split("-");
    return str[0];
  }

  strExperienceSplit(date) {
    const str = String(date).split("T");
    return str[0];
  }

  educationCard(data) {
    return (
      <CardItem key={data._id} bordered>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View>
            <Text
              style={{
                color: "#32325D",
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              {data.institution}, {data.campus}
            </Text>
            <Text color="#525F7F">{data.degree}</Text>
            <Text color="#525F7F">
              {this.strSplit(data.startdate)} - {this.strSplit(data.enddate)}
            </Text>
            <Text color="#525F7F">{data.description}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row-reverse"
            }}
          >
            <Button
              transparent
              style={{}}
              onPress={() => {
                this.props.navigation.navigate("EducationEdit", {
                  EducationData: data
                });
              }}
            >
              <Text>
                <Icon
                  type="Entypo"
                  name="edit"
                  style={{
                    position: "absolute",
                    color: "blue",
                    fontSize: 20
                  }}
                />
              </Text>
            </Button>
            <Button
              transparent
              style={{}}
              onPress={() => {
                DeleteEducation(data._id)
                  .then(response => {
                    this.reload();
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
            >
              <Text>
                <Icon
                  type="AntDesign"
                  name="delete"
                  style={{
                    position: "absolute",
                    color: "#FB6340",
                    fontSize: 20
                  }}
                />
              </Text>
            </Button>
          </View>
        </View>
      </CardItem>
    );
  }

  experienceCard(data) {
    return (
      <CardItem key={data._id} bordered>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View>
            <Text
              style={{
                color: "#32325D",
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              {data.company},{data.city}
            </Text>
            <Text color="#525F7F">
              {this.strExperienceSplit(data.startdate)} -{" "}
              {this.strExperienceSplit(data.enddate)}
            </Text>
            <Text color="#525F7F">{data.title}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row-reverse"
            }}
          >
            <Button
              transparent
              style={{}}
              onPress={() => {
                this.props.navigation.navigate("EditExperience", {
                  ExperienceData: data
                });
              }}
            >
              <Text>
                <Icon
                  type="Entypo"
                  name="edit"
                  style={{
                    position: "absolute",
                    color: "blue",
                    fontSize: 20
                  }}
                />
              </Text>
            </Button>
            <Button
              transparent
              style={{}}
              onPress={() => {
                DeleteExperience(data._id)
                  .then(response => {
                    this.reload();
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
            >
              <Text>
                <Icon
                  type="AntDesign"
                  name="delete"
                  style={{
                    position: "absolute",
                    color: "#FB6340",
                    fontSize: 20
                  }}
                />
              </Text>
            </Button>
          </View>
        </View>
      </CardItem>
    );
  }

  StyleCard(data) {
    return (
      <Button
        key={data}
        style={{
          backgroundColor: "#5E72E4",
          margin: 5,
          flexWrap: "wrap",
          height: 25,
          borderRadius: 10
        }}
      >
        <Text style={{ textAlign: "center" }}>{data}</Text>
      </Button>
    );
  }

  horizontalList(data) {
    // console.log(data);

    const list = [];
    if (data) {
      data.forEach(item => {
        list.push(this.StyleCard(item));
      });
    }
    return list;
  }

  renderEducationList(data) {
    const list = [];
    data.forEach(item => {
      list.push(this.educationCard(item));
    });
    return list;
  }
  renderExperienceList(data) {
    const list = [];
    data.forEach(item => {
      list.push(this.experienceCard(item));
    });
    return list;
  }

  onChangeLooking() {
    Edit_Other(data)
      .then(response => {})
      .catch(e => {
        if (e) {
          console.log(e);
        }
      });
  }
  RefreshList = () => {
    this.setState({
      loading: true
    });
    this.reload();
  };
  renderProfileBody() {
    return (
      <Block style={{ flex: 1 }}>
        <StatusBar hidden />
        {this.state.errorLoading ? (
          <ScrollView
          
            refreshControl={
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={this.RefreshList}
              />
            }
            contentContainerStyle={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
              textAlign: "center"
            }}
          >
            <Image
              style={{ width: 300, height: 300, resizeMode: "contain" }}
              source={require("../../assets/imgs/error.png")}
            />
            <Text style={{ textAlign: "center" }}>
              Something Went Wrong {"\n"} Try Again
            </Text>
          </ScrollView>
        ) : (
          <Block flex style={styles.profile}>
            <Block flex>
              <ImageBackground
                source={require("../../assets/imgs/background.png")}
                style={styles.profileContainer}
                imageStyle={styles.profileBackground}
              >
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.loading}
                      onRefresh={this.RefreshList}
                    />
                  }
                  showsVerticalScrollIndicator={false}
                  style={{ width, marginTop: "25%" }}
                >
                  <Animatable.View animation="slideInUp" duration={1500}>
                    <Block style={styles.profileCard}>
                      <TouchableNativeFeedback
                        onPress={() => {
                          this.props.navigation.navigate("EditBasicProfile", {
                            data: this.state.profile
                          });
                        }}
                      >
                        <Icon
                          type="FontAwesome"
                          name="edit"
                          style={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            fontSize: 30
                          }}
                        />
                      </TouchableNativeFeedback>

                      <Block middle style={styles.avatarContainer}>
                        <Image
                          key={new Date().getTime()}
                          style={styles.avatar}
                          // source={require("../../assets/imgs/qaiserProfile.jpg")}
                          source={{
                            uri: this.state.imageUrl + "?" + new Date()
                          }}
                        />
                      </Block>

                      <Block style={styles.info}>
                        <Block flex>
                          <Block middle style={styles.nameInfo}>
                            <Text1
                              style={{ textAlign: "center" }}
                              bold
                              size={25}
                              color="#32325D"
                            >
                              {this.state.profile.name}
                            </Text1>
                            <Text1
                              size={16}
                              color="#32325D"
                              style={{ marginTop: 10 }}
                            >
                              {this.state.profile.city},{" "}
                              {this.state.profile.country}
                            </Text1>
                            <Text1
                              size={16}
                              color="#32325D"
                              style={{ marginTop: 10 }}
                            >
                              {this.state.profile.phonenumber}
                            </Text1>
                          </Block>
                        </Block>
                        <Block
                          middle
                          style={{ marginTop: 30, marginBottom: 16 }}
                        >
                          <Block style={styles.divider} />
                        </Block>

                        <Block middle>
                          <Text1
                            size={16}
                            color="#525F7F"
                            style={{ textAlign: "center" }}
                          >
                            {this.state.profile.headline}
                          </Text1>
                        </Block>
                      </Block>
                      <Block style={{ marginTop: 20 }}>
                        <Card style={{ margin: 10 }}>
                          <CardItem header bordered>
                            <Left>
                              <Button transparent>
                                <Text
                                  style={{ fontSize: 14, fontWeight: "bold" }}
                                >
                                  education
                                </Text>
                              </Button>
                            </Left>

                            <Right>
                              <Button
                                transparent
                                style={{}}
                                onPress={() => {
                                  this.props.navigation.navigate(
                                    "Educationadd"
                                  );
                                }}
                              >
                                <Text>
                                  <Icon
                                    type="Ionicons"
                                    name="md-add-circle"
                                    style={{
                                      position: "absolute",
                                      color: "#5E72E4",
                                      fontSize: 25
                                    }}
                                  />
                                </Text>
                              </Button>
                            </Right>
                          </CardItem>
                          {this.renderEducationList(
                            this.state.profile.education
                          )}
                        </Card>

                        <Card style={{ margin: 10 }}>
                          <CardItem header bordered>
                            <Left>
                              <Button transparent>
                                <Text
                                  style={{ fontSize: 14, fontWeight: "bold" }}
                                >
                                  Experience
                                </Text>
                              </Button>
                            </Left>

                            <Right>
                              <Button
                                transparent
                                style={{}}
                                onPress={() => {
                                  this.props.navigation.navigate(
                                    "AddExperience"
                                  );
                                }}
                              >
                                <Text>
                                  <Icon
                                    type="Ionicons"
                                    name="md-add-circle"
                                    style={{
                                      position: "absolute",
                                      color: "#5E72E4",
                                      fontSize: 25
                                    }}
                                  />
                                </Text>
                              </Button>
                            </Right>
                          </CardItem>
                          {this.renderExperienceList(
                            this.state.profile.experience
                          )}
                        </Card>
                        <Card style={{ margin: 10 }}>
                          <CardItem header bordered>
                            <Left>
                              <Button transparent>
                                <Text
                                  style={{ fontSize: 14, fontWeight: "bold" }}
                                >
                                  Skills
                                </Text>
                              </Button>
                            </Left>

                            <Right>
                              <Button
                                transparent
                                style={{}}
                                onPress={() => {
                                  this.props.navigation.navigate(
                                    "UpdateSkill",
                                    {
                                      data: this.state.profile
                                    }
                                  );
                                }}
                              >
                                <Text>
                                  <Icon
                                    type="Ionicons"
                                    name="md-add-circle"
                                    style={{
                                      position: "absolute",
                                      color: "#5E72E4",
                                      fontSize: 25
                                    }}
                                  />
                                </Text>
                              </Button>
                            </Right>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                              <View
                                style={{
                                  flexDirection: "row",
                                  flexWrap: "wrap"
                                }}
                              >
                                {this.horizontalList(this.state.profile.skill)}
                              </View>
                            </Body>
                          </CardItem>
                        </Card>

                        <Card style={{ margin: 10 }}>
                          <CardItem header bordered>
                            <Left>
                              <Button transparent>
                                <Text
                                  style={{ fontSize: 14, fontWeight: "bold" }}
                                >
                                  Languages
                                </Text>
                              </Button>
                            </Left>

                            <Right>
                              <Button
                                transparent
                                style={{}}
                                onPress={() => {
                                  this.props.navigation.navigate(
                                    "UpdateLanguage",
                                    {
                                      data: this.state.profile
                                    }
                                  );
                                }}
                              >
                                <Text>
                                  <Icon
                                    type="Ionicons"
                                    name="md-add-circle"
                                    style={{
                                      position: "absolute",
                                      color: "#5E72E4",
                                      fontSize: 25
                                    }}
                                  />
                                </Text>
                              </Button>
                            </Right>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                              <View
                                style={{
                                  flexDirection: "row",
                                  flexWrap: "wrap"
                                }}
                              >
                                {this.horizontalList(
                                  this.state.profile.language
                                )}
                              </View>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card>
                          <CardItem header bordered>
                            <Left>
                              <Button transparent>
                                <Text
                                  style={{ fontSize: 14, fontWeight: "bold" }}
                                >
                                  Looking for Job?
                                </Text>
                              </Button>
                            </Left>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                              <View
                                style={{
                                  flexDirection: "row",
                                  flexWrap: "wrap",
                                  marginLeft: 20
                                }}
                              >
                                <Text
                                  style={{ color: "#5E72E4", fontSize: 15 }}
                                >
                                  No{"    "}
                                </Text>
                                <Switch
                                  style={{
                                    transform: [
                                      { scaleX: 0.8 },
                                      { scaleY: 0.8 }
                                    ]
                                  }}
                                  value={this.state.Looking}
                                  onValueChange={() => {
                                    data.looking = !this.state.Looking;
                                    this.setState({
                                      Looking: !this.state.Looking
                                    });
                                    this.onChangeLooking();
                                  }}
                                />
                                <Text
                                  style={{ color: "#5E72E4", fontSize: 15 }}
                                >
                                  {"    "}Yes
                                </Text>
                              </View>
                            </Body>
                          </CardItem>
                        </Card>
                      </Block>
                    </Block>
                  </Animatable.View>
                </ScrollView>
              </ImageBackground>
            </Block>
          </Block>
        )}
      </Block>
    );
  }

  renderProfile() {
    return (
      <Container>
        <View style={{ height: "9%", zIndex: 4 }}>
          <MyHeader
            style={{ zIndex: 3 }}
            heading="Profile"
            navigation={this.props.navigation}
          />
        </View>
        {this.state.profile === null
          ? this.state.errorLoading? this.renderProfileBody() : this.renderWait()
          : this.renderProfileBody()}
      </Container>
    );
  }

  render() {
    console.log(this.state.imageUrl);
    return this.renderProfile();
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    position: "relative",
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
    marginTop: "17%"
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default ProfileScreen;
