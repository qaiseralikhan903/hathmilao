import React from "react";

import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";
import moment from "moment";
import { Tag } from "antd";

const Conversation = ({
  conversationData,
  selectedUser,
  myuser,
  chat,
  onDeleteMessage
}) => {
  const DisplayedDates = [];
  return (
    <div className="gx-chat-main-content">
      {conversationData.map((message, index) => {
        {
          /* const date = moment("10/10/2019").format("D MMM, YYYY"); */
        }
        const date = moment(message.createdAt).calendar(null, {
          sameDay: "[Today]",
          nextDay: "[Tomorrow]",
          nextWeek: "dddd",
          lastDay: "[Yesterday]",
          lastWeek: "[Last] dddd",
          sameElse: "D MMM, YYYY"
        });

        const dates = DisplayedDates.slice();
        if (!DisplayedDates.includes(date)) {
          DisplayedDates.push(date);
        }
        return message._sender.userId === myuser.userId ? (
          <React.Fragment key={index}>
            {!dates.includes(date) && (
              <div style={{ textAlign: "center" }} className="messageDateTag">
                <Tag color="#108ee9">{date}</Tag>
              </div>
            )}
            <SentMessageCell
              key={index}
              conversation={message}
              chat={chat}
              onDeleteMessage={onDeleteMessage}
            />
          </React.Fragment>
        ) : (
          <React.Fragment key={index}>
            {!dates.includes(date) && (
              <div style={{ textAlign: "center" }} className="messageDateTag">
                <Tag color="#108ee9">{date}</Tag>
              </div>
            )}
            <ReceivedMessageCell
              key={index}
              conversation={message}
              user={selectedUser}
              chat={chat}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Conversation;
