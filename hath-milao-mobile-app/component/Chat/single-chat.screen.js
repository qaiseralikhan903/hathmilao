/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-use-before-define */
/* eslint-disable no-lonely-if */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/first */
import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Clipboard
} from "react-native";
import { Text } from "react-native-ui-kitten";

import { GiftedChat, InputToolbar, Actions } from "react-native-gifted-chat";
import { Title, Subheading, Divider } from "react-native-paper";
import { sb } from "../../services/chat.init";
import ChatTopBar from "../src/chatHeaderComponent";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import * as DocumentPicker from "expo-document-picker";

import RBSheet from "react-native-raw-bottom-sheet";

import { Linking } from "expo";

class SingleChatComponent extends React.Component {
  state = {
    user: {},
    channel: {},
    messages: [],
    loading: true,
    orgMessages: [],
    isTyping: false,
    myuser: {}
  };

  componentDidMount() {
    const { state } = this.props.navigation;
    const item = state.params.item;
    const user = item.user;
    const channel = item.channel;
    const isTyping = item.typing;
    // Getting Channel Messages.
    this.setState({
      user,
      channel,
      isTyping,
      myuser: state.params.myuser
    });
    this.loadMessages(channel);
    // Channel Event Handler
    let ChannelHandler = new sb.ChannelHandler();
    ChannelHandler.onTypingStatusUpdated = this.onTypingStatusUpdated;
    ChannelHandler.onUserJoined = this.onUserJoined;
    ChannelHandler.onUserExited = this.onUserLeft;
    ChannelHandler.onChannelChanged = this.onChannelChanged;
    ChannelHandler.onReadReceiptUpdated = this.onReadReceiptUpdated;
    ChannelHandler.onMessageReceived = this.onMessageReceived;
    ChannelHandler.onDeleteMessage = this.onDeleteMessageEvent;
    sb.addChannelHandler("ChannelHandler", ChannelHandler);

    // User Event Handler
    const UserHandler = new sb.UserEventHandler();
    UserHandler.onFriendsDiscovered = users => {
      console.log("Friends Discovered!", users);
    };
    sb.addUserEventHandler("UserHandler", UserHandler);

    // Connection Event Handler
    const ConnectionHandler = new sb.ConnectionHandler();
    ConnectionHandler.onReconnectStarted = this.onReconnectStarted;
    ConnectionHandler.onReconnectSucceeded = this.onReconnectSucceeded;
    sb.addConnectionHandler("ConnectionHandler", ConnectionHandler);
  }

  onTypingStatusUpdated = groupChannel => {
    const members = groupChannel.getTypingMembers();
    console.log(members, "typing...");
    // Refreshing User's Status
    groupChannel.refresh((channel, err) => {
      if (!err) {
        const chan = this.state.channel;
        if (chan.url === channel.url) {
          const user = channel.members.find(
            mem => mem.userId === this.state.user.userId
          );
          this.setState({
            channel,
            user,
            isTyping: members.length > 0
          });
          console.log("Typing Updated!", members.length > 0);
        }
      }
    });
  };

  onReconnectStarted = () => {
    console.log("Connecting to Chat Server!");
  };

  onReconnectSucceeded = () => {
    console.log("Successfully Connected to Chat Server!");
  };

  onUserJoined = (channel, user) => {
    console.log("USER JOINED: ", channel, user);
  };

  onUserLeft = (channel, user) => {
    console.log("USER Left: ", channel, user);
  };

  onChannelChanged = channel => {
    console.log("Channel Changed: ", channel);

    this.UpdateChannel(channel);
  };

  onReadReceiptUpdated = channel => {
    this.loadMessages(channel);
  };

  onMessageReceived = channel => {
    this.loadMessages(channel);
  };

  onDeleteMessageEvent = channel => {
    this.loadMessages(channel);
  };

  UpdateChannel = channel => {
    const chan = this.state.channel;
    if (channel.url === chan.url) {
      this.setState({
        channel: channel
      });
      this.loadMessages(channel);
    }
  };

