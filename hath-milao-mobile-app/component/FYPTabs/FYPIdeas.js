/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-destructuring */
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
import React, {Component} from 'react';
import {
  Container,
  Item,
  Text,
  Input,
  Icon,
  Button,
  View,
  Fab,
  Form,
  Label,
  Spinner
} from 'native-base';
import {Block} from 'galio-framework';
import {ScrollView} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {AsyncStorage, Image} from 'react-native';
import FYPCard from '../src/FYPCard';
import {ViewAllFYP as View_FYP, SearchFYP} from '../../services/fyp.service';

const getCurrentUser = async () => {
  // const user = localStorage.getItem("user");
  const user = await AsyncStorage.getItem ('user');
  return user ? JSON.parse (user) : null;
};

let f=1;
let searchclicked = false;
export default class FYPIdeas extends Component {
  constructor (props) {
    super (props);
    this.state = {
      chosenDate: new Date (),
      selected2: undefined,
      searchClick: false,
      fyp: null,
      id: null,
      field: null,
      country: null,
      city: null,
      degree: null,
      hasNext: false,
      title: null,
page: 1,
totalPages: 1,
moreLoading: false,
requested: false,
errorLoading: false
    };
    this.setDate = this.setDate.bind (this);
  }

  async componentWillMount () {
    const id = await getCurrentUser ();
    // console.log(id);
    this.setState ({id});
  }

  moreLoadSpinner() {
    if (this.state.moreLoading) {
      return <Spinner color="blue" />;
    }
    return null;
  }
  
  
isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {   return layoutMeasurement.height + contentOffset.y 
       >= contentSize.height - 100; }


  componentDidMount () {
     searchclicked = false;
    const didfocussubscription = this.props.navigation.addListener (
      'willFocus',
      () => {
        // console.log("willfocus");
        this.setState ({fyp: null});
        View_FYP (1)
          .then (response => {
            // console.log(response.data.fyps);
            this.setState ({
              fyp: response.data.fyps.docs,
              hasNext: response.data.fyps.hasNextPage,
              page: response.data.fyps.page,
              errorLoading: false 
            });
          })
          .catch (e => {
            this.setState({ errorLoading: true, fyp: null });
            if (e) {
              console.log (e);
            }
          });
        // this.renderProfile();
      }
    );
  }

  setDate (newDate) {
    this.setState ({chosenDate: newDate});
  }
  onValueChange2 (value) {
    this.setState ({
      selected2: value,
    });
  }

  matchUserWithApplicants (data1) {
    const id = this.state.id;

     f = 0;
    const applicants = data1.fypapplicants;
    // console.log(id);
    if (applicants) {
      applicants.forEach (item => {
        // console.log(id);
        if (item === id.user.id) {
          f = 1;
        }
      });
    }
    // console.log(f);
    return f;
  }

