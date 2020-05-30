/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/sort-comp */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';
import {
  Text,
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Button,
  View,
  Right,
  Left,
  Icon,
  Form,
  Input,
  Item,
  Label,
  Spinner,
} from 'native-base';
import { DangerToast, SuccessToast } from "./MyToast";
import * as Animatable from 'react-native-animatable';
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import HTMLView from "react-native-htmlview";
import {Block} from 'galio-framework';
import Modal from 'react-native-modal';
import {CancelAttemptChallenge, AttemptChallenge, UploadSolution as Solution} from '../../services/challenege.service';

const screenWidth = Math.round (Dimensions.get ('window').width);
const screenHeight = Math.round (Dimensions.get ('window').height);
let stars = 0;
export default class ChallengeCard extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: this.props.data,
      isModalVisible: false,
      expanded: false,
      screen: this.props.screen,
      registered: this.props.registered,
      link: null,
      submission: this.props.data.challengesubmission,
      uploading: false,
      uploaded: false,
      expire: false,
      IsRating: 0,
      uploadingError: null
    };
  }
  bounce () {
    // this.refs.view.transition (
    //   {
    //     opacity: 0.6,
    //   },
    //   {opacity: 1},
    //   200,
    //   'bounceIn'
    // );
  }

  componentWillMount () {
    this.isExpire ();
    const min=this.getRating ();
    this.setState({IsRating: min});
    // console.log(this.props.data);
  }
  getRating () {
    const array = this.state.submission;
    // console.log(array);
    let min = 0;
    if (array) {
      array.forEach (item => {

        if (item.rating > min) {
          min = item.rating;
        }
      });
    }
    stars = min;
    return min;
  }

  toggleModal = () => {
    this.setState ({isModalVisible: !this.state.isModalVisible});
  };
  onClick () {
    this.setState ({expanded: !this.state.expanded});
  }
  renderArray (data) {
    const items = data.map (item => {
      return (
        <Button
          key={item}
          style={{
            backgroundColor: '#2DCE89',
            margin: 5,
            flexWrap: 'wrap',
            height: 25,
            borderRadius: 10,
          }}
        >
          <Text style={{textAlign: 'center'}}>{item}</Text>
        </Button>
      );
    });

    return items;
  }
  strSplit (date) {
    const str = String (date).split ('T');
    return str[0];
  }
  STRIPHTML (myString) {
    return myString.replace (/<[^>]*>?/gm, '');
  }

  changeLink (value) {
    this.setState ({link: value});
  }

  displayEmptyStar (stars) {
    if (stars === 0) {
      return null;
    } else {
      const list = [];
      for (let index = 0; index < 5 - stars; index++) {
        list.push (
          <Icon
            key={index + stars}
            name="star-o"
            type="FontAwesome"
            style={{fontSize: 40}}
          />
        );
      }

      return list;
    }
  }

  displayColorStar (stars) {
    const list = [];
    for (let index = 0; index < stars; index++) {
      list.push (
        <Icon
          key={index}
          style={{color: '#ffc107', fontSize: 40}}
          name="star"
          type="FontAwesome"
        />
      );
    }

    return list;
  }
  displayStars (stars) {
    console.log (stars);
    return (
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          marginBottom: 10,
          alignItems: 'center',
          top: 30,
          flexWrap: 'wrap',
        }}
      >
        {this.displayColorStar (stars)}
        {this.displayEmptyStar (stars)}
      </View>
    );
  }

  isExpire () {
    const str = this.props.data.applybefore;
    const d1 = new Date (str);
    const d2 = new Date ();
    if (d1 < d2) {
      // console.log ('isExpire:', d1 > d2);
      this.setState ({expire: true});
    }
  }

  renderCancelButton () {
    // console.log (this.state.expire);
    if (!stars && !this.state.expire) {
      return (
        <Button
          block
          style={[
            styles.showMoreButton,
            {width: '45%'},
            {
              backgroundColor: '#FB6340',
            },
          ]}
          onPress={() => {
            this.setState ({registered: false, screen: 'challenge'});
            CancelAttemptChallenge (this.state.data._id);
            SuccessToast("Challenge Cancelled Successfully");
          }}
        >
          <Text style={{textAlign: 'center', fontSize: 12}}>
            Cancel Challenge
          </Text>
        </Button>
      );
    }
    return null;
  }

validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      
      if(!!pattern.test(str)){
        const result= JSON.stringify(this.state.link);
        Solution(result, this.props.data._id);
        
        //console.log();
        this.setState ({uploading: false, uploaded: true, uploadingError: false});
      }else{
        this.setState ({uploading: false, uploaded: false, uploadingError: true});
      }
      
   
  }
  cardDetailDescription(heading, detail, myColor, icon, fonttype) {
    return (
      <View style={{ flexDirection: "column", padding: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon type={fonttype} name={icon} style={{ fontSize: 14, top: 15 }} />
          <Text
            style={{
              color: "#32325D",
              fontSize: 18,
              fontWeight: "bold",
              left: 10,
              top: 15
            }}
          >
            {heading}
          </Text>
        </View>
        <View style={{ flexWrap: "wrap", marginTop: 14, flexDirection: "row" }}>
          <Text>{"       "}</Text>
          <HTMLView value={detail} />
        </View>
      </View>
    );
  }
  showExpanded () {
    console.log (this.state);
    if (!this.state.expanded) {
      return (
        <Button
          bordered
          block
          style={{
            borderColor: '#5E72E4',
            top: 30,
            bottom: 15,
            elevation: 3,
          }}
          onPress={this.onClick.bind (this)}
        >
          <Text>Show More</Text>
        </Button>
      );
    }

    return (
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        style={{flexDirection: 'column'}}
      >
        {this.cardDetailDescription (
          'Description',
          this.STRIPHTML (this.props.data.description),
          null,
          'description',
          'MaterialIcons'
        )}
        {this.cardDetail (
          'Apply Before',
          this.strSplit (this.props.data.applybefore),
          null,
          'clockcircleo',
          'AntDesign'
        )}
        {this.cardDetail (
          'City',
          this.props.data.city,
          null,
          'location-on',
          'MaterialIcons'
        )}

        <Text
          style={{
            color: '#32325D',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 50,
          }}
        >
          Required Skills
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', top: 20}}>
          {this.renderArray (this.state.data.requiredSkill)}
        </View>

        <Text />

        {this.state.screen === 'register' &&
          this.state.IsRating === 0 &&
          !this.state.expire
          ? <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                top: 30,
                flexWrap: 'wrap',
              }}
            >
              <Button
                block
                style={[
                  styles.showLessButton,
                  {width: '90%'},
                  {backgroundColor: '#7BDEB2'},
                ]}
                onPress={this.toggleModal}
              >
                <Text style={{textAlign: 'center', fontSize: 12}}>
                  Upload Solution
                </Text>
              </Button>
              <Modal style={{padding: 0}} isVisible={this.state.isModalVisible}>
                <View
                  style={{
                    width: screenWidth,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    flexDirection: 'column',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: screenHeight * 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: screenWidth * 0.89,
                      marginRight: 10,
                    }}
                  >
                    {this.state.uploading
                      ? <View>
                          <Spinner color="blue" />
                        </View>
                      : null}
                    {this.state.uploaded && this.state.uploadingError===false
                      ? <View>
                          <Text style={{color: '#2DCE89'}}>
                            Solution Uploaded !!
                          </Text>
                        </View>
                      : null}
                      {this.state.uploadingError===true?<View>
                      <Text style={{color: 'red'}}>
                        Solution Not Uploaded !!
                      </Text>
                    </View>: null}
                    <View
                      style={{flexDirection: 'row', width: screenWidth * 0.8}}
                    >
                      <Form>
                        <Item
                          regular
                          style={{
                            width: screenWidth * 0.8,
                            backgroundColor: 'white',
                          }}
                        >

                          <Input
                            onChangeText={this.changeLink.bind (this)}
                            value={this.state.link}
                            placeholder="Paste Link here"
                          />
                        </Item>

                      </Form>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row-reverse',
                        alignSelf: 'flex-end',
                        marginTop: 15,
                      }}
                    >
                      <Button
                        style={{marginRight: 20, backgroundColor: '#F5365C'}}
                        onPress={() => {
                          this.toggleModal ();
                          this.setState ({uploaded: false, uploading: false, uploadingError: null});
                        }}
                      >
                        <Text>Cancel</Text>
                      </Button>
                      <Button
                        style={{marginRight: 20, backgroundColor: '#7BDEB2'}}
                        onPress={() => {
                          this.setState ({uploading: true, uploaded: false});
                          this.validURL(this.state.link);
                           
                        }}
                      >
                        <Text>Upload</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          : this.displayStars (this.state.IsRating)}

        <View
          style={{
            flexDirection: 'row',
            top: 30,
            flexWrap: 'wrap',
          }}
        >
          {!this.state.IsRating?this.state.screen === 'register' || this.state.registered
            ? this.renderCancelButton ()
            : <Button
                block
                style={[styles.showMoreButton, {width: '45%'}]}
                onPress={() => {
                  this.setState ({registered: true, screen: 'register'});
                  
                  AttemptChallenge (this.state.data._id);
                  SuccessToast("Challenge Acceptted Successfully, Now you can upload solution");
                }}
              >
                <Text style={{textAlign: 'center', fontSize: 12}}>
                  Accept Now
                </Text>
              </Button>:null}
          {}

          <Button
            block
            style={[styles.showLessButton, {width: '45%'}]}
            onPress={this.onClick.bind (this)}
          >
            <Text style={{textAlign: 'center', fontSize: 12}}>Show Less</Text>
          </Button>
        </View>
      </Animatable.View>
    );
  }

  cardDetail (heading, detail, myColor, icon, fonttype) {
    return (
      <View style={{flexDirection: 'row', padding: 5}}>
        <View style={{flex: 0.45, flexDirection: 'row'}}>
          <Icon type={fonttype} name={icon} style={{fontSize: 14, top: 15}} />
          <Text
            style={{
              color: '#32325D',
              fontSize: 14,
              fontWeight: 'bold',
              left: 10,
              top: 15,
            }}
          >
            {heading}
          </Text>
        </View>
        <View style={{flex: 0.55, flexWrap: 'wrap'}}>
          <Text style={{color: myColor ? '#FB6340' : '#525F7F', top: 15}}>
            {detail}
          </Text>
        </View>
      </View>
    );
  }
  componentWillUnmount () {
    this.toggleModal ();
  }

  render () {
    return (
      <Animatable.View ref="view">
        <TouchableWithoutFeedback onPress={() => this.bounce ()}>
          <Card>
            <CardItem style={{backgroundColor: '#f4f4f4'}} header bordered>
              <Icon
                type="MaterialIcons"
                name="title"
                style={{fontSize: 18, color: '#32325D'}}
              />
              <Text style={{fontSize: 18, color: '#32325D'}}>
                {this.props.data.title}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Body
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                }}
              >
                {this.cardDetail (
                  'Team Member',
                  this.props.data.teamMember,
                  null,
                  'users',
                  'Entypo'
                )}
                {this.cardDetail (
                  'Degree',
                  this.props.data.requireddegree,
                  null,
                  'graduation-cap',
                  'FontAwesome'
                )}
                {this.cardDetail (
                  'Company',
                  this.props.data.company,
                  null,
                  'office-building',
                  'MaterialCommunityIcons'
                )}

                {this.showExpanded ()}
                <Text />
                <Text />
              </Body>
            </CardItem>
          </Card>
        </TouchableWithoutFeedback>
      </Animatable.View>
    );
  }
}

const styles = {
  showMoreButton: {
    backgroundColor: '#5E72E4',
    marginTop: 10,
    marginRight: 10,
    bottom: 15,
    width: '30%',
    elevation: 6,
    borderRadius: 12,
  },
  showLessButton: {
    backgroundColor: '#172B4D',
    marginTop: 10,
    marginRight: 10,
    bottom: 15,
    width: '30%',
    elevation: 6,
    borderRadius: 12,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    backgroundColor: '#ecf0f1',
  },
};
