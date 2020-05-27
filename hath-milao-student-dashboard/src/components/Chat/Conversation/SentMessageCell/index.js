import React from "react";
import { Avatar, Icon, Menu, Dropdown, Card } from "antd";
import moment from "moment";

const SentMessageCell = ({ conversation, chat, onDeleteMessage }) => {
  const sender = conversation._sender;

  const readReceipt = chat.channel.getReadReceipt(conversation);

  const messageType = conversation.messageType;

  const isImage =
    messageType === "file" ? conversation.type.indexOf("image") != -1 : false;

  const menu = (
    <Menu>
      <Menu.Item onClick={() => onDeleteMessage(conversation)}>
        Delete Message
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="gx-chat-item gx-flex-row-reverse">
      <Avatar
        className="gx-size-40 gx-align-self-end"
        src={sender.profileUrl}
        alt={sender.nickname}
      />

      <div className="gx-bubble-block">
        <div className="gx-bubble">
          {messageType === "user" && (
            <div className="gx-message">
              <span
                dangerouslySetInnerHTML={{
                  __html: conversation.message.replace(/\n/g, "<br />")
                }}
              ></span>
            </div>
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
            {moment(conversation.createdAt).format("h:mm a")} -{" "}
            {readReceipt > 0 ? "Delivered" : "Seen"}
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          verticalAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center"
        }}
      >
        <Dropdown overlay={menu}>
          <Icon
            type="info-circle"
            style={{ cursor: "pointer" }}
            theme="filled"
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default SentMessageCell;
