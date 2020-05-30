/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-string-refs */
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
import React, { Component } from 'react';
import {
  Container,
  Item,
  Text,
  Input,
  Icon,
  Button,
  View,
  Label,
  Picker,
  Spinner,
  Fab,
  Form,
} from 'native-base';
import { Block } from 'galio-framework';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { AsyncStorage, Image } from 'react-native';
import EventCard from '../src/EventCard';
// Services
import {
  
  ViewAllEvent as View_Event,
  SearchEvent
} from '../../services/event.service';


const getCurrentUser = async () => {
  // const user = localStorage.getItem("user");
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

let f = 1;
 searchclicked = false;
export default class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      selected2: undefined,
      searchClick: false,
      events: null,
      id: null,
      type: null,
      field: null,
      city: null,
      title: null,
      hasNext: false,
      page: 1,
      totalPages: 1,
      moreLoading: false,
      requested: false,
      errorLoading: false
    };
    this.setDate = this.setDate.bind(this);
  }

  async componentWillMount() {
    const id = await getCurrentUser();
    // console.log(id);
    this.setState({ id });
    console.ignoredYellowBox = ['Warning:'];
  }

  changeType(value) {
    this.setState({ type: value });
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
  matchUserWithApplicants(data1) {
    const id = this.state.id;

    let z = 0;
    const applicants = data1.eventparticipants;
     // console.log(id);
    if (applicants) {
      applicants.forEach(item => {
        // console.log(id);
        if (item === id.user.id) {
          // console.log("item: ",item);
          
          return 1;
        }
      });
    }
     
    return 0;
  }
  moreLoadSpinner() {
    if (this.state.moreLoading) {
      return <Spinner color="blue" />;
    }
    return null;
  }
  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return layoutMeasurement.height + contentOffset.y
      >= contentSize.height - 100;
  }

  componentDidMount() {
    searchclicked = false;
    const didfocussubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        // console.log("willfocus");
        this.setState({ events: null });
        View_Event(1)
          .then(response => {
            // console.log(response.data.events);
            this.setState({
              events: response.data.events.docs,
              hasNext: response.data.events.hasNextPage,
              page: response.data.events.page,
              errorLoading: false 
            });
          })
          .catch(e => {
            if (e) {
              this.setState({ errorLoading: true, events: null });
              console.log(e);
            }
          });
        // this.renderProfile();
      }
    );
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onValueChange2(value) {

    this.setState({
      selected2: value,
    });
  }

  renderEventList(data1) {
    const list = [];
    if (data1) {
      data1.forEach(item => {
        // console.log (item);
        const str = item.dateAt;
        const d1 = new Date(str);
        const d2 = new Date();
        if (d1 > d2) {
           // console.log(item);
          let applied = this.matchUserWithApplicants(item);
          // console.log("event event screen:",applied);
          list.push(
            <EventCard
              key={item._id}
              navigation={this.props.navigation}
              data={item}
              screen={applied ? 'register' : 'event'}
              registered={applied}
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

  loadSpinner() {
    return <Spinner color="blue" />;
  }

  refsAssig = ref => {
    this.refresh = ref;
  };



  rotateRefresh() {
    searchclicked = false;
    this.refresh
      .animate({ from: { rotate: '0deg' }, to: { rotate: '360deg' } }, 1000)
      .then(() => {
        this.setState({ events: null });
        View_Event(1)
          .then(response => {
            // console.log(response.data.events);
            this.setState({
              events: response.data.events.docs,
              hasNext: response.data.events.hasNextPage,
              page: response.data.events.page,
              errorLoading: false 
            });

            this.mainList.slideInUp(1500);
          })
          .catch(e => {
            this.setState({ errorLoading: true, events: null });
            if (e) {
              console.log(e);
            }
          });
      });
    // this.refresh.bounce(1000).then(()=>console.log("bounced"));
  }

  eventList = ref => {
    this.mainList = ref;
  };

  onLoadMoreData() {
    // console.log("onLoadmoredata", 1);
    if (this.state.requested && f === 1) {
      // console.log("onLoadmoredata", 2);
      f = 0;
      // console.log("onLoadmoredata");
      const currentPage = this.state.page;
      const nextPage = currentPage + 1;
      if(searchclicked){
        
      let {  type, field, city } = this.state;
    const Title = this.state.title ? this.state.title.trim() ? this.state.title.trim() : null : null;
    city = city ? city.trim() ? city.trim() : null : null;
      field = field ? field.trim() ? field.trim() : null : null;
      
    if (Title || city || field) {
      
      
      
      SearchEvent(nextPage, Title, city, field, type)
      .then(response => {
        console.log(response.data.events);
        const newEvents = this.state.events.concat(response.data.events.docs);
        this.setState({
          events: newEvents,
          hasNext: response.data.events.hasNextPage,
          page: nextPage,
          requested: false,
          moreLoading: false,
          searchClick: false,
          errorLoading: false 
        });
        f=1;
      })
      .catch(e => {
        this.setState({ errorLoading: true, events: null });
        if (e) {
          console.log(e);
        }
      });
    }
      }else{
        
          
      View_Event(nextPage)
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

    }
  scrollInside() {
    this.setState({ requested: true, moreLoading: true });
    // console.log("isCloseToBottom Chal gya");
    this.onLoadMoreData();
  }

  fetchSearchResults() {
    searchclicked = true;
    let { title, type, field, city } = this.state;
    const Title = this.state.title ? this.state.title.trim() ? this.state.title.trim() : null : null;
    city = city ? city.trim() ? city.trim() : null : null;
      field = field ? field.trim() ? field.trim() : null : null;
    if (Title || city || field) {
      
      this.setState({ events: null, page: 1 });
      SearchEvent(1, Title, city, field, type)
        .then(response => {
          // console.log(response.data.events);
          this.setState({
            events: response.data.events.docs,
            hasNext: response.data.events.hasNextPage,
            page: response.data.events.page,
            searchClick: false,
            errorLoading: false 
          });
        })
        .catch(e => {
          this.setState({ errorLoading: true, events: null });
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
          style={{ backgroundColor: '#5E72E4', zIndex: 4 }}
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
              style={{ color: 'white' }}
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
            <Text style={{ textAlign: "center"}}>Something Went Wrong {"\n"} Try Again</Text>
          </View>
        ) : (
        <ScrollView style={{ backgroundColor: '#f4f4f4' }} onScroll={({ nativeEvent }) => {

          if (this.isCloseToBottom(nativeEvent) && this.state.hasNext) {
            // console.log("Listener working");
            if (f === 1) {
              this.scrollInside();
            }
          }
        }}
        >
          <Block middle style={{ top: 7, left: 3 }}>
            <View style={{ flexDirection: 'row', width: '95%' }}>
              <Item
                regular
                style={{ width: '85%', height: 50, backgroundColor: 'white' }}
              >
                <Icon name="ios-search" />
                <Input
                  onTouchStart={() => this.setState({ searchClick: true })}
                  placeholder="Search"
                  onChangeText={this.changeTitle.bind(this)}
                  value={this.state.title}
                />
                {this.state.searchClick
                  ? <Button
                    transparent
                    onPress={() => this.setState({ searchClick: false })}
                    style={{ width: 50, flexWrap: 'wrap' }}
                  >
                    <Icon type="Entypo" name="cross" style={{ fontSize: 20 }} />
                  </Button>
                  : null}
              </Item>
              <Button
                style={{ backgroundColor: '#5E72E4', height: 50, width: '15%' }}
                transparent
                onPress={() => this.fetchSearchResults()}
              >
                <Text style={{ color: 'white' }}>Go</Text>
              </Button>
            </View>
            {this.state.searchClick
              ? <Animatable.View
                animation="flipInX"
                duration={800}
                style={{
                  width: '94%',
                  backgroundColor: 'white',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  elevation: 3,
                  borderRightWidth: 0.4,
                  borderBottomWidth: 0.4,
                  left: 1,
                  flexDirection: 'column',
                  flex: 4,
                  flexWrap: 'wrap',
                  flexShrink: 0,
                  flexBasis: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 0.9, marginTop: 4 }}>
                    <Form>
                      <Item regular inlineLabel>
                        <Label style={{ marginLeft: 5 }}>City{'     '}</Label>
                        <Input
                          onChangeText={this.changeCity.bind(this)}
                          value={this.state.city}
                          placeholder="Islamabad"
                        />
                      </Item>
                    </Form>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 0.9, marginTop: 4 }}>
                    <Form>
                      <Item regular inlineLabel>
                        <Label style={{ marginLeft: 5 }}>Field{'    '}</Label>
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
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 0.9, marginTop: 4, flexShrink: 1 }}>
                    <Form>
                      <Item picker regular inlineLabel>
                        <Label style={{ marginLeft: 5 }}>Type{'   '}</Label>

                        <Picker
                          style={{ textAlign: 'center' }}
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          placeholder="Select your SIM"
                          placeholderStyle={{ color: '#bfc6ea' }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.type}
                          onValueChange={this.changeType.bind(this)}
                        >
                          <Picker.Item label="Any" value="null" />
                          <Picker.Item label="Job fair" value="jobfair" />
                          <Picker.Item
                            label="Networking"
                            value="networking"
                          />
                          <Picker.Item label="Webinar" value="webinar" />
                          <Picker.Item label="Workshop" value="workshop" />
                        </Picker>
                      </Item>
                    </Form>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 0.9, marginTop: 4, flexShrink: 1 }} />
                </View>

                {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{flex: 0.3}}>
                      <Text>Event Type </Text>
                    </View>
                    <View style={{flex: 0.4}}>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{width: undefined}}
                        placeholder="Select your SIM"
                        placeholderStyle={{color: '#bfc6ea'}}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChange2.bind (this)}
                      >
                        <Picker.Item label="Any" value="key0" />
                        <Picker.Item label="Workshop" value="key1" />
                      </Picker>
                    </View>
                  </View> */}
              </Animatable.View>
              : null}
          </Block>
          <Animatable.View
            animation="slideInUp"
            ref={this.eventList}
            duration={1500}
            style={{ marginLeft: 7, marginRight: 7, marginTop: 18 }}
          >
            {this.state.events === null
              ? this.loadSpinner()
              : this.renderEventList(this.state.events)}
            {this.moreLoadSpinner()}
          </Animatable.View>
        </ScrollView>)}
      </Container>
    );
  }
}
