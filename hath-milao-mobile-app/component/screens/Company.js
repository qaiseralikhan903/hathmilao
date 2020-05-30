/* eslint-disable class-methods-use-this */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
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
import { Block } from "galio-framework";
import { AsyncStorage, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import CompanyCard from "../src/CompanyCard";
import MyHeader from "../src/header";
import { ViewCompany, SearchCompany } from "../../services/company.service";

const getCurrentUser = async () => {
  // const user = localStorage.getItem("user");
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
let f = 1;
let searchclicked = false;
export default class CompanyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      selected2: undefined,
      searchClick: false,
      company: null,
      hasNext: false,
      page: 1,
      totalPages: 1,
      moreLoading: false,
      requested: false,
      id: null,
      field: null,
      name: null,
      city: null,
      errorLoading: false
    };
    this.setDate = this.setDate.bind(this);
  }

  async componentWillMount() {
    const id = await getCurrentUser();
    this.setState({ id: id.user.id });
  }
  componentDidMount() {
    searchclicked = false;
    this.loadPage();
  }
  moreLoadSpinner() {
    if (this.state.moreLoading) {
      return <Spinner color="blue" />;
    }
    return null;
  }

  changeName(value) {
    this.setState({ name: value });
  }

  changeField(value) {
    this.setState({ field: value });
  }

  changeCity(value) {
    this.setState({ city: value });
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100
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
  refsAssig = ref => {
    this.refresh = ref;
  };

  rotateRefresh() {
    this.refresh
      .animate({ from: { rotate: "0deg" }, to: { rotate: "360deg" } }, 1000)
      .then(() => this.loadPage());
    // this.refresh.bounce(1000).then(()=>console.log("bounced"));
  }

  loadPage() {
    searchclicked = false;
    this.setState({ company: null, page: 1 });
    ViewCompany(1)
      .then(response => {
        // console.log(response.data.companies);
        this.setState({
          company: response.data.companies.docs,
          hasNext: response.data.companies.hasNextPage,
          page: response.data.companies.page,
          errorLoading: false
        });
      })
      .catch(e => {
        this.setState({ errorLoading: true, company: null });
        if (e) {
          console.log(e);
        }
      });
  }

  renderEventList(data) {
    const list = [];
    data.forEach(item => {
      list.push(
        <CompanyCard
          key={item._id}
          navigation={this.props.navigation}
          data={item}
          user_id={this.state.id}
        />
      );
    });
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
  fetchSearchResults() {
    searchclicked = true;
    const Name = this.state.name
      ? this.state.name.trim()
        ? this.state.name.trim()
        : null
      : null;
    let { field, city } = this.state;
    city = city ? (city.trim() ? city.trim() : null) : null;
    field = field ? (field.trim() ? field.trim() : null) : null;
    if (Name || city || field) {
      this.setState({ company: null, page: 1 });
      SearchCompany(1, Name, city, field)
        .then(response => {
          // console.log(response.data);
          this.setState({
            company: response.data.companies.docs,
            hasNext: response.data.companies.hasNextPage,
            page: response.data.companies.page,

            searchClick: false,
            errorLoading: false
          });
        })
        .catch(e => {
          this.setState({ errorLoading: true, company: null });
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

  onLoadMoreData() {
    if (this.state.requested && f === 1) {
      f = 0;

      const currentPage = this.state.page;
      const nextPage = currentPage + 1;

      if (searchclicked) {
        const Name = this.state.name
          ? this.state.name.trim()
            ? this.state.name.trim()
            : null
          : null;
        let { field, city } = this.state;
        city = city ? (city.trim() ? city.trim() : null) : null;
        field = field ? (field.trim() ? field.trim() : null) : null;
        if (Name || city || field) {
          SearchCompany(nextPage, Name, city, field)
            .then(response => {
              // console.log(response.data);
              const newCompanies = this.state.company.concat(
                response.data.companies.docs
              );
              this.setState({
                company: newCompanies,
                hasNext: response.data.companies.hasNextPage,
                page: nextPage,
                requested: false,
                moreLoading: false,
                searchClick: false,
                errorLoading: false
              });
              f = 1;
            })
            .catch(e => {
              this.setState({ errorLoading: true, company: null });
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
        ViewCompany(nextPage)
          .then(response => {
            const newJobs = this.state.company.concat(
              response.data.companies.docs
            );
            this.setState({
              hasNext: response.data.companies.hasNextPage,
              requested: false,
              moreLoading: false,
              company: newJobs,
              page: nextPage,
              errorLoading: false
            });
            f = 1;
          })
          .catch(e => {
            this.setState({ errorLoading: true, company: null });
            if (e) {
              console.log(e);
            }
          });
      }
    }
  }

  loadSpinner() {
    return <Spinner color="blue" />;
  }
  render() {
    return (
      <Container>
        <MyHeader heading="Company" navigation={this.props.navigation} />
        <Fab
          active
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5E72E4", zIndex: 4 }}
          position="bottomRight"
          onPress={() => {
            // console.log("fab");
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
            onScroll={({ nativeEvent }) => {
              if (this.isCloseToBottom(nativeEvent) && this.state.hasNext) {
                // console.log("Listener working");
                if (f === 1) {
                  this.setState({ requested: true, moreLoading: true });
                  // console.log("isCloseToBottom Chal gya");
                  this.onLoadMoreData();
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
                    onChangeText={this.changeName.bind(this)}
                    value={this.state.name}
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
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 3,
                    borderRightWidth: 0.4,
                    borderBottomWidth: 0.4,
                    left: 1
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
                            Field{""}
                            {"      "}{" "}
                          </Label>
                          <Input
                            onChangeText={this.changeField.bind(this)}
                            value={this.state.field}
                            placeholder="web, software"
                            style={{}}
                          />
                        </Item>
                        <Text />
                      </Form>
                    </View>
                  </View>
                </Animatable.View>
              ) : null}
            </Block>
            <Animatable.View
              animation="slideInUp"
              duration={1500}
              style={{ marginLeft: 7, marginRight: 7, marginTop: 18 }}
            >
              {this.state.company === null
                ? this.loadSpinner()
                : this.renderEventList(this.state.company)}
              {this.moreLoadSpinner()}
            </Animatable.View>
          </ScrollView>
        )}
      </Container>
    );
  }
}