  renderFYPList (data1) {
    const list = [];
    
    if (data1) {
      
        
          data1.forEach (item => {
            const str = item.applybefore;
        const d1 = new Date (str);
        const d2 = new Date ();
            if(d1>d2){
              let applied = this.matchUserWithApplicants (item);
            // console.log(applied);
            list.push (
              <FYPCard
                key={item._id}
                navigation={this.props.navigation}
                data={item}
                registered={applied}
                screen={applied ? 'register' : 'fyp'}
              />
            );
            }
          });
        
      
    }
    if(list || list.length< 4){
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

  changeTitle(value) {
    this.setState({ title: value });
  }
  rotateRefresh () {
     searchclicked = false;
    this.refresh
      .animate ({from: {rotate: '0deg'}, to: {rotate: '360deg'}}, 1000)
      .then (async() => {
       await this.setState ({fyp: null, page : 1});
        View_FYP (1)
          .then (response => {
            // console.log(response.data.fyps.docs);
            this.setState ({
              fyp: response.data.fyps.docs,
              hasNext: response.data.fyps.hasNextPage,
              page: response.data.fyps.page,
              errorLoading: false 
            });
          })
          .catch (e => {
            this.setState({ errorLoading: true, fyp: null });
            if (e) {
              console.log (e);
            }
          });
      });
  }

  changeDegree (value) {
    this.setState ({degree: value});
  }

  changeCountry (value) {
    this.setState ({country: value});
  }

  changeField (value) {
    this.setState ({field: value});
  }

  changeCity (value) {
    this.setState ({city: value});
  }

  onLoadMoreData() {
    if(this.state.requested && f===1){
      f=0;
      
      const currentPage= this.state.page;
      const nextPage= currentPage+1;
      if(searchclicked){
        


            const Title = this.state.title ? this.state.title.trim() ? this.state.title.trim() : null : null;
            let { title, country, field, city, degree } = this.state;
              city = city ? city.trim() ? city.trim() : null : null;
              country = country ? country.trim() ? country.trim() : null : null;
              degree = degree ? degree.trim() ? degree.trim() : null : null;
              field = field ? field.trim() ? field.trim() : null : null;
            if (Title || field || city || degree) {
        
        
              
              SearchFYP(nextPage, field, city, Title, degree)
            .then(response => {
              // console.log(response.data);
              const newFyps=this.state.fyp.concat(response.data.fyps.docs);
              this.setState({
                fyp: newFyps,
                hasNext: response.data.fyps.hasNextPage,
                page: nextPage,
                requested: false,
                    moreLoading: false,
                searchClick: false,
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
              
            } else {
              this.setState({
                searchClick: false
              });
            
        


           
      }
    }else{
      View_FYP(nextPage)
        .then(response => {
          
         const newFyps=this.state.fyp.concat(response.data.fyps.docs); 
        if(newFyps){
          this.setState({
            hasNext: response.data.fyps.hasNextPage,
            requested: false,
            moreLoading: false,
            fyp: newFyps,
			      page: nextPage,
            errorLoading: false 
          });
          f = 1;

        }
        })
        .catch(e => {
          this.setState({ errorLoading: true, fyp: null });
          if (e) {
            console.log(e);
            
          }
        });
      }
    }
    
  } 

  fetchSearchResults() {
    searchclicked = true;
    const Title = this.state.title ? this.state.title.trim() ? this.state.title.trim() : null : null;
    let { title, country, field, city, degree } = this.state;
      city = city ? city.trim() ? city.trim() : null : null;
      country = country ? country.trim() ? country.trim() : null : null;
      degree = degree ? degree.trim() ? degree.trim() : null : null;
      field = field ? field.trim() ? field.trim() : null : null;
    if (Title || field || city || degree) {


      this.setState({ fyp: null, page: 1 });
      SearchFYP(1, field, city, Title, degree)
        .then(response => {
          // console.log(response.data);
          this.setState({
            fyp: response.data.fyps.docs,
            hasNext: response.data.fyps.hasNextPage,
            page: response.data.fyps.page,
            searchClick: false,
            errorLoading: false 
          });
        })
        .catch(e => {
          this.setState({ errorLoading: true, fyp: null });
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
  loadSpinner() {
    return <Spinner color="blue" />;
  }
  render () {
    return (
      <Container>
        <Fab
          active
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#5E72E4', zIndex: 4}}
          position="bottomRight"
          onPress={() => {
            this.rotateRefresh ();
          }}
        >
          <Animatable.View
            ref={this.refsAssig.bind (this)}
            style={{zIndex: 4}}
            easing="linear"
            useNativeDriver
          >
            <Icon
              style={{color: 'white'}}
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
        <ScrollView style={{backgroundColor: '#E7E7E7'}} onScroll={async({ nativeEvent }) => {
            
            if (this.isCloseToBottom(nativeEvent) && this.state.hasNext) {
              // console.log("Listener working");
              if (f === 1) {
                this.setState({ requested: true, moreLoading: true });
                // console.log("isCloseToBottom Chal gya");
               await this.onLoadMoreData();
              }
            }
          }}>
          <Block middle style={{top: 7, left: 3}}>
            <View style={{flexDirection: 'row', width: '95%'}}>
              <Item
                regular
                style={{width: '85%', height: 50, backgroundColor: 'white'}}
                
              >
                <Icon name="ios-search" />
                <Input
                  onTouchStart={() => this.setState ({searchClick: true})}
                  placeholder="Search"
                  onChangeText={this.changeTitle.bind(this)}
                  value={this.state.title}
                />
                {this.state.searchClick
                  ? <Button
                      transparent
                      onPress={() => this.setState ({searchClick: false})}
                      style={{width: 50, flexWrap: 'wrap'}}
                    >
                      <Icon type="Entypo" name="cross" style={{fontSize: 20}} />
                    </Button>
                  : null}
              </Item>
              <Button
                style={{backgroundColor: '#5E72E4', height: 50, width: '15%'}}
                transparent
                onPress={() => {searchclicked = true;this.fetchSearchResults();}}
              >
                <Text style={{color: 'white'}}>Go</Text>
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
                    <View style={{flex: 0.9, marginTop: 4}}>
                      <Form>
                        <Item regular inlineLabel>
                          <Label style={{marginLeft: 5}}>
                            Field{'       '}
                          </Label>
                          <Input
                            onChangeText={this.changeField.bind (this)}
                            value={this.state.field}
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
                    <View style={{flex: 0.9, marginTop: 4}}>
                      <Form>
                        <Item regular inlineLabel>
                          <Label style={{marginLeft: 5}}>
                            City{'       '}{'  '}
                          </Label>
                          <Input
                            onChangeText={this.changeCity.bind (this)}
                            value={this.state.city}
                            placeholder="Islamabad"
                          />
                        </Item>
                      </Form>
                    </View>
                  </View>

                  {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{flex: 0.9, marginTop: 4}}>
                      <Form>
                        <Item regular inlineLabel>
                          <Label style={{marginLeft: 5}}>Country{'  '}</Label>
                          <Input
                            onChangeText={this.changeCountry.bind (this)}
                            value={this.state.country}
                            placeholder="Pakistan"
                          />
                        </Item>
                      </Form>
                    </View>
                  </View> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{flex: 0.9, marginTop: 4}}>
                      <Form>
                        <Item regular inlineLabel>
                          <Label style={{marginLeft: 5}}>Degree{'   '} </Label>
                          <Input
                            onChangeText={this.changeDegree.bind (this)}
                            value={this.state.degree}
                            placeholder="BSCS"
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
                    <View style={{flex: 0.9, marginTop: 4, flexShrink: 1}} />
                  </View>

                </Animatable.View>
              : null}
          </Block>
          <Animatable.View
            animation="slideInUp"
            duration={1500}
            style={{marginLeft: 7, marginRight: 7, marginTop: 18}}
          >
            {this.state.fyp === null
              ? this.loadSpinner()
              : this.renderFYPList (this.state.fyp)}
            
            {this.moreLoadSpinner()}
          </Animatable.View>
        </ScrollView>)}
      </Container>
    );
  }
}
