import { Avatar, Box } from "@mui/material";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { setDashboardView } from "../../redux/slices/profileSlice";
import moment from "moment";
import { useUpdateNotificationStatus } from "../../hooks/notifications";
import { setNotificationPostId } from "../../redux/slices/post";

const NotificationTemplate = ({ data }) => {
  const dispatch = useDispatch();
  const { mutate } = useUpdateNotificationStatus();

  const handleNotification = () => {
    dispatch(setDashboardView("notification"));
    dispatch(setNotificationPostId(data?.postId));
    let payload = {};
    payload.id = data?._id;
    mutate(payload);
  };

  return (
    <Box
      className={`${data?.status === 1 && styles.unReadmsg} ${
        styles.NotificationTemplateDiv
      }`}
    >
      <Box
        className={`${styles.notificationDiv}`}
        onClick={() => handleNotification()}
      >
        <Avatar
          sx={{ width: "25px", height: "25px", border:'1px solid #9e9e9e' }}
          src={data?.userProfile}
        />
        <Box sx={{ fontSize: "12px" }}>
          <span className={styles.linkWord}>{data?.userName}</span>
          {data?.category === 2
            ? " commented on your post "
            : data?.category === 3
            ? " tagged you in his post "
            : " liked your post "}
          <span style={{ fontSize: "10px", fontWeight: "500" }}>
            at {moment(data?.createdAt).format("DD-MM-YYYY")}
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationTemplate;
