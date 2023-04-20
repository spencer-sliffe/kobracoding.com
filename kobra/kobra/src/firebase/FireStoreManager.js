import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, getDocs, where, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase"; // Import Firestore and Storage constants from firebase.js

export class FireStoreManager {
  constructor() {
    this.db = db; // Use the imported Firestore constant
  }

  async fetchMessages(chatId, completion) {
    try {
      const messagesRef = collection(this.db, "chats", chatId, "messages");
      const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
      const snapshot = await getDocs(messagesQuery);
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      }));
      completion({ success: true, messages });
    } catch (error) {
      completion({ success: false, error });
    }
  }

  observeMessages(chat, completion) {
    const messagesRef = collection(this.db, "chats", chat.id, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
    return onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      }));
      completion({ success: true, messages });
    }, (error) => {
      completion({ success: false, error });
    });
  }

  async sendMessage(chatId, message, sender, completion) {
    try {
      const messagesRef = collection(this.db, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        sender,
        text: message,
        timestamp: serverTimestamp(),
        isRead: false
      });
      const chatRef = doc(this.db, "chats", chatId);
      await updateDoc(chatRef, {
        lastMessage: {
          sender,
          text: message,
          timestamp: serverTimestamp(),
          isRead: false
        }
      });
      completion({ success: true });
    } catch (error) {
      completion({ success: false, error });
    }
  }

  observeChats(userEmail, completion) {
    const chatsRef = collection(this.db, "chats");
    const chatsQuery = query(chatsRef, where("participants", "array-contains", userEmail));
    return onSnapshot(chatsQuery, (snapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      completion({ success: true, chats });
    }, (error) => {
      completion({ success: false, error });
    });
  }

  async createChat(userEmail, currentUserEmail, completion) {
    try {
      const chatsRef = collection(this.db, "chats");
      const chatRef = doc(chatsRef);
      await setDoc(chatRef, {
        participants: [userEmail, currentUserEmail],
        lastMessage: {
          sender: currentUserEmail,
          text: "",
          timestamp: serverTimestamp(),
          isRead: false
        }
      });
      completion({ success: true, chat: { id: chatRef.id, participants: [userEmail, currentUserEmail] } });
    } catch (error) {
      completion({ success: false, error });
    }
  }

  observeUnreadMessageCount(chat, currentUserEmail, completion) {
    const messagesRef = collection(this.db, "chats", chat.id, "messages");
    const unreadMessagesQuery = query(
      messagesRef,
      where("sender", "!=", currentUserEmail),
      where("isRead", "==", false)
    );
    return onSnapshot(
      unreadMessagesQuery,
      (snapshot) => {
        completion({ success: true, count: snapshot.docs.length });
      },
      (error) => {
        completion({ success: false, error });
      }
    );
  }

  async markMessagesAsRead(chat, currentUserEmail) {
    try {
      const messagesRef = collection(this.db, "chats", chat.id, "messages");
      const unreadMessagesQuery = query(
        messagesRef,
        where("sender", "!=", currentUserEmail),
        where("isRead", "==", false)
      );
      const snapshot = await getDocs(unreadMessagesQuery);
      snapshot.docs.forEach(async (doc) => {
        const messageRef = doc(this.db, "chats", chat.id, "messages", doc.id);
        await updateDoc(messageRef, { isRead: true });
      });
      console.log("Messages updated as read successfully");
    } catch (error) {
      console.log("Error marking messages as read:", error);
    }
  }
}
