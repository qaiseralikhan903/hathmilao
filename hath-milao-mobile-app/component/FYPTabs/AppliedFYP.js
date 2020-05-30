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
import { Container, Icon, Spinner, Fab, View, Text } from "native-base";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import FYPCard from "../src/FYPCard";
import { AllAppliedFYP } from "../../services/fyp.service";

let f = 1;
export default class AppliedFYP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      selected2: undefined,
      fyp: null,
      hasNext: false,
      page: 1,
      totalPages: 1,
      moreLoading: false,
      requested: false,
      searchClick: false,
      errorLoading: false
    };
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    this.pageReload();
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

  pageReload() {
    this.setState({ fyp: null });
    AllAppliedFYP(1)
      .then(response => {
        // console.log(response.data.fyps.docs);
        this.setState({
          fyp: response.data.fyps.docs,
          hasNext: response.data.fyps.hasNextPage,
          page: response.data.fyps.page,
          errorLoading: false
        });
      })
      .catch(e => {
        this.setState({ errorLoading: true, fyp: null });
        if (e) {
          console.log(e);
        }
      });
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  renderEventList(data1) {
    const list = [];
    if (data1) {
      data1.forEach(item => {
        list.push(
          <FYPCard
            key={item._id}
            navigation={this.props.navigation}
            data={item}
            registered={true}
            screen="register"
          />
        );
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
    this.refresh
      .animate({ from: { rotate: "0deg" }, to: { rotate: "360deg" } }, 1000)
      .then(() => {
        this.pageReload();
      });
  }

  onLoadMoreData() {
    if (this.state.requested && f === 1) {
      f = 0;

      const currentPage = this.state.page;
      const nextPage = currentPage + 1;
      View_FYP(nextPage)
        .then(response => {
          const newFyps = this.state.fyp.concat(response.data.fyps.docs);
          this.setState({
            hasNext: response.data.fyps.hasNextPage,
            requested: false,
            moreLoading: false,
            Jobs: newFyps,
            page: nextPage,
            errorLoading: false
          });
          f = 1;
        })
        .catch(e => {
          this.setState({ errorLoading: true, fyp: null });
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
              {this.renderEventList(this.state.fyp)}
              {this.moreLoadSpinner()}
            </Animatable.View>
          </ScrollView>
        )}
      </Container>
    );
  }
}
