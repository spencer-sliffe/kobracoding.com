import { useState, useEffect } from "react";
import { FireStoreManager } from "../firebase/FireStoreManager";
import { getAuth } from "firebase/auth";

export function useInboxViewModel() {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [unreadMessageCounts, setUnreadMessageCounts] = useState({});
  const firestoreManager = new FirestoreManager();
  const auth = getAuth();
  const currentUserEmail = auth.currentUser?.email || "";

  const fetchChats = async () => {
    setIsLoading(true);
    try {
      const fetchedChats = await firestoreManager.observeChats(currentUserEmail);
      setChats(fetchedChats);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const observeUnreadMessageCounts = async (chats) => {
    try {
      const counts = await firestoreManager.observeUnreadMessageCounts(chats, currentUserEmail);
      setUnreadMessageCounts(counts);
    } catch (error) {
      console.error("Failed to fetch unread message counts:", error);
    }
  };

  const addChat = async (userEmail, completion) => {
    // Check if a chat between the two users already exists
    if (chats.some(chat => chat.participants.includes(userEmail))) {
      completion({
        success: false,
        error: new Error("A chat already exists with this user.")
      });
      return;
    }

    try {
      const chat = await firestoreManager.createChat(userEmail, currentUserEmail);
      setChats([...chats, chat]);
      completion({ success: true, chat });
    } catch (error) {
      completion({ success: false, error });
    }
  };

  const markMessagesAsRead = async (chat) => {
    await firestoreManager.markMessagesAsRead(chat, currentUserEmail);
  };

  useEffect(() => {
    fetchChats();
  }, [currentUserEmail, firestoreManager]);

  useEffect(() => {
    observeUnreadMessageCounts(chats);
  }, [currentUserEmail, firestoreManager, chats]);

  return {
    chats,
    isLoading,
    searchText,
    setSearchText,
    unreadMessageCounts,
    addChat,
    markMessagesAsRead
  };
}
