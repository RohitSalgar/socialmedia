/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import styles from "./ChatPerson.module.css";
import { setSingleChatModeOn } from "../../../redux/slices/chat";
import { Box, Typography } from "@mui/material";

const ChatPerson = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <Box
      className={styles.ChatPersonDiv}
      onClick={() => dispatch(setSingleChatModeOn(id))}
    >
      <Box>
        <img
          width={"40px"}
          height={"40px"}
          src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
          alt="alt"
        />
      </Box>
      <Box>
        <Typography className={styles.ChatPersonName}>Rohit Salgar</Typography>
      </Box>
    </Box>
  );
};

export default ChatPerson;
