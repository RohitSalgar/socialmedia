/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChatPerson.module.css";
import { setSingleChatModeOn } from "../../../redux/slices/chat";
import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useUpdateChatStatus } from "../../../hooks/chat";
import { styled } from '@mui/material/styles';
import { useEffect } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

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
        {isUserInArray ? <StyledBadge color="success" overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} variant="dot">
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
        </StyledBadge> :
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
