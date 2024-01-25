/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import styles from "./ChatPerson.module.css";
import { setSingleChatModeOn } from "../../../redux/slices/chat";
import { Box, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useGetChatById } from "../../../hooks/chat";
import Loader from "../../Loader/Loader";

const ChatPerson = ({ id }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetChatById(id);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box className={styles.ChatPersonDiv}>
      <Box className={styles.imgdiv}>
        <img
          width={"40px"}
          height={"40px"}
          src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
          alt="alt"
        />
        <Typography className={styles.ChatPersonName}>Rohit Salgar</Typography>
      </Box>
      <ChatIcon
        onClick={() => dispatch(setSingleChatModeOn())}
        className={styles.svgimg}
      />
    </Box>
  );
};

export default ChatPerson;
