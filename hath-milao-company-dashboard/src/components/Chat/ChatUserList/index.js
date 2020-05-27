import React from "react";
import UserCell from "./UserCell/index";

const ChatUserList = ({ chatUsers, selectedSectionId, onSelectUser }) => {
  return (
    <div className="gx-chat-user">
      {chatUsers.map((conversation, index) => (
        <UserCell
          key={index}
          chat={conversation}
          selectedSectionId={selectedSectionId}
          onSelectUser={onSelectUser}
        />
      ))}
    </div>
  );
};

export default ChatUserList;
