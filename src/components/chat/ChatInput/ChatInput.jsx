// ChatInput.js

import { useState } from "react";
import styles from "./ChatInput.module.css";

const ChatInput = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className={styles.chatInput}>
      <input
        type="text"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className={styles.messageInput}
      />
      <button onClick={handleSendMessage} className={styles.sendButton}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
