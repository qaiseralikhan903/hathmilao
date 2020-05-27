import React from "react";

import "./style.css";
import {
  Drawer,
  Avatar,
  Input,
  Tabs,
  Button,
  Spin,
  Result,
  message,
  Icon,
  Popover
} from "antd";

import users from "./data/chatUsers";
import conversationList from "./data/conversationList";
import Conversation from "./Conversation";
import ChatUserList from "./ChatUserList";
import ContactList from "./ContactList/index";
import moment from "moment";

import CustomScrollbars from "./CustomScrollbars";

import { sb } from "../../util/chat.init";
import { getCurrentUser } from "../../services/auth.service";
import Scrollbars from "react-custom-scrollbars";

const TabPane = Tabs.TabPane;

class MyChat extends React.Component {
  constructor() {
    super();
    this.state = {
      loader: false,
      userNotFound: "No user found",
      drawerState: false,
      selectedSectionId: "",
      selectedTabIndex: 1,
      userState: 1,
      searchChatUser: "",
      contactList: [],
      selectedUser: null,
      message: "",
      conversation: null,
      myuser: null,
      User: null,
      channels: [],
      selectedConversation: null,
      conversations: [],
      // Handling Selected Conversation Data
      selectedConversationMessages: [],
      selectedConversationUser: {}
    };

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

  componentDidMount() {
    const u = getCurrentUser().user;
    sb.connect(u.id, (user, err) => {
      if (err) {
        console.log(err);
        return;
      }
      this.LoadChannels();
      this.setState({
        myuser: user,
        User: u
      });
    });
  }

  componentWillUnmount() {
    sb.removeAllChannelHandlers();
    sb.removeAllUserEventHandler();
    sb.removeAllConnectionHandlers();
  }

  onTypingStatusUpdated = groupChannel => {
    const members = groupChannel.getTypingMembers();
    console.log(members, "typing...");
    const channelID = groupChannel.url;
    const channels = this.state.channels;

    // Refreshing User's Status
    groupChannel.refresh((channel, err) => {
      if (!err) {
        let u = null;
        const conversation = this.state.conversation;
        const updatedChannels = channels.map(chan => {
          if (chan.channel.url === channelID) {
            const user = channel.members.find(
              mem => mem.userId === chan.user.userId
            );
            chan.typing = members.length > 0;
            chan.user = user;
            if (conversation && conversation.channel.url === channelID) {
              u = user;
            }
          }
          return chan;
        });
        if (conversation) {
          conversation.typing = members.length > 0;
          this.setState({
            channels: updatedChannels,
            conversation,
            selectedConversationUser: u
              ? u
              : this.state.selectedConversationUser
          });
        } else {
          this.setState({
            channels: updatedChannels
          });
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

    if (this.ConversationScrollBar) {
      this.ConversationScrollBar.scrollToBottom();
    }
  };

  onReadReceiptUpdated = channel => {
    this.UpdateChannel(channel);
  };

  onMessageReceived = channel => {
    this.FetchNewMessages(channel);

    if (this.ConversationScrollBar) {
      this.ConversationScrollBar.scrollToBottom();
    }
  };

  onDeleteMessageEvent = channel => {
    this.FetchNewMessages(channel);

    if (this.ConversationScrollBar) {
      this.ConversationScrollBar.scrollToBottom();
    }
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

  FetchNewMessages = channel => {
    const conversation = this.state.conversation;
    if (conversation && conversation.channel.url === channel.url) {
      channel.markAsRead();
      let prevMessageListQuery = channel.createPreviousMessageListQuery();
      const LIMIT = 30;
      const isReverse = false;
      if (prevMessageListQuery.hasMore) {
        prevMessageListQuery.load(LIMIT, isReverse, (messages, error) => {
          if (error) {
            console.log("Error while fetching conversations: ", error);
            return;
          } else {
            const conversation = this.state.conversation;
            const newConversation = conversation;
            newConversation.messages = messages;
            newConversation.channel = channel;
            this.setState({
              conversation: newConversation
            });

            if (this.ConversationScrollBar) {
              this.ConversationScrollBar.scrollToBottom();
            }
          }
        });
      }
    }
  };

  LoadChannels = () => {
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
          channels
        });
      });
    }
  };

  FetchConversationDetails = selectedContact => {
    console.log("Selected Conversation: ", selectedContact);
    this.setState({ loader: true });
    sb.GroupChannel.getChannel(selectedContact.channel.url, (channel, err) => {
      if (err) {
        console.log(err);
      } else {
        channel.markAsRead();
        let prevMessageListQuery = channel.createPreviousMessageListQuery();
        const LIMIT = 30;
        const isReverse = false;
        const user = channel.members.find(
          mem => mem.userId === selectedContact.user.userId
        );
        if (prevMessageListQuery.hasMore) {
          prevMessageListQuery.load(LIMIT, isReverse, (messages, error) => {
            if (error) {
              console.log("Error while fetching conversations: ", error);
              return;
            } else {
              console.log("Messages: ", messages);
              const conversation = {
                channel,
                user,
                lastMessage: channel.lastMessage,
                unreadMessages: channel.unreadMessageCount,
                typing: false,
                messages
              };

              this.setState({
                selectedConversationMessages: messages,
                selectedConversationUser: user || {},
                loader: false,
                conversation
              });
              if (this.ConversationScrollBar) {
                this.ConversationScrollBar.scrollToBottom();
              }
            }
          });
        }
      }
    });
  };

  CreateConversation = userid => {
    // const current_userid = this.state.myuser.userid;
    const other_userid = "5e15cee49da7143e38c31906";

    const isOneToOne = true;

    sb.GroupChannel.createChannelWithUserIds(
      [userid, other_userid],
      isOneToOne,
      (conversation, error) => {
        if (!error) {
          console.log(conversation);
        } else {
          console.log(error);
        }
      }
    );
  };

  handleOnImageUpload = () => {
    this.imageUploaderRef.click();
  };

  handleOnFileUpload = () => {
    this.fileUploaderRef.click();
  };

  Communication = () => {
    const { conversation } = this.state;
    const isTyping = conversation.typing;
    const user = this.state.selectedConversationUser;
    const { messages } = conversation;
    return (
      <div className="gx-chat-main">
        <div className="gx-chat-main-header">
          <span className="gx-d-block gx-d-lg-none gx-chat-btn">
            <i
              className="gx-icon-btn icon icon-chat"
              onClick={this.onToggleDrawer}
            />
          </span>
          <div className="gx-chat-main-header-info">
            <div className="gx-chat-avatar gx-mr-2">
              <div className="gx-status-pos">
                <Avatar
                  src={user.profileUrl}
                  className="gx-rounded-circle gx-size-60"
                  alt=""
                />
              </div>
            </div>

            <div className="gx-chat-contact-name">
              {user.nickname}
              <div
                style={{
                  color:
                    user.connectionStatus === "online" || isTyping
                      ? "green"
                      : "grey",
                  fontSize: 12
                }}
              >
                {isTyping
                  ? "typing..."
                  : user.connectionStatus === "online" && user.lastSeenAt === 0
                  ? user.connectionStatus
                  : "Active " + moment(user.lastSeenAt).fromNow()}
              </div>
            </div>
          </div>
        </div>

        <Scrollbars
          ref={e => (this.ConversationScrollBar = e)}
          className="gx-chat-list-scroll"
          autoHide
          renderTrackHorizontal={props => (
            <div
              {...props}
              style={{ display: "none" }}
              className="track-horizontal"
            />
          )}
        >
          {messages && messages.length > 0 ? (
            <Conversation
              conversationData={messages}
              selectedUser={this.state.selectedConversationUser}
              myuser={this.state.myuser}
              chat={this.state.conversation}
              onDeleteMessage={this.onDeleteMessage}
            />
          ) : (
            <Result
              status="404"
              title="No Messages Yet!"
              subTitle="Start the conversation by sending a message."
              // extra={<Button type="primary">Back Home</Button>}
            />
          )}
        </Scrollbars>
        <div className="gx-chat-main-footer">
          <div
            className="gx-flex-row gx-align-items-center"
            style={{ maxHeight: 90 }}
          >
            <div className="gx-col">
              <div className="gx-form-group">
                <Input.TextArea
                  onKeyUp={this._handleKeyPress}
                  onChange={this.updateMessageValue}
                  value={this.state.message}
                  placeholder="Type and hit enter to send message"
                ></Input.TextArea>
                <div className="row">
                  <div className="col text-left">
                    <input
                      type="file"
                      ref={e => (this.imageUploaderRef = e)}
                      style={{ display: "none" }}
                      onChange={this.SendImageMessage}
                      accept="image/*"
                    />
                    <input
                      type="file"
                      ref={e => (this.fileUploaderRef = e)}
                      style={{ display: "none" }}
                      onChange={this.SendAttachmentMessage}
                      accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                    <Popover content="Send Image">
                      <Icon
                        type="file-image"
                        theme="twoTone"
                        style={{ cursor: "pointer" }}
                        onClick={this.handleOnImageUpload}
                      />
                    </Popover>
                    <Popover content="Send Documents">
                      <Icon
                        type="paper-clip"
                        // theme="twoTone"
                        style={{ cursor: "pointer" }}
                        onClick={this.handleOnFileUpload}
                      />
                    </Popover>
                  </div>
                  <div className="col text-right">
                    <Button
                      style={{
                        textAlign: "right",
                        marginTop: 5,
                        marginBottom: 5
                      }}
                      type="primary"
                      disabled={this.state.message === ""}
                      onClick={this.SendTextMessage}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <i
              className="gx-icon-btn icon icon-sent"
              onClick={this.SendTextMessage}
            />
          </div>
        </div>
      </div>
    );
  };

  ChatUsers = () => {
    const channels = this.state.channels;
    const conversations = channels.filter(
      channel => channel.isConversationStarted
    );

    return (
      <div className="gx-chat-sidenav-main">
        <div className="gx-chat-sidenav-header">
          <div className="gx-chat-user-hd">
            <div className="gx-chat-avatar gx-mr-3">
              <div className="gx-status-pos">
                <Avatar
                  id="avatar-button"
                  src={this.state.myuser.profileUrl}
                  className="gx-size-50"
                  alt=""
                />
                <span className="gx-status gx-online" />
              </div>
            </div>

            <div className="gx-module-user-info gx-flex-column gx-justify-content-center">
              <div className="gx-module-title">
                <h5 className="gx-mb-0">{this.state.myuser.nickname}</h5>
              </div>
              <div className="gx-module-user-detail">
                <span className="gx-text-grey gx-link">
                  {this.state.User.email}
                </span>
              </div>
            </div>
          </div>

          <div className="gx-chat-search-wrapper">
            {/* <Input.Search
              placeholder="Search or start new chat"
              onChange={this.updateSearchChatUser}
              value={this.state.searchChatUser}
            /> */}
          </div>
        </div>

        <div className="gx-chat-sidenav-content">
          {/*<AppBar position="static" className="no-shadow chat-tabs-header">*/}
          <Tabs
            className="gx-tabs-half"
            defaultActiveKey="1"
            style={{ textAlign: "center" }}
          >
            <TabPane label={"Conversations"} tab={"Conversations"} key="1">
              <CustomScrollbars
                className="gx-chat-sidenav-scroll-tab-1"
                style={{ textAlign: "left" }}
              >
                {conversations.length === 0 ? (
                  <div className="gx-p-5 text-center">
                    No Conversations Found
                  </div>
                ) : (
                  <ChatUserList
                    chatUsers={conversations}
                    selectedSectionId={this.state.selectedSectionId}
                    onSelectUser={this.FetchConversationDetails}
                  />
                )}
              </CustomScrollbars>
            </TabPane>
            <TabPane label={"Contacts"} tab={"Contacts"} key="2">
              <CustomScrollbars
                className="gx-chat-sidenav-scroll-tab-2"
                style={{ textAlign: "left" }}
              >
                {channels.length === 0 ? (
                  <div className="gx-p-5 text-center">No Contacts Yet!</div>
                ) : (
                  <ContactList
                    contactList={channels}
                    selectedSectionId={this.state.selectedSectionId}
                    onSelectUser={this.FetchConversationDetails}
                  />
                )}
              </CustomScrollbars>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      let message = this.state.message;
      message = message.replace(/\r$/, "");
      this.setState({ message });
      this.SendTextMessage();
    }
  };

  handleChange = (event, value) => {
    this.setState({ selectedTabIndex: value });
  };

  handleChangeIndex = index => {
    this.setState({ selectedTabIndex: index });
  };

  showCommunication = () => {
    return (
      <div className="gx-chat-box">
        {this.state.conversation === null ? (
          <div className="gx-comment-box">
            <div className="gx-fs-80">
              <i className="icon icon-chat gx-text-muted" />
            </div>
            <h1 className="gx-text-muted">{"Select User Chat"}</h1>
            <Button
              className="gx-d-block gx-d-lg-none"
              type="primary"
              onClick={this.onToggleDrawer}
            >
              {"Select Contact Chat"}
            </Button>
          </div>
        ) : (
          this.Communication()
        )}
      </div>
    );
  };

  filterContact = userName => {
    if (userName === "") {
      return users.filter(user => !user.recent);
    }
    return users.filter(
      user =>
        !user.recent &&
        user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1
    );
  };

  filterUsers = userName => {
    if (userName === "") {
      return users.filter(user => user.recent);
    }
    return users.filter(
      user =>
        user.recent &&
        user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1
    );
  };

  UpdateConversationMessages = msg => {
    const conversation = this.state.conversation;
    const newConversation = conversation;
    newConversation.messages.push(msg);
    this.setState({
      conversation: newConversation
    });
    if (this.ConversationScrollBar) {
      this.ConversationScrollBar.scrollToBottom();
    }
  };

  onDeleteMessage = msg => {
    console.log(msg);
    const channel = this.state.conversation.channel;
    channel.deleteMessage(msg, (res, err) => {
      if (err) {
        console.log("Error while deleting message: ", err);
        return;
      } else {
        message.info("Message Deleted Successfully!");
        console.log("Message Deleted!", res);
        this.FetchNewMessages(channel);
      }
    });
  };

  SendImageMessage = event => {
    event.stopPropagation();
    event.preventDefault();
    const image = event.target.files[0];
    if (image) {
      const channel = this.state.conversation.channel;
      const params = new sb.FileMessageParams();
      params.file = image;
      params.fileName = image.name;
      params.fileSize = image.size;
      params.thumbnailSizes = [
        { maxWidth: 100, maxHeight: 100 },
        { maxWidth: 200, maxHeight: 200 }
      ];
      params.mimeType = image.type;
      params.pushNotificationDeliveryOption = "default";

      channel.sendFileMessage(params, (fileMessage, error) => {
        if (error) {
          console.log("Error while sending file message: ", error);
          return;
        }

        console.log(fileMessage);

        this.UpdateConversationMessages(fileMessage);
      });
    }
  };

  SendAttachmentMessage = event => {
    event.stopPropagation();
    event.preventDefault();
    const doc = event.target.files[0];
    if (doc) {
      const ext = doc.name.split(".").pop();
      console.log("Extension: ", ext, ext === "pdf");
      if (ext === "pdf" || ext === "docx" || ext === "doc") {
        const channel = this.state.conversation.channel;
        const params = new sb.FileMessageParams();
        params.file = doc;
        params.fileName = doc.name;
        params.fileSize = doc.size;
        params.mimeType = doc.type;
        params.pushNotificationDeliveryOption = "default";

        channel.sendFileMessage(params, (fileMessage, error) => {
          if (error) {
            console.log("Error while sending file message: ", error);
            return;
          }

          console.log(fileMessage);

          this.UpdateConversationMessages(fileMessage);
        });
      } else {
        message.error("Invalid Document Selected!");
      }
    }
  };

  SendTextMessage = () => {
    const message = this.state.message;
    if (message !== "") {
      this.setState({
        message: ""
      });

      const channel = this.state.conversation.channel;
      channel.endTyping();
      const params = new sb.UserMessageParams();
      params.message = message;
      params.translationTargetLanguages = ["ur"];
      params.pushNotificationDeliveryOption = "default";

      channel.sendUserMessage(params, (msg, error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(msg);
          const myuser = this.state.myuser;
          this.UpdateConversationMessages(msg);
          // const user = this.state.selectedConversationUser;
          // SendNotificationToFarmer(user.userId, {
          //   title: myuser.nickname + " sent new message!",
          //   subtitle: myuser.nickname + " sent new message!",
          //   body: message
          // });
        }
      });
    }
  };

