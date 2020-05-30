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
import { Container, Icon, Fab, Spinner, View, Text } from "native-base";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import ChallengeCard from "../src/ChallengeCard";
import { AllAttemptChallenge } from "../../services/challenege.service";

const data = [];
let f = 1;
export default class Appliedchallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      selected2: undefined,
      searchClick: false,
      challenges: null,
      hasNext: false,
      page: 1,
      totalPages: 1,
      moreLoading: false,
      requested: false,
      errorLoading: false
    };
    this.setDate = this.setDate.bind(this);
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

  componentDidMount() {
    this.setState({ challenges: null });

    AllAttemptChallenge(1)
      .then(response => {
        // console.log (response.data.challenges.docs);
        this.setState({
          challenges: response.data.challenges.docs,
          hasNext: response.data.challenges.hasNextPage,
          page: response.data.challenges.page,
          errorLoading: false
        });
        // console.log (this.state.challenges);
      })
      .catch(e => {
        this.setState({ errorLoading: true, challenges: [] });
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

  renderChallengeList(data1) {
    const list = [];
    if (data1) {
      data1.forEach(item => {
        list.push(
          <ChallengeCard
            key={item._id}
            navigation={this.props.navigation}
            data={item}
            registered
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
        this.setState({ challenges: null });

        AllAttemptChallenge(1)
          .then(response => {
            // console.log (response.data.challenges.docs[0].challengesubmission);
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

  onLoadMoreData() {
    if (this.state.requested && f === 1) {
      f = 0;

      const currentPage = this.state.page;
      const nextPage = currentPage + 1;
      AllAttemptChallenge(nextPage)
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
  loadSpinner() {
    return <Spinner color="blue" />;
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
