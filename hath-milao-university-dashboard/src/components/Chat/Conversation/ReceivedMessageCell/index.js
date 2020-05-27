import React from "react";
import { Avatar, Card, Icon } from "antd";
import moment from "moment";

const ReceivedMessageCell = ({ conversation, user }) => {
  const sender = conversation._sender;
  const messageType = conversation.messageType;

  const isImage =
    messageType === "file" ? conversation.type.indexOf("image") != -1 : false;

  return (
    <div className="gx-chat-item">
      <Avatar
        className="gx-size-40 gx-align-self-end"
        src={sender.profileUrl}
        alt={sender.nickname}
      />

      <div className="gx-bubble-block">
        <div className="gx-bubble">
          {messageType === "user" && (
            <div className="gx-message">{conversation.message}</div>
          )}
          {messageType === "file" && isImage && (
            <Card
              style={{ width: 300 }}
              cover={<img alt={conversation.name} src={conversation.url} />}
              actions={[
                <Icon
                  type="download"
                  key="download"
                  onClick={() => window.open(conversation.url, "_blank")}
                />
              ]}
            />
          )}
          {messageType === "file" && !isImage && (
            <Card
              actions={[
                <Icon
                  type="download"
                  key="download"
                  onClick={() => window.open(conversation.url, "_blank")}
                />
              ]}
              style={{ width: 300 }}
            >
              <Card.Meta
                avatar={<Icon type="file" />}
                title={conversation.name}
              />
            </Card>
          )}
          <div className="gx-time gx-text-muted gx-text-right gx-mt-2">
            {moment(conversation.createdAt).format("h:mm a")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessageCell;
