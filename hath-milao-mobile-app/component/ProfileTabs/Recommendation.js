/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unused-state */
/* eslint-disable flowtype/no-types-missing-file-annotation */
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
  Header,
  Content,
  Item,
  Text,
  Input,
  Icon,
  Button,
  Card,
  CardItem,
  Body,
  View,
  DatePicker,
  Picker,
  Spinner,
  Fab
} from "native-base";
import { Image } from "react-native";
import { Block } from "galio-framework";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import StudentJobCard from "../src/StudentJobCard";
import { RecommendedJobs } from "../../services/job.service";

let f = 1;
export default class RecommendationJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      selected2: null,
      Jobs: null,
      searchValue: "",
      searchClick: false,
      city: null,
      company: null,
      searchError: false,
      appliedjob: null,
      savedjob: null,
      id: null,
      hasNext: false,
      page: 1,
      totalPages: 1,
      moreLoading: false,
      requested: false,
      errorLoading: false
    };
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    const didBlurSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.setState({ Jobs: null });
        RecommendedJobs(1)
          .then(response => {
            // console.log(response.data);
            this.setState({
              hasNext: response.data.jobs.hasNextPage,
              Jobs: response.data.jobs.docs,
              appliedjob: response.data.studentDoc[0].appliedjob,
              savedjob: response.data.studentDoc[0].savedjob,
              id: response.data.studentDoc[0]._id,
              errorLoading: false
            });
          })
          .catch(e => {
            this.setState({ errorLoading: true, Jobs: [] });
            if (e) {
              console.log(e);
            }
          });
        // this.renderProfile();
      }
    );

    this.setState({ Jobs: null });
    RecommendedJobs(1)
      .then(response => {
        // console.log(response.data);
        this.setState({
          hasNext: response.data.jobs.hasNextPage,
          Jobs: response.data.jobs.docs,
          appliedjob: response.data.studentDoc[0].appliedjob,
          savedjob: response.data.studentDoc[0].savedjob,
          id: response.data.studentDoc[0]._id,
          errorLoading: false
        });
      })
      .catch(e => {
        this.setState({ errorLoading: true, Jobs: [] });
        if (e) {
          console.log(e);
        }
      });

    // console.log(this.state.savedjob);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  strSplit(date) {
    const str = String(date).split("T");
    return str[0];
  }
  renderJobList(data) {
    const list = [];
    let actual = 0;
    let observe = 0;
    data.forEach(item => {
      actual += 1;
      const str = item.applybefore;
      const d1 = new Date(str);
      const d2 = new Date();
      // console.log(d2>d1);
      if (d1 > d2) {
        observe += 1;
        list.push(
          <StudentJobCard
            key={item._id}
            navigation={this.props.navigation}
            data={item}
            appliedjob={this.state.appliedjob}
            savedjob={this.state.savedjob}
            id={this.state.id}
          />
        );
      }
    });
    // console.log("actual: ", actual);
    // console.log("observe: ", observe);
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

  loadSpinner() {
    return <Spinner color="blue" />;
  }

  refsAssig = ref => {
    this.refresh = ref;
  };

  rotateRefresh() {
    this.refresh
      .animate({ from: { rotate: "0deg" }, to: { rotate: "360deg" } }, 1000)
      .then(async () => {
        await this.setState({ Jobs: null, page: 1 });
        RecommendedJobs(1)
          .then(response => {
            console.log(response.data);
            this.setState({
              hasNext: response.data.jobs.hasNextPage,
              Jobs: response.data.jobs.docs,
              appliedjob: response.data.studentDoc[0].appliedjob,
              savedjob: response.data.studentDoc[0].savedjob,
              id: response.data.studentDoc[0]._id,
              errorLoading: false
            });
          })
          .catch(e => {
            this.setState({ errorLoading: true, Jobs: [] });
            if (e) {
              console.log(e);
            }
          });
      });
  }

  onLoadMoreData() {
    // console.log("onLoadData");
    if (this.state.requested && f === 1) {
      f = 0;

      const currentPage = this.state.page;
      const nextPage = currentPage + 1;

      RecommendedJobs(nextPage)
        .then(response => {
          // console.log(response.data.jobs);
          const newJobs = this.state.Jobs.concat(response.data.jobs.docs);
          this.setState({
            hasNext: response.data.jobs.hasNextPage,
            requested: false,
            moreLoading: false,
            Jobs: newJobs,
            page: nextPage,
            errorLoading: false
          });
          f = 1;
        })
        .catch(e => {
          this.setState({ errorLoading: true, Jobs: [] });
          if (e) {
            console.log(e);
          }
        });
    }
  }

  //   onSearch() {
  //     if (this.state.searchValue) {
  //       const { searchValue, selected2, city, company } = this.state;
  //       // console.log(this.state);
  //       this.setState({ Jobs: null });
  //       SearchJob(1, searchValue, selected2, city, company)
  //         .then(response => {
  //           // console.log(response.data.jobs);
  //           // const pages = [];
  //           // const totalPages = response.data.jobs.totalPages;
  //           this.setState({
  //             searchClick: false,
  //             searchValue: "",
  //             Jobs: response.data.jobs.docs
  //           });
  //         })
  //         .catch(e => {
  //           if (e) {
  //             console.log(e);
  //             this.setState({ Jobs: [] });
  //           }
  //         });
  //     } else {
  //       this.setState({ searchError: true });
  //       ViewAllJob(1)
  //         .then(response => {
  //           // console.log(response.data);
  //           this.setState({ Jobs: response.data.jobs.docs, searchError: false });
  //         })
  //         .catch(e => {
  //           if (e) {
  //             console.log(e);
  //             this.setState({ Jobs: [] });
  //           }
  //         });
  //     }
  //   }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100
    );
  }

  moreLoadSpinner() {
    // console.log("moreLoadSPinner");
    if (this.state.moreLoading) {
      return <Spinner color="blue" />;
    }
    return null;
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
            style={{ backgroundColor: "#f4f4f4" }}
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
            <Animatable.View
              animation="slideInUp"
              duration={1500}
              style={{ marginLeft: 7, marginRight: 7, marginTop: 18 }}
            >
              {this.state.Jobs === null
                ? this.loadSpinner()
                : this.renderJobList(this.state.Jobs)}
              {this.moreLoadSpinner()}
            </Animatable.View>
          </ScrollView>
        )}
      </Container>
    );
  }
}
