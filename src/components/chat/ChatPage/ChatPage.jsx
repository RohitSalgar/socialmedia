import { useDispatch, useSelector } from "react-redux";
import styles from "./ChatPage.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { CancelScheduleSend } from "@mui/icons-material";
import { setSingleChatModeOff } from "../../../redux/slices/chat";
import { useGetChatById } from "../../../hooks/chat";
import Loader from "../../Loader/Loader";
import { useSocket } from "../../../hooks/socket";

const ChatPage = ({ data }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const messagesDivRef = useRef(null);
  const { singleConnectionId } = useSelector((state) => state.chat);
  const [liveUser, setLiveUser] = useState(null);
  const [chatMessage, setChatMessage] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const { userId } = useSelector((state) => state.profile.profileData);
  const { data: chatData, isLoading: chatLoading } = useGetChatById(data._id);

  console.log(data, "data");

  let filteredData = data?.filter((e) => e._id === singleConnectionId);

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
        message: { message: data.message, createdAt: data.createdAt },
        senderId: data.senderId,
        senderName: data.senderName,
      };

      setChatMessage((prev) => [...prev, newChat]);
    });
  }, [socket, userId]);

  console.log(chatMessage, "chatmess");

  const sendChatMessage = (e) => {
    e.preventDefault();
    const newChat = {
      message: sendMessage,
      senderId: userId,
      receiverId: data?.recipientId,
      connectionId: data?._id,
    };

    setChatMessage((prev) => [...prev, newChat]);
    socket.emit("sendMessage", {
      senderId: userId,
      receiverId: data?.recipientId,
      connectionId: data?._id,
      message: sendMessage.trim(),
      createdAt: moment().toISOString(),
    });

    setSendMessage("");
  };

  if (chatLoading) {
    return <Loader />;
  }

  return (
    <Box className={styles.chatPage} ref={messagesDivRef} sx={{ overflow: "" }}>
      <KeyboardBackspaceIcon
        sx={{ cursor: "pointer", margin: "5px" }}
        onClick={() => dispatch(setSingleChatModeOff())}
      />
      <Box className={styles.chatHeader}>
        <span className={styles.contactName}>
          {filteredData[0].senderId === userId
            ? filteredData[0].recipientName
            : filteredData[0].senderName}
        </span>
        <span className={styles.lastSeen}>today 5:30</span>
      </Box>
      <Box className={styles.chatMessages}>
        {chatMessage?.map((message) => (
          <Box key={message.id} className={styles.messageContainer}>
            {chatMessage && (
              <Typography className={styles.sender}>
                {message.message}
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
