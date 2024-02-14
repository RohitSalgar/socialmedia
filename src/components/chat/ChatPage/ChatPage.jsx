import { useDispatch, useSelector } from "react-redux";
import styles from "./ChatPage.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { CancelScheduleSend } from "@mui/icons-material";
import {
  setSingleChatModeOff,
} from "../../../redux/slices/chat";
import { useGetChatById, useUpdateChatStatus } from "../../../hooks/chat";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useQueryClient } from "@tanstack/react-query";
import ChatPageSkeleton from "../../Skeleton/ChatSkeleton/ChatPageSkeleton";

const ChatPage = ({ data, socket, resetNotification }) => {
  const queryclient = useQueryClient();

  const dispatch = useDispatch();
  const { chatliveUsers } = useSelector((state) => state.chat);
  const { mutate } = useUpdateChatStatus();
  const messagesDivRef = useRef(null);
  const { singleConnectionId } = useSelector((state) => state.chat);
  const [chatMessage, setChatMessage] = useState([]);
  let [dayMessages, setDaymessages] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const { userId } = useSelector((state) => state.profile.profileData);
  let filteredData = data?.filter((e) => e._id === singleConnectionId);
  const [messageEmitted, setMessageEmitted] = useState(false);
  const {
    data: chatData,
    isLoading: chatLoading,
    refetch,
  } = useGetChatById(filteredData[0]._id);

  useEffect(() => {
    if (messagesDivRef.current) {
      messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
    }
  }, [dayMessages]);

  useEffect(() => {
    if (chatData) {
      setChatMessage(chatData);
    }
    let payload = {};
    payload.userId = userId;
    payload.connectionId = filteredData[0]._id;
    mutate(payload);
    socket?.emit("messageAck", {
      receiverId:
        filteredData[0].recipientId === userId
          ? filteredData[0].senderId
          : filteredData[0].recipientId,
    });
    socket?.on("getAckMessage", () => refetch());
  }, [chatData, socket]);
  useEffect(() => {
    let dayMsgs = categorizeMessagesByDay(chatMessage);
    setDaymessages(dayMsgs);
  }, [chatMessage]);

  useEffect(() => {
    refetch();
    if (!messageEmitted) {
      socket?.on("getMessage", (data) => {
        const newChat = {
          message: data.message,
          createdAt: data.createdAt,
          senderId: data.senderId,
        };

        setChatMessage((prev) => [...prev, newChat]);
      });
      setMessageEmitted(true);
    }
    return () => {
      socket?.off("getMessage");
    };
  }, []);



  const sendChatMessage = (e) => {
    e.preventDefault();
    const newChat = {
      message: sendMessage,
      senderId: userId,
      createdAt: new Date().toISOString(),
      senderName: filteredData[0].senderName,
      receiverId:
        filteredData[0].recipientId === userId
          ? filteredData[0].senderId
          : filteredData[0].recipientId,
      connectionId: filteredData[0]._id,
    };

    socket?.emit("sendNotification", {
      senderId: userId,
      receiverId:
        filteredData[0].recipientId === userId
          ? filteredData[0].senderId
          : filteredData[0].recipientId,
    });

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
      createdAt: new Date().toDateString(),
    });
    setSendMessage("");
    setMessageEmitted(false);
  };

  function isUserIdPresent(array, object) {
    let userPresent;
    if (userId != object.senderId) {
      userPresent = array.some((item) => item.userId === object.senderId);
    } else {
      userPresent = array.some((item) => item.userId === object.recipientId);
    }

    return userPresent;
  }

  const formatDate = (date) => {
    if (moment(date).isSame(moment(), "day")) {
      return moment(date)
        .fromNow()
        .replace("seconds", "sec")
        .replace("minutes", "min")
        .replace("hours", "hr");
    } else {
      return moment(date).format(" h:mm A");
    }
  };

  const categorizeMessagesByDay = (messages) => {
    const categorizedMessages = {
      today: [],
      yesterday: [],
      prevDays: [],
    };

    const today = new Date().toDateString();
    const yesterday = new Date(
      new Date().getTime() - 24 * 60 * 60 * 1000
    ).toDateString();

    messages.forEach((msg) => {
      const msgDate = new Date(msg.createdAt).toDateString();

      if (msgDate === today) {
        categorizedMessages.today.push(msg);
      } else if (msgDate === yesterday) {
        categorizedMessages.yesterday.push(msg);
      } else {
        const existingDateIndex = categorizedMessages.prevDays.findIndex(
          (prevDay) => prevDay.date === msgDate
        );
        if (existingDateIndex !== -1) {
          categorizedMessages.prevDays[existingDateIndex].messages.push(msg);
        } else {
          categorizedMessages.prevDays.push({ date: msgDate, messages: [msg] });
        }
      }
    });

    return categorizedMessages;
  };

  // const getMessageDate = (createdAt) => {
  //   const today = moment().startOf("day");
  //   const yesterday = moment().subtract(1, "day").startOf("day");
  //   const messageDate = moment(createdAt).startOf("day");

  //   if (messageDate.isSame(today, "day")) {
  //     return "Today";
  //   } else if (messageDate.isSame(yesterday, "day")) {
  //     return "Yesterday";
  //   } else {
  //     return moment(createdAt).format("MMM DD, YYYY");
  //   }
  // };

  if (chatLoading) {
    return <ChatPageSkeleton />;
  }

  return (
    <Box className={styles.chatPage} sx={{ height: "65vh" }}>
      <KeyboardBackspaceIcon
        sx={{ cursor: "pointer" }}
        onClick={() => {
          dispatch(setSingleChatModeOff());
          resetNotification();
          queryclient.invalidateQueries(["chat"]);
        }}
      />
      <Box className={styles.chatHeader}>
        <Box sx={{ display: "flex", alignItems: "center", padding: "10px 5px" }}>
          <Avatar
            width={"40px"}
            height={"40px"}
            src={
              filteredData[0].senderId === userId
                ? filteredData[0].recipientProfile
                : filteredData[0].senderProfile
            }
            alt="alt"
          />
          <Box style={{ marginLeft: "5px" }}>
            <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
              {filteredData[0].senderId === userId
                ? filteredData[0].recipientName
                : filteredData[0].senderName}
            </Typography>
            {chatliveUsers && isUserIdPresent(chatliveUsers, filteredData[0])
              ? <Typography style={{
                fontSize: "13px",
                fontWeight: "350", 
              color: "green"
              }}>Online</Typography>
              : <Typography sx={{
                fontSize: "13px",
                fontWeight: "350",
                color: "red"
              }}>Offline</Typography>}
          </Box>
        </Box>
      </Box>
      <Box className={styles.chatMessages} ref={messagesDivRef}>
        {dayMessages?.prevDays?.length > 0 &&
          dayMessages?.prevDays
            ?.sort((a, b) => {
              let dateA = new Date(a.date);
              let dateB = new Date(b.date);
              return dateA - dateB;
            })
            .map((e, i) => {
              return (
                <Box key={i}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "10px",
                      fontWeight: "350",
                    }}
                  >
                    {e.date}
                  </Typography>

                  {e?.messages.map((message, index) => {
                    return (
                      <Box key={index}>
                        <Box
                          key={message.id}
                          className={styles.messageContainer}
                        >
                          <Box>
                            {message.senderId !== userId && (
                              <Box>
                                <Typography className={styles.sender}>
                                  {message.message}
                                </Typography>
                                <p className={styles.senderTime}>
                                  {formatDate(message?.createdAt)}
                                </p>
                              </Box>
                            )}
                            {message.senderId === userId && (
                              <Box>
                                <Typography className={styles.receiver}>
                                  {message.message}
                                </Typography>

                                <p className={`${styles.receiverTime}`}>
                                  {formatDate(message?.createdAt)}
                                </p>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
        {dayMessages?.yesterday?.length > 0 && (
          <Box>
            <Typography
              sx={{ textAlign: "center", fontSize: "12px", fontWeight: "500" }}
            >
              Yesterday
            </Typography>
            {dayMessages.yesterday?.map((message) => (
              <Box key={message.id} className={styles.messageContainer}>
                {chatMessage && (
                  <Box>
                    {message.senderId !== userId && (
                      <Box>
                        <Typography className={styles.sender}>
                          {message.message}
                        </Typography>
                        <p className={styles.senderTime}>
                          {formatDate(message?.createdAt)}
                        </p>
                      </Box>
                    )}
                    {message.senderId === userId && (
                      <Box>
                        <Typography className={styles.receiver}>
                          {message.message}
                        </Typography>

                        <p className={`${styles.receiverTime}`}>
                          {formatDate(message?.createdAt)}
                        </p>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
        {dayMessages?.today?.length > 0 && (
          <Box>
            <Typography
              sx={{ textAlign: "center", fontSize: "12px", fontWeight: "500" }}
            >
              Today
            </Typography>
            {dayMessages.today?.map((message) => (
              <Box key={message.id} className={styles.messageContainer}>
                <Box>
                  {message.senderId !== userId && (
                    <Box>
                      <Typography className={styles.sender}>
                        {message.message}
                      </Typography>
                      <p className={styles.senderTime}>
                        {formatDate(message?.createdAt)}
                      </p>
                    </Box>
                  )}
                  {message.senderId === userId && (
                    <Box>
                      <Box className={styles.receiver}>
                        <Typography className={styles.receiverText}>
                          {message.message}
                        </Typography>
                        {message.status === 1 ? <DoneAllIcon fontSize="small" color="success" sx={{ pt: "2px" }} /> : <DoneAllIcon fontSize="small" sx={{ pt: "2px" }} />}
                      </Box>
                      <p className={`${styles.receiverTime}`}>
                        {formatDate(message?.createdAt)}
                      </p>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box className={styles.chatInput}>
        <form onSubmit={sendChatMessage} className={styles.sendform}>
          <input
            type="text"
            placeholder="Type a message..."
            className={styles.messageInput}
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
          />
          <Box>
            {sendMessage.trim().length > 0 ? (
              <IconButton
                onClick={sendChatMessage}
                className={styles.sendButton}
              >
                <SendIcon />
              </IconButton>
            ) : (
              <IconButton
                disabled={true}
                className={styles.sendButton}
              >
                <CancelScheduleSend />
              </IconButton>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ChatPage;

