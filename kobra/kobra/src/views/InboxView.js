import React, { useState } from "react";
import { useInboxViewModel } from "../viewModels/InboxViewModel";
import { ChatView } from "./ChatView";
import { ChatCell } from "./ChatCell";
import { SearchBar } from "./SearchBar";
import { CircularProgress } from "@mui/material";

export function InboxView() {
  const {
    chats,
    isLoading,
    searchText,
    unreadMessageCounts,
    setSearchText,
  } = useInboxViewModel();
  const [showAddChat, setShowAddChat] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const sortedChats = chats.sort((chat1, chat2) => {
    const timestamp1 = chat1.lastMessage?.timestamp || new Date(0);
    const timestamp2 = chat2.lastMessage?.timestamp || new Date(0);
    return timestamp2 - timestamp1;
  });

  const filteredChats = sortedChats.filter((chat) =>
    searchText
      ? chat.otherParticipantEmail.includes(searchText.toLowerCase())
      : true
  );

  const handleAddChat = () => {
    // Add chat logic here
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : filteredChats.length === 0 ? (
        <p>No Chats Currently</p>
      ) : (
        <div>
          <SearchBar value={searchText} onChange={setSearchText} />
          <div>
            {filteredChats.map((chat) => (
              <ChatCell
                key={chat.id}
                chat={chat}
                unreadMessageCount={unreadMessageCounts[chat.id] || 0}
              />
            ))}
          </div>
        </div>
      )}
      <button onClick={() => setShowAddChat(!showAddChat)}>Add Chat</button>
      {showAddChat && (
        <div>
          <input
            type="text"
            placeholder="Enter user email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button onClick={handleAddChat}>Add Chat</button>
        </div>
      )}
    </div>
  );
}
