import React from "react";
import { Avatar } from "antd";
import moment from "moment";

const UserCell = ({ onSelectUser, selectedSectionId, channel }) => {
  const contact = channel.user;
  const isTyping = channel.typing;
  return (
    <div
      className={`gx-chat-user-item ${
        selectedSectionId === channel.channel.id ? "active" : ""
      }`}
      onClick={() => {
        onSelectUser(channel);
      }}
    >
      <div className="gx-chat-user-row">
        <div className="gx-chat-avatar">
          <div className="gx-status-pos">
            <Avatar
              src={contact.profileUrl}
              className="gx-size-40"
              alt={contact.nickname}
            />
            <span className={`gx-status ${contact.connectionStatus}`} />
          </div>
        </div>

        <div className="gx-chat-contact-col">
          <div className="h4 gx-name">
            {contact.nickname}{" "}
            <div
              style={{
                color:
                  contact.connectionStatus === "online" || isTyping
                    ? "green"
                    : "grey",
                fontSize: 12
              }}
            >
              {isTyping
                ? "typing..."
                : contact.connectionStatus === "online" && contact.lastSeenAt === 0
                ? contact.connectionStatus
                : "Active " + moment(contact.lastSeenAt).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCell;
