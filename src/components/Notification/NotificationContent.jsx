import { Box, Divider, Typography } from "@mui/material";
import styles from "./index.module.css";
import { useEffect, useRef, useState } from "react";
import NotificationTemplate from "./NotificationTemplate";

const NotificationContent = () => {
  const [selected, setSelected] = useState("myposts");
  const notificationRef = useRef();

  const handleClick = (props) => {
    setSelected(props);
  };

  useEffect(() => {
    if (notificationRef.current) {
      notificationRef.current.scrollTop = notificationRef.current.scrollHeight;
    }
  }, [notificationRef.current]);

  let array = [1,2, 3, 4, 5, 6,7,8,9,1,2];

  return (
    <Box>
      <Box className={styles.optionDiv}>
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
        {array.map((e, i) => {
          return <NotificationTemplate key={i} data={e} />;
        })}
      </Box>
    </Box>
  );
};

export default NotificationContent;
