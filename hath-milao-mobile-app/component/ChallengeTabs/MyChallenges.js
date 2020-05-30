/* eslint-disable react/state-in-constructor */
/* eslint-disable no-nested-ternary */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import {
  Container,
  Item,
  Text,
  Input,
  Icon,
  Button,
  View,
  Spinner,
  Fab,
  Form,
  Label
} from "native-base";
import { Image } from "react-native";
import { Block } from "galio-framework";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

import ChallengeCard from "../src/ChallengeCard";
// Services
import config from "../../util/config.json";
import {
  ViewAllChallenge,
  SearchChallenge
} from "../../services/challenege.service";

let f = 1;
let searchclicked = false;
export default class MyChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      selected2: undefined,
      challenges: null,
      field: null,
      title: null,
      country: null,
      city: null,
      degree: null,
      hasNext: false,
      page: 1,
      totalPages: 1,
      moreLoading: false,
      requested: false,
      errorLoading: false
    };
    this.setDate = this.setDate.bind(this);
  }
  state = {
    searchClick: false
  };
  moreLoadSpinner() {
    if (this.state.moreLoading) {
      return <Spinner color="blue" />;
    }
    return null;
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100
    );
  }

  componentDidMount() {
    const didBlurSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.setState({ challenges: null });
        searchclicked = false;
        ViewAllChallenge(1)
          .then(response => {
            // console.log (response.data.challenges.docs);
            this.setState({
              challenges: response.data.challenges.docs,
              hasNext: response.data.challenges.hasNextPage,
              page: response.data.challenges.page,
              errorLoading: false
            });
            // console.log(this.state.challenges);
          })
          .catch(e => {
            this.setState({ errorLoading: true, challenges: [] });
            if (e) {
              console.log(e);
            }
          });
      }
    );
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  loadSpinner() {
    return <Spinner color="blue" />;
  }
  renderChallengeList(data1) {
    const list = [];
    if (data1) {
      data1.forEach(item => {
        const str = item.applybefore;
        const d1 = new Date(str);
        const d2 = new Date();
        if (true) {
          list.push(
            <ChallengeCard
              key={item._id}
              navigation={this.props.navigation}
              data={item}
              registered={false}
              screen="challenge"
            />
          );
        }
      });
    }
    if (list || list.length < 4) {
      // console.log(this.state.hasNext);
      if (this.state.hasNext) {
        // console.log("Listener working");
        if (f === 1) {
          this.setState({ requested: true, moreLoading: true });
          // console.log("isCloseToBottom Chal gya");
          this.onLoadMoreData();
        }
      }
    }

    return list;
  }
  refsAssig = ref => {
    this.refresh = ref;
  };

  rotateRefresh() {
    searchclicked = false;
    this.refresh
      .animate({ from: { rotate: "0deg" }, to: { rotate: "360deg" } }, 1000)
      .then(async () => {
        await this.setState({ challenges: null, page: 1 });

        ViewAllChallenge(1)
          .then(response => {
            // console.log(response.data.challenges.docs);
            this.setState({
              challenges: response.data.challenges.docs,
              hasNext: response.data.challenges.hasNextPage,
              page: response.data.challenges.page,
              errorLoading: false
            });
            // console.log(this.state.challenges);
          })
          .catch(e => {
            this.setState({ errorLoading: true, challenges: [] });
            if (e) {
              console.log(e);
            }
          });
      });
  }

  changeDegree(value) {
    this.setState({ degree: value });
  }

  changeCountry(value) {
    this.setState({ country: value });
  }

  changeField(value) {
    this.setState({ field: value });
  }

  changeCity(value) {
    this.setState({ city: value });
  }
  changeTitle(value) {
    this.setState({ title: value });
  }

  onLoadMoreData() {
    if (this.state.requested && f === 1) {
      f = 0;

      const currentPage = this.state.page;
      const nextPage = currentPage + 1;
      // console.log("search clicked: ", searchclicked);
      if (searchclicked) {
        const Title = this.state.title
          ? this.state.title.trim()
            ? this.state.title.trim()
            : null
          : null;
        // console.log("inside search click");

        let { title, country, field, city, degree } = this.state;
        city = city ? (city.trim() ? city.trim() : null) : null;
        country = country ? (country.trim() ? country.trim() : null) : null;
        degree = degree ? (degree.trim() ? degree.trim() : null) : null;
        field = field ? (field.trim() ? field.trim() : null) : null;
        if (Title || city || degree || field) {
          // console.log("inside ");
          SearchChallenge(nextPage, field, city, Title, degree)
            .then(response => {
              // console.log(response.data);
              const newchallenges = this.state.challenges.concat(
                response.data.challenges.docs
              );
              this.setState({
                challenges: newchallenges,
                hasNext: response.data.challenges.hasNextPage,
                page: nextPage,
                requested: false,
                moreLoading: false,
                searchClick: false,
                errorLoading: false
              });
              f = 1;
            })
            .catch(e => {
              this.setState({ errorLoading: true, challenges: [] });
              if (e) {
                console.log(e);
              }
            });
        } else {
          this.setState({
            searchClick: false
          });
        }
      } else {
        ViewAllChallenge(nextPage)
          .then(response => {
            const newchallenges = this.state.challenges.concat(
              response.data.challenges.docs
            );
            this.setState({
              hasNext: response.data.challenges.hasNextPage,
              requested: false,
              moreLoading: false,
              challenges: newchallenges,
              page: nextPage,
              errorLoading: false
            });
            f = 1;
          })
          .catch(e => {
            this.setState({ errorLoading: true, challenges: [] });
            if (e) {
              console.log(e);
            }
          });
      }
    }
  }

  fetchSearchResults() {
    searchclicked = true;
    const Title = this.state.title
      ? this.state.title.trim()
        ? this.state.title.trim()
        : null
      : null;
    let { title, country, field, city, degree } = this.state;
    city = city ? (city.trim() ? city.trim() : null) : null;
    country = country ? (country.trim() ? country.trim() : null) : null;
    degree = degree ? (degree.trim() ? degree.trim() : null) : null;
    field = field ? (field.trim() ? field.trim() : null) : null;
    if (Title || city || degree || field) {
      this.setState({ challenges: null, page: 1 });
      SearchChallenge(1, field, city, Title, degree)
        .then(response => {
          // console.log(response.data);
          this.setState({
            challenges: response.data.challenges.docs,
            hasNext: response.data.challenges.hasNextPage,
            page: response.data.challenges.page,
            searchClick: false,
            errorLoading: false
          });
        })
        .catch(e => {
          this.setState({ errorLoading: true, challenges: [] });
          if (e) {
            console.log(e);
          }
        });
    } else {
      this.setState({
        searchClick: false
      });
    }
  }

  render() {
    return (
      <Container>
        <Fab
          active
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5E72E4", zIndex: 4 }}
          position="bottomRight"
          onPress={() => {
            this.rotateRefresh();
          }}
        >
          <Animatable.View
            ref={this.refsAssig.bind(this)}
            style={{ zIndex: 4 }}
            easing="linear"
            useNativeDriver
          >
            <Icon
              style={{ color: "white" }}
              color="white"
              type="Ionicons"
              name="ios-refresh"
            />
          </Animatable.View>
        </Fab>
        {this.state.errorLoading ? (
          <View
            style={{
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
          </View>
        ) : (
          <ScrollView
            style={{ backgroundColor: "#E7E7E7" }}
            onScroll={async ({ nativeEvent }) => {
              if (this.isCloseToBottom(nativeEvent) && this.state.hasNext) {
                // console.log("Listener working");
                if (f === 1) {
                  this.setState({ requested: true, moreLoading: true });
                  // console.log("isCloseToBottom Chal gya");
                  await this.onLoadMoreData();
                }
              }
            }}
          >
            <Block middle style={{ top: 7, left: 3 }}>
              <View style={{ flexDirection: "row", width: "95%" }}>
                <Item
                  regular
                  style={{ width: "85%", height: 50, backgroundColor: "white" }}
                >
                  <Icon name="ios-search" />
                  <Input
                    onTouchStart={() => this.setState({ searchClick: true })}
                    placeholder="Search"
                    onChangeText={this.changeTitle.bind(this)}
                    value={this.state.title}
                  />
                  {this.state.searchClick ? (
                    <Button
                      transparent
                      onPress={() => this.setState({ searchClick: false })}
                      style={{ width: 50, flexWrap: "wrap" }}
                    >
                      <Icon
                        type="Entypo"
                        name="cross"
                        style={{ fontSize: 20 }}
                      />
                    </Button>
                  ) : null}
                </Item>
                <Button
                  style={{
                    backgroundColor: "#5E72E4",
                    height: 50,
                    width: "15%"
                  }}
                  transparent
                  onPress={() => {
                    searchclicked = true;
                    this.fetchSearchResults();
                  }}
                >
                  <Text style={{ color: "white" }}>Go</Text>
                </Button>
              </View>
              {this.state.searchClick ? (
                <Animatable.View
                  animation="flipInX"
                  duration={800}
                  style={{
                    width: "94%",
                    backgroundColor: "white",
                    justifyContent: "space-around",
                    alignItems: "center",
                    elevation: 3,
                    borderRightWidth: 0.4,
                    borderBottomWidth: 0.4,
                    left: 1,
                    flexDirection: "column",
                    flex: 4,
                    flexWrap: "wrap",
                    flexShrink: 0,
                    flexBasis: 10
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ flex: 0.9, marginTop: 4 }}>
                      <Form>
                        <Item regular inlineLabel>
                          <Label style={{ marginLeft: 5 }}>
                            Field{"       "}
                          </Label>
                          <Input
                            onChangeText={this.changeField.bind(this)}
                            value={this.state.field}
                          />
                        </Item>
                      </Form>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ flex: 0.9, marginTop: 4 }}>
                      <Form>
                        <Item regular inlineLabel>
                          <Label style={{ marginLeft: 5 }}>
                            City{"       "}
                            {"  "}
                          </Label>
                          <Input
                            onChangeText={this.changeCity.bind(this)}
                            value={this.state.city}
                            placeholder="Islamabad"
                            style={{}}
                          />
                        </Item>
                      </Form>
                    </View>
                  </View>

                  {/* <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={{ flex: 0.9, marginTop: 4 }}>
                    <Form>
                      <Item regular inlineLabel>
                        <Label style={{ marginLeft: 5 }}>Country{"  "}</Label>
                        <Input
                          onChangeText={this.changeCountry.bind(this)}
                          value={this.state.country}
                          placeholder="Pakistan"
                          style={{}}
                        />
                      </Item>
                    </Form>
                  </View>
                </View> */}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ flex: 0.9, marginTop: 4 }}>
                      <Form>
                        <Item regular inlineLabel>
                          <Label style={{ marginLeft: 5 }}>
                            Degree{"   "}{" "}
                          </Label>
                          <Input
                            onChangeText={this.changeDegree.bind(this)}
                            value={this.state.degree}
                            placeholder="BSCS"
                            style={{}}
                          />
                        </Item>
                      </Form>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ flex: 0.9, marginTop: 4, flexShrink: 1 }} />
                  </View>
                </Animatable.View>
              ) : null}
            </Block>
            <Animatable.View
              animation="slideInUp"
              duration={1500}
              style={{ marginLeft: 7, marginRight: 7, marginTop: 18 }}
            >
              {this.state.challenges === null
                ? this.loadSpinner()
                : this.renderChallengeList(this.state.challenges)}

              {this.moreLoadSpinner()}
            </Animatable.View>
          </ScrollView>
        )}
      </Container>
    );
  }
}
