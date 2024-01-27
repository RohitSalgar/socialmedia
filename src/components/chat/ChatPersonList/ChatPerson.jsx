/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChatPerson.module.css";
import { setSingleChatModeOn } from "../../../redux/slices/chat";
import { Box, IconButton, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useUpdateChatStatus } from "../../../hooks/chat";

const ChatPerson = ({ data, connectionId }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.profile.profileData);
  const { mutate } = useUpdateChatStatus();

  const handleSubmit = () => {
    let payload = {};
    payload.userId = userId;
    payload.connectionId = connectionId;
    dispatch(setSingleChatModeOn(data._id));
    mutate(payload);
  };

  return (
    <Box className={styles.ChatPersonDiv}>
      <Box className={styles.imgdiv}>
        <img
          width={"40px"}
          height={"40px"}
          src={data.senderProfile}
          alt="alt"
        />
        <Typography className={styles.ChatPersonName}>
          {data.senderId === userId ? data.recipientName : data.senderName}
        </Typography>
        <Box>
          <Typography className={styles.msgCount}>
            {data.unSeenCount}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={() => handleSubmit()}>
        <ChatIcon className={styles.svgimg} />
      </IconButton>
    </Box>
  );
};

export default ChatPerson;
