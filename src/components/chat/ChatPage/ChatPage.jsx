// ChatPage.js

import { useState } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatMessages from '../ChatMessage/ChatMessage';
import ChatInput from '../ChatInput/ChatInput';
import styles from './ChatPage.module.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'user' },
    { id: 2, text: 'Hi there!', sender: 'other' },
    // Add more messages as needed
  ]);

  const handleSendMessage = (newMessage) => {
    const updatedMessages = [...messages, { id: messages.length + 1, text: newMessage, sender: 'user' }];
    setMessages(updatedMessages);
  };

  return (
    <div className={styles.chatPage}>
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
