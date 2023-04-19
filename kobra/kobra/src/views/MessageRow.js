import React from "react";
import "./css/MessageRow.css";

const MessageRow = ({ message, isFromCurrentUser }) => {
  return (
    <div
      className={`message-row ${
        isFromCurrentUser ? "current-user" : "other-user"
      }`}
    >
      <div className="message-content">{message.text}</div>
    </div>
  );
};

export default MessageRow;
