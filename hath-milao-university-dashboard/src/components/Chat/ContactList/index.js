import React from "react";
import UserCell from "./UserCell/index";

const ContactList = ({ onSelectUser, selectedSectionId, contactList }) => {
  return (
    <div className="gx-chat-user">
      {contactList.map((channel, index) => (
        <UserCell
          key={index}
          channel={channel}
          selectedSectionId={selectedSectionId}
          onSelectUser={onSelectUser}
        />
      ))}
    </div>
  );
};

export default ContactList;
