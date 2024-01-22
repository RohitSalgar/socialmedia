import { useDispatch } from "react-redux";
import styles from "./ChatPage.module.css";
import { setSingleChatModeOff } from "../../../redux/slices/chat";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatPage = () => {
  const dispatch = useDispatch();
  let messages = [
    {
      id: 1,
      text: "Hello ",
      sender: true,
    },
    {
      id: 1,
      text: "Hello John ",
      receiver: true,
    },
    {
      id: 1,
      text: "How are you ? ",
      sender: true,
    },
    {
      id: 1,
      text: "I am fine",
      receiver: true,
    },
    {
      id: 1,
      text: "How are you ? ",
      sender: true,
    },
    {
      id: 1,
      text: "I am fine , just had lunch and going for walk.",
      receiver: true,
    },
    {
      id: 1,
      text: "Ok continue",
      sender: true,
    },
    {
      id: 1,
      text: "I am fine , just had lunch and going for walk.",
      receiver: true,
    },
    {
      id: 1,
      text: "Ok continue",
      sender: true,
    },
    {
      id: 1,
      text: "I am fine , just had lunch and going for walk.",
      receiver: true,
    },
    {
      id: 1,
      text: "Ok continue",
      sender: true,
    },
    {
      id: 1,
      text: "I am fine , just had lunch and going for walk.",
      receiver: true,
    },
    {
      id: 1,
      text: "Ok continue",
      sender: true,
    },
  ];
  return (
    <Box className={styles.chatPage}>
      <KeyboardBackspaceIcon
        sx={{ cursor: "pointer", margin: "5px" }}
        onClick={() => dispatch(setSingleChatModeOff())}
      />
      <Box className={styles.chatHeader}>
        <span className={styles.contactName}>John Doe</span>
        <span className={styles.lastSeen}>today 5:30</span>
      </Box>
      <Box className={styles.chatMessages}>
        {messages?.map((message) => (
          <Box key={message.id} className={styles.messageContainer}>
            {message.sender && (
              <Typography className={styles.sender}>{message.text}</Typography>
            )}
            {message.receiver && (
              <Typography className={styles.receiver}>
                {message.text}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
      <Box className={styles.chatInput}>
        <input
          type="text"
          placeholder="Type a message..."
          className={styles.messageInput}
        />
        <SendIcon className={styles.sendButton} />
      </Box>
    </Box>
  );
};

export default ChatPage;