  loadMessages = channel => {
    sb.GroupChannel.getChannel(channel.url, (gc, err) => {
      if (!err) {
        var prevMessageListQuery = gc.createPreviousMessageListQuery();
        prevMessageListQuery.limit = 50;
        prevMessageListQuery.reverse = true;
        prevMessageListQuery.load((messages, error) => {
          if (error) {
            console.log("Error while fetching old messages: ", error);
            return;
          }

          const msgs = messages.map(msg => {
            const messageStatus = channel.getReadReceipt(msg);
            const isText = msg.messageType === "user";
            const isImage =
              msg.messageType === "file" && msg.type.indexOf("image") > -1;
            const isDocument =
              msg.messageType === "file" &&
              msg.type.indexOf("application") > -1;
            return {
              _id: msg.messageId,
              text: isText ? (
                <Text
                  style={{
                    color:
                      msg.sender.userId === this.state.myuser.userId
                        ? "white"
                        : "black"
                  }}
                >
                  {msg.message}
                </Text>
              ) : isDocument ? (
                <Text
                  onPress={() => {
                    console.log("Open Link: ", msg.url);
                    Linking.openURL(msg.url);
                  }}
                  style={{
                    color:
                      msg.sender.userId === this.state.myuser.userId
                        ? "white"
                        : "grey",
                    textDecorationLine: "underline"
                  }}
                >
                  {msg.name}
                </Text>
              ) : (
                ""
              ),
              createdAt: msg.createdAt,
              user: {
                ...msg.sender,
                _id: msg.sender.userId,
                name: msg.sender.nickname,
                avatar: msg.sender.profileUrl
              },
              image: isImage ? msg.url : null,
              sent: messageStatus >= 0,
              received: messageStatus === 0,
              url: isDocument ? msg.url : null,
              val: msg.message,
              orgMsg: msg
            };
          });

          gc.markAsRead();

          this.setState({
            orgMessages: messages,
            // loading: false,
            messages: msgs
          });
        });
      } else {
        console.log("Error while getting channel: ", err);
      }
    });
  };

  renderChatEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          alignItems: "center",
          // alignContent: "center",
          justifyContent: "center",
          marginHorizontal: 10
        }}
      >
        <Title style={{}}>Conversation Not Started Yet!</Title>
        <Subheading style={{}}>
          Start the conversation by sending your first message to the expert.
        </Subheading>
      </View>
    );
  };

  onSend = (messages = []) => {
    const message = messages[0].text;
    const channel = this.state.channel;
    channel.endTyping();
    const params = new sb.UserMessageParams();
    params.message = message;
    params.pushNotificationDeliveryOption = "default";

    channel.sendUserMessage(params, (msg, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(msg);
        this.loadMessages(channel);
      }
    });
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages)
    // }));
  };

  onTypingMessage = text => {
    const channel = this.state.channel;
    if (text) {
      channel.startTyping();
    } else {
      channel.endTyping();
    }
  };

  renderFooter = () => {
    return null;
  };

  getPermissionAsync = async () => {
    if (Platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert(
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    }
  };

  TakePicture = async () => {
    this.ChatActions.close();

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [3, 3],
      quality: 0.4
    });

    console.log(result);

    if (!result.cancelled) {
      // console.log("Sending image....");
      const channel = this.state.channel;

      let name = result.uri.split("/");
      name = name[name.length - 1];

      let photo = {
        uri: result.uri,
        type: "image/jpeg",
        name: name
      };

      channel.sendFileMessage(photo, (fileMessage, error) => {
        if (error) {
          console.log(
            "Error while sending file message: ",
            error,
            error.response
          );
          return;
        }

        console.log(fileMessage);

        this.loadMessages(channel);
      });
    }
  };
  SelectImage = async () => {
    this.ChatActions.close();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      // console.log("Sending image....");
      const channel = this.state.channel;

      let name = result.uri.split("/");
      name = name[name.length - 1];

      let photo = {
        uri: result.uri,
        type: "image/jpeg",
        name: name
      };

      channel.sendFileMessage(photo, (fileMessage, error) => {
        if (error) {
          console.log(
            "Error while sending file message: ",
            error,
            error.response
          );
          return;
        }

        console.log(fileMessage);

        this.loadMessages(channel);
      });
    }
  };

  SelectDocuments = async () => {
    this.ChatActions.close();
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf"
    });

    console.log(result);

    if (result.type === "success") {
      // console.log("Sending image....");
      const channel = this.state.channel;

      let doc = {
        uri: result.uri,
        type: "application/pdf",
        name: result.name
      };

      channel.sendFileMessage(doc, (fileMessage, error) => {
        if (error) {
          console.log(
            "Error while sending file message: ",
            error,
            error.response
          );
          return;
        }

        console.log(fileMessage);

        this.loadMessages(channel);
      });
    }
  };

  renderActions = props => {
    return (
      <Actions {...props} onPressActionButton={() => this.ChatActions.open()} />
    );
  };

  renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: "white", display: "flex" }}
      />
    );
  };

  onPressUrl = (text, msg, asd) => {
    console.log("Pressed: ", text, msg, asd);
  };

  DeleteMessage = message => {
    const channel = this.state.channel;
    const msg = message.orgMsg;
    channel.deleteMessage(msg, (res, err) => {
      if (err) {
        console.log("Error while deleting message: ", err);
        return;
      } else {
        Alert.alert("Message Deleted Successfully!");
        console.log("Message Deleted!", res);
        this.loadMessages(channel);
      }
    });
  };

  onLongPress = (context, message) => {
    const canDeleteMessage = message.user.userId === this.state.myuser.userId;
    const text = message.val;
    const actionSheet = context.actionSheet;
    if (text) {
      if (canDeleteMessage) {
        const options = ["Copy Message", "Delete Message", "Cancel"];
        const cancelButtonIndex = options.length - 1;
        actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex
          },
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(text);
                break;
              case 1:
                this.DeleteMessage(message);
                break;
            }
          }
        );
      } else {
        const options = ["Copy Message", "Cancel"];
        const cancelButtonIndex = options.length - 1;
        actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex
          },
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(text);
                break;
            }
          }
        );
      }
    } else if (message.url) {
      if (canDeleteMessage) {
        const options = ["Copy Url to Clipboard", "Delete Message", "Cancel"];
        const cancelButtonIndex = options.length - 1;
        actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex
          },
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(message.url);
                break;
              case 1:
                this.DeleteMessage(message);
                break;
            }
          }
        );
      } else {
        const options = ["Copy Url to Clipboard", "Cancel"];
        const cancelButtonIndex = options.length - 1;
        actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex
          },
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(message.url);
                break;
            }
          }
        );
      }
    } else {
      if (canDeleteMessage) {
        const options = ["Delete Message", "Cancel"];
        const cancelButtonIndex = options.length - 1;
        actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex
          },
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                this.DeleteMessage(message);
                break;
            }
          }
        );
      }
    }
  };

  render() {
    const user = this.state.myuser;
    const sender = {
      ...user,
      _id: user.userId,
      name: user.nickname,
      avatar: user.profileUrl
    };
    return (
      <React.Fragment>
        <ChatTopBar
          {...this.props}
          title={this.state.title}
          user={this.state.user}
          isTyping={this.state.isTyping}
          onInfoButtonPressed={this.onInfoButtonPressed}
        />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={Platform.select({
            ios: () => 0,
            android: () => 25
          })()}
        >
          <GiftedChat
            isAnimated
            scrollToBottom
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={sender}
            isLoadingEarlier={this.state.loading}
            isTyping={this.state.isTyping}
            // renderChatFooter={this.renderFooter}
            onInputTextChanged={this.onTypingMessage}
            renderActions={this.renderActions}
            scrollToBottomStyle={{ backgroundColor: "grey", color: "white" }}
            renderInputToolbar={this.renderInputToolbar}
            onLongPress={this.onLongPress}
          />
        </KeyboardAvoidingView>
        <RBSheet
          ref={ref => {
            this.ChatActions = ref;
          }}
          height={250}
          closeOnDragDown={true}
        >
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Send Images or Documents</Text>
            <Divider />
            <TouchableOpacity
              style={styles.listButton}
              onPress={this.TakePicture}
            >
              <Ionicons name="ios-camera" size={30} style={styles.listIcon} />
              <Text style={styles.listLabel}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listButton}
              onPress={this.SelectImage}
            >
              <Ionicons name="ios-image" size={30} style={styles.listIcon} />
              <Text style={styles.listLabel}>Select Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listButton}
              onPress={this.SelectDocuments}
            >
              <FontAwesome name="paperclip" size={30} style={styles.listIcon} />
              <Text style={styles.listLabel}>Select Document</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    marginVertical: 10
  },
  title: {
    color: "#36382E"
  },
  subheadingBold: {
    fontWeight: "800",
    color: "#36382E"
  },
  heading: {},
  listContainer: {
    flex: 1,
    padding: 25
  },
  listTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666"
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },
  listIcon: {
    fontSize: 26,
    color: "#666",
    width: 60
  },
  listLabel: {
    fontSize: 16
  }
});

const SingleChatScreen = SingleChatComponent;

export default SingleChatScreen;
