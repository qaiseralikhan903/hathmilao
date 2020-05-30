/* eslint-disable prefer-template */
/* eslint-disable no-else-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-state */
/* eslint-disable global-require */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { ScrollView, Image, View, TouchableHighlight } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Toast
} from "native-base";
import ImgToBase64 from "react-native-image-base64";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import * as Mime from "react-native-mime-types";
import * as FileSystem from "expo-file-system";
import { SuccessToast, DangerToast } from "../src/MyToast";
// Services
import { UpdateBasic as Edit_Basic } from "../../services/profile/Basic.service";
import { sb } from "../../services/chat.init";
import config from "../../util/config.json";
import { getCurrentUser } from "../../services/auth.service";

const toDataURL = url =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
let z = 0;
export default class StackedLabelExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      name: null,
      headline: null,
      summary: null,
      phonenumber: null,
      city: null,
      country: null,
      githublink: "www.github.com/user",
      image: null,
      imageDisplay: null,
      selectedImage: null,
      image_meta: null,
      loading: false,
      imageurl: null
    };
  }
  componentWillMount() {
    const prof = this.props.navigation.getParam("data", null);
    this.setState({ profile: prof });
    z = 0;
  }
  componentDidMount() {
    const prof = this.state.profile;
    this.setState({
      name: prof.name,
      headline: prof.headline,
      summary: prof.summary,
      phonenumber: prof.phonenumber,
      city: prof.city,
      country: prof.country,
      githublink: "www.github.com/user",
      imageurl: prof.imageurl
    });
  }

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true
    });

    // console.log(result);

    if (!result.cancelled) {
      const image = result;
      const extension = Mime.extension(image.type) || "jpg";
      const meta = {
        extension: extension
      };
      this.setState({
        image: image.base64,
        image_meta: meta,
        imageDisplay: image
      });
      // console.log(image);
      // selectedImage: URL.createObjectURL(image.base64),
    }
  };

  onSubmit() {
    this.setState({ visible: true });
    const data = this.state;
    // console.log(data);
    Edit_Basic(data)
      .then(async response => {
        this.setState({ visible: false });
        console.log("success");
        SuccessToast("Profile Updated Successfully");
        const USER_ID = await getCurrentUser().user.id;
        sb.connect(USER_ID);
        sb.updateCurrentUserInfo(
          this.state.name,
          this.state.selectedImage,
          function(response, error) {
            if (error) {
              console.log(error);
              return;
            }
          }
        );
      })
      .catch(e => {
        if (e) {
          this.setState({ visible: false });
          console.log("catch");
         // DangerToast("There was a problem in Updating Profile");
         // SuccessToast("Profile Updated Successfully");
          console.log(e.response);
        }
        this.props.navigation.navigate("ErrorScreen");
      });
  }

  loadImage() {
    if (!this.state.imageDisplay) {
      if (this.state.imageurl) {
        if (z === 0) {
          z = 1;
          return {
            uri:
              `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${this.state.imageurl}` +
              "?" +
              new Date()
          };
        } else {
          return {
            uri: `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${this.state.imageurl}`
          };
        }
      } else {
        return require("../../assets/imgs/Avatar.jpg");
      }
    }

    return { uri: this.state.imageDisplay.uri };
  }

  render() {
    return (
      <Container>
        <Spinner
          visible={this.state.visible}
          textContent="Updating Profile"
          textStyle={{
            color: "black"
          }}
        />
        <Content>
          <ScrollView style={{ flexWrap: "wrap", flex: 1 }}>
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                height: 200,
                left: 20,
                top: 20
              }}
            >
              <Image
                style={{
                  width: 124,
                  height: 124,
                  borderRadius: 62,
                  borderWidth: 0
                }}
                source={this.loadImage()}
              />
              <Button
                style={{ width: 150, backgroundColor: "blue", top: 10 }}
                primary
                onPress={this.pickImage}
              >
                <Text>Upload Image</Text>
              </Button>
            </View>
            <View />
            <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={50}>
              <Form>
                <Item stackedLabel last>
                  <Label>Full Name</Label>
                  <Input
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.refs.HeadLineText._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                  />
                </Item>
                <Item style={{ padding: 0 }} stackedLabel last>
                  <Label>HeadLine Text</Label>
                  <Input
                    returnKeyType="next"
                    ref="HeadLineText"
                    onSubmitEditing={() => {
                      this.refs.ProfileSummary._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    onChangeText={headline => this.setState({ headline })}
                    value={this.state.headline}
                  />
                </Item>
                <Item stackedLabel last>
                  <Label>Profile Summary</Label>
                  <Input
                    returnKeyType="next"
                    ref="ProfileSummary"
                    onSubmitEditing={() => {
                      this.refs.phonenumber._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    onChangeText={summary => this.setState({ summary })}
                    value={this.state.summary}
                  />
                </Item>
                <Item stackedLabel last>
                  <Label>Phone Number</Label>
                  <Input
                    returnKeyType="next"
                    ref="phonenumber"
                    onSubmitEditing={() => {
                      this.refs.city._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    onChangeText={phonenumber => this.setState({ phonenumber })}
                    value={this.state.phonenumber}
                  />
                </Item>
                <Item stackedLabel last>
                  <Label>City</Label>
                  <Input
                    returnKeyType="next"
                    ref="city"
                    onSubmitEditing={() => {
                      this.refs.country._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    onChangeText={city => this.setState({ city })}
                    value={this.state.city}
                  />
                </Item>
                <Item stackedLabel last>
                  <Label>Country</Label>
                  <Input
                    returnKeyType="next"
                    ref="country"
                    onSubmitEditing={() => {
                      this.refs.githublink._root.focus(); // <-- MADE THE CHANGE HERE
                    }}
                    onChangeText={country => this.setState({ country })}
                    value={this.state.country}
                  />
                </Item>
                <Item stackedLabel last>
                  <Label>Github Link</Label>
                  <Input
                    ref="githublink"
                    onChangeText={githublink => this.setState({ githublink })}
                    value={this.state.githublink}
                  />
                </Item>
              </Form>
            </KeyboardAwareScrollView>
            <View
              style={{
                flexDirection: "row-reverse",
                flex: 1,
                top: 20,
                right: 10,
                flexWrap: "wrap"
              }}
            >
              <Button
                style={{ backgroundColor: "blue", width: 100, right: 10 }}
                onPress={() => this.onSubmit()}
              >
                <Text>Update</Text>
              </Button>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ color: "white" }}>hdfk</Text>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
