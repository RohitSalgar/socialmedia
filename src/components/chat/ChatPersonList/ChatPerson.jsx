/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChatPerson.module.css";
import { setSingleChatModeOn } from "../../../redux/slices/chat";
import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useUpdateChatStatus } from "../../../hooks/chat";
import { useEffect } from "react";

const ChatPerson = ({ data, notification }) => {
  const dispatch = useDispatch();
  const { chatliveUsers } = useSelector((state) => state.chat)
  const { userId } = useSelector((state) => state.profile.profileData);
  const { mutate } = useUpdateChatStatus();

  const notifyCount = notification?.filter((notify) => notify._id === data._id)

  const handleSubmit = () => {
    let payload = {};
    payload.userId = userId;
    payload.connectionId = data._id;
    dispatch(setSingleChatModeOn(data._id));
    mutate(payload);
  };

  const isUserInArray = chatliveUsers?.some(user => {
    return (
      (user.userId === data.senderId || user.userId === data.recipientId) &&
      user.userId !== userId
    );
  });

  const notificationCountings = (data, notify) => {
    if (notify.length === 1) {
      return data.unSeenCount + notify[0].notifyCount
    } else {
      return data.unSeenCount
    }
  }

  return (
    <Box className={styles.ChatPersonDiv} onClick={() => handleSubmit()}>
      <Box className={styles.imgdiv}>
        {isUserInArray ? <Badge color="success" overlap="circular" badgeContent=" " variant="dot">
          <Avatar
            width={"40px"}
            height={"40px"}
            src={
              data.senderId === userId
                ? data.recipientProfile
                : data.senderProfile
            }
            alt="alt"
          />
        </Badge> :
          <Avatar
            width={"40px"}
            height={"40px"}
            src={
              data.senderId === userId
                ? data.recipientProfile
                : data.senderProfile
            }
            alt="alt"
          />
        }
        <Typography className={styles.ChatPersonName}>
          {data.senderId === userId ? data.recipientName : data.senderName}
        </Typography>
        <Box></Box>
      </Box>
      <IconButton>
        {data && <Badge badgeContent={notificationCountings(data, notifyCount)} color="primary">
          {/* <Badge badgeContent={data?.unSeenCount} color="primary"> */}
          <ChatIcon className={styles.svgimg} />
        </Badge>}
      </IconButton>
    </Box>
  );
};

export default ChatPerson;
