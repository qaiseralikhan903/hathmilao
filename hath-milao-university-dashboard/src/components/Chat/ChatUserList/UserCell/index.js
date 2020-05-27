import React from "react";
import { Avatar, Badge } from "antd";
import moment from "moment";

const UserCell = ({ chat, selectedSectionId, onSelectUser }) => {
  const channel = chat.channel;
  const user = chat.user;
  const lastMessage = channel.lastMessage;
  if (!lastMessage) {
    window.location.reload();
  }
  const messageType = lastMessage.messageType;
  const date = moment(lastMessage.createdAt).calendar(null, {
    sameDay: "LT",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "[Last] dddd",
    sameElse: "D MMM, YYYY"
  });
  return (
    <div
      className={`gx-chat-user-item ${
        selectedSectionId == channel.url ? "active" : ""
      }`}
      onClick={() => {
        onSelectUser(chat);
      }}
    >
      <div className="gx-chat-user-row">
        <div className="gx-chat-avatar">
          <div className="gx-status-pos">
            <Avatar
              src={user.profileUrl}
              className="gx-size-40"
              alt={user.nickname}
            />
            {/* <span className={`gx-status gx-small gx-${chat.status}`} /> */}
          </div>
        </div>

        <div className="gx-chat-info">
          <span className="gx-name h4">{user.nickname}</span>
          <div
            className="gx-chat-info-des gx-text-truncate"
            style={{ color: chat.typing ? "green" : "grey" }}
          >
            <span>
              {chat.typing
                ? "typing..."
                : lastMessage
                ? messageType === "user"
                  ? lastMessage.message.substring(0, 25) + "..."
                  : ("File: " + lastMessage.name).substring(0, 25) + "..."
                : ""}
            </span>
            {!chat.typing && <p style={{ color: "black" }}>{date}</p>}
          </div>
          <div className="gx-last-message-time">
            {chat.lastMessageTime ? chat.lastMessageTime : ""}
          </div>
        </div>

        {channel.unreadMessageCount > 0 ? (
          <div className="gx-chat-date">
            <div className="gx-bg-primary gx-rounded-circle gx-badge gx-text-white">
              <Badge
                count={channel.unreadMessageCount}
                style={{ backgroundColor: "#52c41a" }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserCell;
