import { Box, Divider, Typography } from "@mui/material";
import styles from "./index.module.css";
import { useEffect, useRef, useState } from "react";
import NotificationTemplate from "./NotificationTemplate";
import { useGetAllNotificationById } from "../../hooks/notifications";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const NotificationContent = () => {
  const [selected, setSelected] = useState("all");
  const notificationRef = useRef();
  const { userId } = useSelector((state) => state.profile.profileData);
  const { data, isLoading } = useGetAllNotificationById(userId);

  const handleClick = (props) => {
    setSelected(props);
  };

  useEffect(() => {
    if (notificationRef.current) {
      notificationRef.current.scrollTop = notificationRef.current.scrollHeight;
    }
  }, [notificationRef.current]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ marginLeft: "-0.9rem", marginRight: "-0.9rem" }}>
      <Box className={styles.optionDiv}>
        <Box
          className={`${selected === "all" && styles.selectedButton} ${
            styles.buttonDiv
          }`}
          onClick={() => handleClick("all")}
        >
          <Typography>All</Typography>
        </Box>
        <Box
          className={`${selected === "myposts" && styles.selectedButton} ${
            styles.buttonDiv
          }`}
          onClick={() => handleClick("myposts")}
        >
          <Typography>My Posts</Typography>
        </Box>
        <Box
          className={`${selected === "mention" && styles.selectedButton} ${
            styles.buttonDiv
          }`}
          onClick={() => handleClick("mention")}
        >
          <Typography>Mention</Typography>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "0.2rem" }} />
      <Box className={styles.notificationMainDiv} ref={notificationRef}>
        {data &&
          data.map((e, i) => {
            return <NotificationTemplate key={i} data={e} />;
          })}
      </Box>
    </Box>
  );
};

export default NotificationContent;