  updateMessageValue = evt => {
    const val = evt.target.value;
    this.setState({
      message: val
    });
    const channel = this.state.conversation.channel;
    if (val) {
      channel.startTyping();
    } else {
      channel.endTyping();
    }
  };

  updateSearchChatUser = evt => {
    this.setState({
      searchChatUser: evt.target.value,
      contacts: this.filterContact(evt.target.value),
      chatUsers: this.filterUsers(evt.target.value)
    });
  };

  onToggleDrawer = () => {
    this.setState({
      drawerState: !this.state.drawerState
    });
  };

  render() {
    const { loader, userState, drawerState } = this.state;
    return (
      <React.Fragment>
        {this.state.myuser ? (
          <div className="gx-main-content">
            <div className="gx-app-module gx-chat-module">
              <div className="gx-chat-module-box">
                <div className="gx-d-block gx-d-lg-none">
                  <Drawer
                    placement="left"
                    closable={false}
                    visible={drawerState}
                    onClose={this.onToggleDrawer}
                    style={{ margin: 0, padding: 0 }}
                    width={"40%"}
                    className={"chat-drawer"}
                  >
                    {this.ChatUsers()}
                  </Drawer>
                </div>
                <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
                  {this.ChatUsers()}
                </div>
                {loader ? (
                  <div
                    className="gx-comment-box"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      justifyItems: "center",
                      textAlign: "center"
                    }}
                  >
                    <Spin size="large" tip="Loading Conversation..." />
                  </div>
                ) : (
                  this.showCommunication()
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              paddingTop: "20px",
              paddingBottom: "20px"
            }}
          >
            <Spin tip="Loading Chat..." size="large" />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default MyChat;
