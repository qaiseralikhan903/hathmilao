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
  Spinner,
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
  Fab
} from "native-base";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import StudentJobCard from "../src/StudentJobCard";
import { AllAppliedJob } from "../../services/job.service";

let f = 1;
export default class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      Jobs: null,
      save: false,
      apply: false,
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
  }

  componentWillMount() {
    if (this.props.fromPage === "save") {
      this.setState({ save: true });
    } else if (this.props.fromPage === "apply") {
      this.setState({ apply: true });
    }
  }
  componentDidMount() {
    this.focusListenersave = this.props.navigation.addListener(
      "willFocus",
      () => {
        // console.log("apply focused");
        AllAppliedJob(1)
          .then(response => {
            // console.log(response.data);
            this.setState({
              Jobs: response.data.jobs.docs,
              hasNext: response.data.jobs.hasNextPage,
              errorLoading: false
            });
          })
          .catch(e => {
            this.setState({ errorLoading: true, Jobs: [] });
            if (e) {
              console.log(e);
            }
          });
      }
    );
    const didBlurSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.setState({ Jobs: null });

        // this.renderProfile();
      }
    );
    AllAppliedJob(1)
      .then(response => {
        // console.log(response.data);
        this.setState({
          Jobs: response.data.jobs.docs,
          hasNext: response.data.jobs.hasNextPage,
          errorLoading: false
        });
      })
      .catch(e => {
        this.setState({ errorLoading: true, Jobs: [] });
        if (e) {
          console.log(e);
        }
      });
  }
  loadSpinner() {
    return <Spinner color="blue" />;
  }
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

  onLoadMoreData() {
    if (this.state.requested && f === 1) {
      f = 0;

      const currentPage = this.state.page;
      const nextPage = currentPage + 1;
      AllAppliedJob(nextPage)
        .then(response => {
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

  componentWillUnmount() {
    this.focusListenersave.remove();
  }
  renderJobList(data) {
    const list = [];
    data.forEach(item => {
      list.push(
        <StudentJobCard
          key={item._id}
          navigation={this.props.navigation}
          data={item}
          fromPage="apply"
          appliedjob={this.state.appliedjob}
          savedjob={this.state.savedjob}
          id={this.state.id}
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

  refsAssig = ref => {
    this.refresh = ref;
  };

  rotateRefresh() {
    this.refresh
      .animate({ from: { rotate: "0deg" }, to: { rotate: "360deg" } }, 1000)
      .then(async () => {
        await this.setState({ Jobs: null, page: 1 });
        AllAppliedJob(1)
          .then(response => {
            // console.log(response.data);
            this.setState({
              Jobs: response.data.jobs.docs,
              hasNext: response.data.jobs.hasNextPage,
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
