// ChatHeader.js

import styles from "./ChatHeader.module.css";

const ChatHeader = () => {
  return (
    <div className={styles.chatHeader}>
      <span className={styles.contactName}>John Doe</span>
      {/* Add additional header elements as needed */}
    </div>
  );
};

export default ChatHeader;
