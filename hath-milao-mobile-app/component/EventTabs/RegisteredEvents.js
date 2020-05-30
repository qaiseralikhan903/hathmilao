/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-boolean-value */
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
import { Container, Icon, Fab, Spinner, View, Text } from "native-base";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import EventCard from "../src/EventCard";
import { AllRegisterEvents } from "../../services/event.service";

let f = 1;
export default class RegisteredEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      hasNext: false,
      page: 1,
      totalPages: 1,
      moreLoading: false,
      requested: false,
      errorLoading: false
    };
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
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

  renderEventList(data) {
    const list = [];
    // console.log(data);
    if (data) {
      data.forEach(item => {
        const str = item.dateAt;
        const d1 = new Date(str);
        const d2 = new Date();
        if (d1 > d2) {
          list.push(
            <EventCard
              key={item._id}
              navigation={this.props.navigation}
              data={item}
              screen="register"
              registered={true}
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
  componentWillMount() {
    this.pageLoad();
  }
  pageLoad() {
    this.setState({ events: null });
    AllRegisterEvents(1)
      .then(response => {
        // const pages = [];
        // const totalPages = response.data.events.totalPages;
        // console.log(response.data.events.docs);
        this.setState({
          events: response.data.events.docs,
          hasNext: response.data.events.hasNextPage,
          page: response.data.events.page,
          errorLoading: false
        });
      })
      .catch(e => {
        this.setState({ errorLoading: true, events: null });
        if (e.response.data) {
          console.log(e);
        }
      });
  }

  rotateRefresh() {
    this.refresh
      .animate({ from: { rotate: "0deg" }, to: { rotate: "360deg" } }, 1000)
      .then(() => {
        this.pageLoad();
      });
    // this.refresh.bounce(1000).then(()=>console.log("bounced"));
  }
  eventList = ref => {
    this.mainList = ref;
  };

  onLoadMoreData() {
    if (this.state.requested && f === 1) {
      f = 0;

      const currentPage = this.state.page;
      const nextPage = currentPage + 1;
      AllRegisterEvents(nextPage)
        .then(response => {
          const newEvents = this.state.events.concat(response.data.events.docs);
          this.setState({
            hasNext: response.data.events.hasNextPage,
            requested: false,
            moreLoading: false,
            events: newEvents,
            page: nextPage,
            errorLoading: false
          });
          f = 1;
        })
        .catch(e => {
          this.setState({ errorLoading: true, events: null });
          if (e) {
            console.log(e);
          }
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
              ref={this.eventList}
              animation="slideInUp"
              duration={1500}
              style={{ marginLeft: 7, marginRight: 7, marginTop: 18 }}
            >
              {this.renderEventList(this.state.events)}
              {this.moreLoadSpinner()}
            </Animatable.View>
          </ScrollView>
        )}
      </Container>
    );
  }
}
