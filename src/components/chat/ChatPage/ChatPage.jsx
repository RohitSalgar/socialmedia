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
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";

const ChatPage = ({ data }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const messagesDivRef = useRef(null);
  const { singleConnectionId } = useSelector((state) => state.chat);
  const [liveUser, setLiveUser] = useState(null);
  const [chatMessage, setChatMessage] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const { userId } = useSelector((state) => state.profile.profileData);
  let filteredData = data?.filter((e) => e._id === singleConnectionId);
  const [messageEmitted, setMessageEmitted] = useState(false);
  const { data: chatData, isLoading: chatLoading } = useGetChatById(
    filteredData[0]._id
  );
  useEffect(() => {
    if (messagesDivRef.current) {
      messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
    }
  }, [messagesDivRef.current, chatMessage]);

  useEffect(() => {
    if (chatData) {
      setChatMessage(chatData);
    }
  }, [chatData, socket]);

  useEffect(() => {
    emitMessageOnce();
  }, [socket]);

  const emitMessageOnce = () => {
    socket?.emit("users", filteredData[0]._id, userId);
    socket?.on("getUsers", (users) => {
      setLiveUser(users);
    });

    if (messageEmitted === false) {
      socket?.on("getMessage", (data) => {
        console.log(data, "dataa");
        const newChat = {
          message: data.message,
          createdAt: data.createdAt,
          senderId: data.senderId,
        };

        setChatMessage((prev) => [...prev, newChat]);
        setMessageEmitted(true);
      });
    }
  };

  const sendChatMessage = () => {
    const newChat = {
      message: sendMessage,
      senderId: userId,
      senderName: filteredData[0].senderName,
      receiverId:
        filteredData[0].recipientId === userId
          ? filteredData[0].senderId
          : filteredData[0].recipientId,
      connectionId: filteredData[0]._id,
    };

    setChatMessage((prev) => [...prev, newChat]);
    socket.emit("sendMessage", {
      senderId: userId,
      receiverId:
        filteredData[0].recipientId === userId
          ? filteredData[0].senderId
          : filteredData[0].recipientId,
      connectionId: filteredData[0]._id,
      senderName: filteredData[0].senderName,
      message: sendMessage.trim(),
      createdAt: moment().toISOString(),
    });
    setSendMessage("");
    setMessageEmitted(false);
  };

  if (chatLoading) {
    return <Loader />;
  }

  if (socket && socket.connected) {
    return (
      <Box className={styles.chatPage}>
        <KeyboardBackspaceIcon
          sx={{ cursor: "pointer", margin: "5px" }}
          onClick={() => dispatch(setSingleChatModeOff())}
        />
        <Box className={styles.chatHeader}>
          <p className={styles.contactName}>
            {filteredData[0].senderId === userId
              ? filteredData[0].recipientName
              : filteredData[0].senderName}
          </p>
          <p className={styles.activeLogo}>
            {liveUser &&
            liveUser.some(
              (element) => element.userId === filteredData[0].recipientId
            )
              ? "Actvie Now"
              : "Offline"}
          </p>
        </Box>
        <Box className={styles.chatMessages} ref={messagesDivRef}>
          {chatMessage?.map((message) => (
            <Box key={message.id} className={styles.messageContainer}>
              {chatMessage && (
                <Box>
                  {message.senderId !== userId && (
                    <Box>
                      <Typography className={styles.sender}>
                        {message.message}{" "}
                      </Typography>
                      <p className={styles.senderTime}>
                        {moment(message?.createdAt).format(
                          "DD MM YYYY, h:mm A"
                        )}
                      </p>
                    </Box>
                  )}
                  {message.senderId === userId && (
                    <Box>
                      <Typography className={styles.receiver}>
                        {message.message}
                        {message.status === 1 ? <IoIosEye /> : <IoIosEyeOff />}
                      </Typography>

                      <p className={`${styles.receiverTime}`}>
                        {moment(message?.createdAt).format(
                          "DD MM YYYY, h:mm A"
                        )}
                      </p>
                    </Box>
                  )}
                </Box>
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
  }
};

export default ChatPage;
