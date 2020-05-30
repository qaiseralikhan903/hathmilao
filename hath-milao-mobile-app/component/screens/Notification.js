/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-string-refs */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  View,
  Card,
  CardItem,
  Text as NativeText,
  Fab,
  Spinner
} from "native-base";
import {} from "galio-framework";
import { Text, Icon as reactnativeIcon, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { ViewAllJob } from "../../services/notification.service";

let routeName;
let f = 1;
export default class Notification extends Component {
  bounce() {
    this.refs.view.animate({ 0: { opacity: 0 }, 1: { opacity: 1 } });
  }
  constructor(props) {
    super(props);
    this.state = {
      Jobs: null,
      hasNext: false,
      page: 1,
      totalPages: 1,
      moreLoading: false,
      requested: false,
      appliedjob: null,
      savedjob: null,
      id: null
    };
  }

  componentWillMount() {
    const didBlurSubscription = this.props.navigation.addListener(
      "willFocus",
      async () => {
        await this.setState({ Jobs: null, page: 1 });
        ViewAllJob(1)
          .then(response => {
            // console.log(response.data);
            this.setState({
              hasNext: response.data.jobs.hasNextPage,
              Jobs: response.data.jobs.docs,
              appliedjob: response.data.studentDoc[0].appliedjob,
              savedjob: response.data.studentDoc[0].savedjob,
              id: response.data.studentDoc[0]._id
            });
          })
          .catch(e => {
            if (e) {
              console.log(e);
            }
          });
        // this.renderProfile();
      }
    );
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

  cardItemWithoutArray(heading, detail, myColor) {
    return (
      <View style={{ flex: 1, flexDirection: "row", top: 10 }}>
        <View style={{ flex: 0.3 }}>
          <Text
            style={{
              color: "#32325D",
              fontSize: 16,
              fontWeight: "bold"
            }}
          >
            {heading}
          </Text>
        </View>
        <View style={{ flex: 0.7, flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ color: myColor ? "#FB6340" : "#525F7F" }}>
            {detail}
          </Text>
        </View>
      </View>
    );
  }

  refsAssig = ref => {
    this.refresh = ref;
  };

  onRefresh() {
    this.setState({ Jobs: null, page: 1 });
    ViewAllJob(1)
      .then(response => {
        // console.log(response.data);
        this.setState({
          hasNext: response.data.jobs.hasNextPage,
          Jobs: response.data.jobs.docs,
          appliedjob: response.data.studentDoc[0].appliedjob,
          savedjob: response.data.studentDoc[0].savedjob,
          id: response.data.studentDoc[0]._id
        });
      })
      .catch(e => {
        if (e) {
          console.log(e);
        }
      });
  }

  rotateRefresh() {
    this.refresh
      .animate({ from: { rotate: "0deg" }, to: { rotate: "360deg" } }, 1000)
      .then(() => this.onRefresh());
    // this.refresh.bounce(1000).then(()=>console.log("bounced"));
  }
  onLoadMoreData() {
    // console.log("onLoadData");
    if (this.state.requested && f === 1) {
      f = 0;

      const currentPage = this.state.page;
      const nextPage = currentPage + 1;

      ViewAllJob(nextPage)
        .then(response => {
          // console.log(response.data.jobs);
          const newJobs = this.state.Jobs.concat(response.data.jobs.docs);
          this.setState({
            hasNext: response.data.jobs.hasNextPage,
            requested: false,
            moreLoading: false,
            Jobs: newJobs,
            page: nextPage
          });
          f = 1;
        })
        .catch(e => {
          if (e) {
            console.log(e);
          }
        });
    }
  }

  loadSpinner() {
    return <Spinner color="blue" />;
  }

  JobDetail(item) {
    const str = item.applybefore;
    const d1 = new Date(str);
    const d2 = new Date();
    const newData = item;
    newData.fromPage = "jobs";
    newData.appliedjob = this.state.appliedjob;
    newData.savedjob = this.state.savedjob;
    newData.id = this.state.id;
    newData.expire = d1 > d2;
    setTimeout(() => this.props.navigation.navigate("Job_Detail", newData), 10);
  }

  renderJobList(jobs) {
    const list = [];

    jobs.forEach(element => {
      list.push(
        <TouchableOpacity
          key={element._id}
          onPress={() => this.JobDetail(element)}
        >
          <Card style={{ marginTop: 10, marginLeft: 5, marginRight: 5 }}>
            <CardItem bordered>
              <Body
                style={{ flex: 1, flexDirection: "row", alignSelf: "center" }}
              >
                <View
                  style={{
                    flex: 0.1,
                    justifyContent: "center",
                    minHeight: 25
                  }}
                >
                  <Icon
                    type="FontAwesome"
                    name="circle-o"
                    style={{ fontSize: 10 }}
                  />
                </View>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    minHeight: 25
                  }}
                >
                  <Text style={{ color: "#32325D" }}>{element.title}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
      );
    });

    return list;
  }
  render() {
    routeName = this.props.navigation.getParam("rName", "");
    // console.log(routeName);
    return (
      <Container
        style={{
          backgroundColor: "#f4f4f4"
        }}
      >
        <Header style={{ backgroundColor: "white" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button
              onPress={() => {
                this.props.navigation.navigate("Profile");
                console.log("Pressed", routeName);
              }}
              transparent
            >
              <Icon style={{ color: "#32325D" }} name="arrow-back" />
              <Text
                style={{ color: "#32325D", fontSize: 20, fontWeight: "500" }}
              >
                Notification
              </Text>
            </Button>
          </View>
        </Header>
        <Fab
          active
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5E72E4", zIndex: 4 }}
          position="bottomRight"
          onPress={() => {
            console.log("fab");
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
        <Animatable.View>
          <ScrollView
            style={{
              marginLeft: 5,
              marginRight: 5
            }}
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
            {this.state.Jobs === null
              ? this.loadSpinner()
              : this.renderJobList(this.state.Jobs)}
            {this.moreLoadSpinner()}
          </ScrollView>
        </Animatable.View>
      </Container>
    );
  }
}
