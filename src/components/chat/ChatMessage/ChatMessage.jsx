// ChatMessages.js

import styles from "./ChatMessages.module.css";

const ChatMessages = ({ messages }) => {
  return (
    <div className={styles.chatMessages}>
      {messages?.map((message) => (
        <div key={message.id} className={styles.messageContainer}>
          <span className={styles[message.sender]}>{message.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
