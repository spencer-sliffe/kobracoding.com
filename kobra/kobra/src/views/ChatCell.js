import React from "react";

export function ChatCell({ chat, unreadMessageCount }) {
  const displayName = chat.otherParticipantEmail.split("@")[0].toUpperCase();

  const lastMessageDisplay = chat.lastMessage
    ? `${chat.lastMessage.sender
        .split("@")[0]
        .toUpperCase()}: ${chat.lastMessage.text}`
    : "";

  return (
    <div>
      <h4>{displayName}</h4>
      <p>{lastMessageDisplay}</p>
      {unreadMessageCount > 0 && <div>{unreadMessageCount}</div>}
    </div>
  );
}
