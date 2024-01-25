import { useDispatch, useSelector } from "react-redux";
import styles from "./ChatPage.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../../hooks/socket";
import moment from "moment";
import { CancelScheduleSend } from "@mui/icons-material";
import { setSideView } from "../../../redux/slices/profileSlice";
import { setSingleChatModeOff } from "../../../redux/slices/chat";

const ChatPage = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const messagesDivRef = useRef(null);
  const [liveUser, setLiveUser] = useState(null);
  const [chatMessage, setChatMessage] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const { userId } = useSelector((state) => state.profile.profileData);

  useEffect(() => {
    if (messagesDivRef.current) {
      messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
    }
  }, [socket, messagesDivRef.current, chatMessage]);

  useEffect(() => {
    socket?.emit("users", userId);
    socket?.on("getUsers", (users) => {
      setLiveUser(users);
    });

    socket?.on("getMessage", (data) => {
      const newChat = {
        message: { message: data.text, createdAt: data.createdAt },
        senderId: data.senderId,
        senderName: data.senderName,
      };

      setChatMessage((prev) => [...prev, newChat]);
    });
  }, [socket, userId]);

  const sendChatMessage = (e) => {
    e.preventDefault();
    const newChat = {
      message: { message: sendMessage, createdAt: moment().toISOString() },
      senderId: userId,
      receiverId: userId,
    };

    setChatMessage((prev) => [...prev, newChat]);
    socket.emit("sendMessage", {
      senderId: userId,
      receiverId: [userId],
      text: sendMessage.trim(),
      createdAt: moment().toISOString(),
    });

    setSendMessage("");
  };

  return (
    <Box className={styles.chatPage} ref={messagesDivRef}>
      <KeyboardBackspaceIcon
        sx={{ cursor: "pointer", margin: "5px" }}
        onClick={() => dispatch(setSingleChatModeOff())}
      />
      <Box className={styles.chatHeader}>
        <span className={styles.contactName}>John Doe</span>
        <span className={styles.lastSeen}>today 5:30</span>
      </Box>
      <Box className={styles.chatMessages}>
        {chatMessage?.map((message) => (
          <Box key={message.id} className={styles.messageContainer}>
            {chatMessage && (
              <Typography className={styles.sender}>
                {message.message.message}
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
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
        />
        {sendMessage.length > 0 ? (
          <SendIcon className={styles.sendButton} onClick={sendChatMessage} />
        ) : (
          <CancelScheduleSend />
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;
