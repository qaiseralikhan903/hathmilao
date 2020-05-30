/* eslint-disable react/jsx-fragments */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-else-return */
/* eslint-disable import/order */
import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  View,
  ScrollView
} from "react-native";
import { List, Layout } from "react-native-ui-kitten";
import { AntDesign } from "@expo/vector-icons";

import { List as L, Caption, Divider, Title, Badge } from "react-native-paper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { sb } from "../../services/chat.init";
import { getCurrentUser } from "../../services/auth.service";
import moment from "moment";
import "moment/min/locales";
import MyHeader from "../src/header";
import NotificationPopup from "react-native-push-notification-popup";

const initialLayout = { width: Dimensions.get("window").width };

const { height } = Dimensions.get("screen");

class ConversationScreen extends React.Component {
  state = {
    selectedIndex: 0,
    loading: true,
    myuser: null,
    channels: [],
    User: null
  };

  async componentDidMount() {
    const u = await getCurrentUser();
    const User = u.user;
    console.log("User: ", User);
    const uid = User.id;

    const { navigation } = this.props;

    this.focusListener = navigation.addListener("didFocus", () => {
      console.log("Got Focus Back!");
      this.setState({
        loading: true
      });
      this.FetchChannels();

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
    });

    sb.connect(uid, (user, err) => {
      if (!err) {
        // Fetching Conversations & Contacts
        this.setState({
          myuser: user,
          User
        });
        this.FetchChannels();
      }
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
    sb.removeAllChannelHandlers();
    sb.removeAllConnectionHandlers();
    sb.removeAllUserEventHandler();
  }

  onTypingStatusUpdated = groupChannel => {
    const members = groupChannel.getTypingMembers();
    console.log(members, "typing...");
    const channelID = groupChannel.url;
    const channels = this.state.channels;

    // Refreshing User's Status
    groupChannel.refresh((channel, err) => {
      if (!err) {
        const updatedChannels = channels.map(chan => {
          if (chan.channel.url === channelID) {
            const user = channel.members.find(
              mem => mem.userId === chan.user.userId
            );
            chan.typing = members.length > 0;
            chan.user = user;
          }
          return chan;
        });
        this.setState({
          channels: updatedChannels
        });
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
    this.UpdateChannel(channel);
  };

  onMessageReceived = channel => {
    this.UpdateChannel(channel);
  };

  onDeleteMessageEvent = channel => {
    this.UpdateChannel(channel);
  };

  UpdateChannel = channel => {
    const channels = this.state.channels;
    const updatedChannels = channels.map(chan => {
      if (channel.url === chan.channel.url) {
        chan.channel = channel;
      }
      return chan;
    });

    this.setState({
      channels: updatedChannels
    });
  };

  RefreshList = () => {
    this.setState({
      loading: true
    });
    this.FetchChannels();
  };

  FetchChannels = () => {
    const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    channelListQuery.includeEmpty = true;
    channelListQuery.order = "latest_last_message"; // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
    if (channelListQuery.hasNext) {
      channelListQuery.next((channelList, error) => {
        if (error) {
          console.log("Error while fetching channels: ", error);
          return;
        }

        const channels = [];
        channelList.forEach(channel => {
          if (channel.memberCount === 2) {
            const user = channel.members.find(
              mem => mem.userId != this.state.User.id
            );
            channels.push({
              channel,
              user,
              isConversationStarted: channel.lastMessage !== null,
              typing: false
            });
          }
        });

        this.setState({
          channels,
          loading: false
        });
      });
    }
  };

  renderRightBar = () => <Caption>14:30 PM</Caption>;

  renderItemIcon = () => (
    <Image
      style={{
        marginVertical: 10,
        borderRadius: 40 / 2,
        overflow: "hidden",
        borderWidth: 3
      }}
      source={{
        uri: require("../../assets/icon.png"),
        width: 40,
        height: 40
      }}
    />
  );

  OpenConversation = item => {
    const { navigate } = this.props.navigation;
    navigate("SingleChat", {
      item,
      myuser: this.state.myuser
    });
  };

  renderConversationItem = ({ item }) => {
    const channel = item.channel;
    const user = item.user;
    const lastMessage = channel.lastMessage;
    const isTyping = item.typing;
    const unreadMessagesCount = channel.unreadMessageCount;
    const message =
      lastMessage.messageType === "user"
        ? lastMessage.message.substring(0, 17) + "..."
        : `File: ${lastMessage.name.substring(0, 17) + "..."}`;
    const time = moment(lastMessage.createdAt).calendar(null, {
      sameDay: "LT",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "D MMM, YYYY"
    });
    return (
      <TouchableOpacity onPress={() => this.OpenConversation(item)}>
        <L.Item
          title={`${user.nickname}`}
          description={isTyping ? "typing..." : `${message.replace(/\n/g, "")}`}
          left={() => (
            <Image
              style={{
                marginVertical: 10,
                borderRadius: 40 / 2,
                overflow: "hidden",
                borderWidth: 3,
                width: 40,
                height: 40
              }}
              source={require("../../assets/icon.png")}
            />
          )}
          right={() => (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Caption style={{}}>{time}</Caption>
              {unreadMessagesCount > 0 && (
                <Badge
                  style={{
                    alignSelf: "center",
                    backgroundColor: "green",
                    color: "white"
                  }}
                >
                  {unreadMessagesCount}
                </Badge>
              )}
            </View>
          )}
          style={{ backgroundColor: "white", marginBottom: 1 }}
          titleStyle={{}}
          descriptionStyle={{
            color: isTyping ? "green" : "grey"
          }}
        />
        <Divider />
      </TouchableOpacity>
    );
  };

  renderContactsItem = ({ item }) => {
    const user = item.user;
    const lastSeenAt = user.lastSeenAt;
    console.log("User Last Seen: ", lastSeenAt, user.isActive);
    return (
      <TouchableOpacity onPress={() => this.OpenConversation(item)}>
        <L.Item
          title={`${user.nickname}`}
          description={
            user.isActive && lastSeenAt === 0
              ? "online"
              : "Active " + moment(lastSeenAt).fromNow()
          }
          left={() => (
            <Image
              style={{
                marginVertical: 10,
                borderRadius: 40 / 2,
                overflow: "hidden",
                borderWidth: 3
              }}
              source={{
                uri: `${user.profileUrl}`,
                width: 40,
                height: 40
              }}
            />
          )}
          // right={() => <Caption>{time}</Caption>}
          style={{ backgroundColor: "white", marginBottom: 1 }}
          titleStyle={{}}
          descriptionStyle={{
            color: user.isActive ? "green" : "grey"
          }}
        />
        <Divider />
      </TouchableOpacity>
    );
  };

  onTabSelect = index => {
    this.setState({
      selectedIndex: index
    });
  };

  renderConversations = () => {
    if (this.state.loading) {
      return (
        <Layout style={styles.tabContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: height
            }}
          >
            <Title style={{}}>{"Loading Conversations..."}</Title>
          </View>
        </Layout>
      );
    } else {
      const channels = this.state.channels;
      const conversations = channels.filter(
        channel => channel.isConversationStarted
      );
      if (conversations.length > 0) {
        return (
          <Layout style={styles.tabContainer}>
            <List
              data={conversations}
              renderItem={this.renderConversationItem}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.loading}
                  onRefresh={this.RefreshList}
                />
              }
            />
          </Layout>
        );
      } else {
        return (
          <Layout style={styles.tabContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: height
              }}
            >
              <Title style={{}}>{"No Conversations Found"}</Title>
            </View>
          </Layout>
        );
      }
    }
  };

  renderContacts = () => {
    if (this.state.loading) {
      return (
        <Layout style={styles.tabContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: height
            }}
          >
            <Title style={{}}>{"Loading Contacts..."}</Title>
          </View>
        </Layout>
      );
    } else {
      const channels = this.state.channels;
      if (channels.length > 0) {
        return (
          <Layout style={styles.tabContainer}>
            <List
              data={channels}
              renderItem={this.renderContactsItem}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.loading}
                  onRefresh={this.RefreshList}
                />
              }
            />
          </Layout>
        );
      } else {
        return (
          <Layout style={styles.tabContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: height
              }}
            >
              <Title style={{}}>{"No Contacts Found!"}</Title>
            </View>
          </Layout>
        );
      }
    }
  };

  renderScene = SceneMap({
    conversations: this.renderConversations,
    contacts: this.renderContacts
  });

  render() {
    const routes = [
      {
        key: "conversations",
        title: "Conversations"
      },
      {
        key: "contacts",
        title: "Contacts"
      }
    ];
    const index = this.state.selectedIndex;
    return (
      <React.Fragment>
        {/* <TopNavigationBar {...this.props} title={this.state.title} /> */}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.RefreshList}
            />
          }
        >
          <MyHeader heading="Messages" navigation={this.props.navigation} />
          <TabView
            navigationState={{ index, routes }}
            renderScene={this.renderScene}
            onIndexChange={this.onTabSelect}
            initialLayout={initialLayout}
            style={{ height: height }}
            renderTabBar={props => (
              <TabBar
                {...props}
                activeColor="blue"
                style={{ backgroundColor: null }}
                inactiveColor="black"
                renderIcon={scene => {
                  const key = scene.route.key;
                  return key === "conversations" ? (
                    <AntDesign
                      name="message1"
                      size={20}
                      style={{
                        color: scene.focused ? "blue" : "black"
                      }}
                    />
                  ) : (
                    <AntDesign
                      name="contacts"
                      size={20}
                      style={{
                        color: scene.focused ? "blue" : "black"
                      }}
                    />
                  );
                }}
                labelStyle={{ fontSize: 14 }}
                indicatorStyle={{ backgroundColor: "blue" }}
              />
            )}
          />
        </ScrollView>
        <NotificationPopup ref={ref => (this.popup = ref)} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    minHeight: 64
  },
  title: {},
  content: {}
});

export default ConversationScreen;
