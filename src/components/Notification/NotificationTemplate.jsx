import { Avatar, Box } from "@mui/material";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { setDashboardView } from "../../redux/slices/profileSlice";

const NotificationTemplate = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <Box
      className={styles.notificationDiv}
      onClick={() => dispatch(setDashboardView("notification"))}
    >
      <Avatar sx={{ width: "25px", height: "25px" }} />
      <Box sx={{ fontSize: "10px" }}>
        <span className={styles.linkWord}>Vijay Ragavan</span> added new post .
        go check out .
      </Box>
    </Box>
  );
};

export default NotificationTemplate;
