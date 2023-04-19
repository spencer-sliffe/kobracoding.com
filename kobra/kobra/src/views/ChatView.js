import React, { useState, useEffect, useRef } from "react";
import "./css/ChatView.css";
import { auth } from "../firebase.js";
import MessageRow from "./MessageRow"; // Create a MessageRow component

const ChatView = ({ viewModel }) => {
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    viewModel.fetchMessages();
    viewModel.markMessagesAsRead();
  }, [viewModel]);

  useEffect(() => {
    scrollToBottom();
  }, [viewModel.messages]);

  const sendMessage = () => {
    viewModel.sendMessage(chatInput);
    setChatInput("");
  };

  return (
    <div className="chat-view">
      <div className="messages-container">
        {viewModel.messages.map((message, index) => (
          <MessageRow
            key={index}
            message={message}
            isFromCurrentUser={message.sender === auth.currentUser?.email}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Message..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          disabled={chatInput.trim().length === 0}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatView;
