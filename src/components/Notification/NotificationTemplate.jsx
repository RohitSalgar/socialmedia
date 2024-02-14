import { Avatar, Box } from "@mui/material";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardView } from "../../redux/slices/profileSlice";
import moment from "moment";
import {
  useUpdateMentionedNotifications,
  useUpdateNotificationStatus,
} from "../../hooks/notifications";
import { setNotificationPostId } from "../../redux/slices/post";
import { useGetProfile } from "../../hooks/profile";
import Loader from "../Loader/Loader";

const NotificationTemplate = ({ data }) => {
  const dispatch = useDispatch();
  const { mutate } = useUpdateNotificationStatus();
  const { mutate: mutateMentionNotifications } =
    useUpdateMentionedNotifications();
  const { userId } = useSelector((state) => state.profile.profileData);
  const { data: profileData, isLoading } = useGetProfile(userId);

  if (isLoading) {
    return <Loader />;
  }

  const handleNotification = () => {
    dispatch(setDashboardView("notification"));
    dispatch(setNotificationPostId(data?.postId));
    let payload = {};
    payload.id = data?._id;
    mutate(payload);
  };

  const handleMentionedNotification = () => {
    dispatch(setDashboardView("notification"));
    dispatch(setNotificationPostId(data?.postId));
    let payload = {};
    payload.postId = data?.postId;
    payload.userName = profileData?.userData?.userName;
    mutateMentionNotifications(payload);
  };

  function returnClassNames() {
    let className;
    if (data?.category === 3) {
      if (data?.seenStatus[0]?.status === 1) {
        return (className = styles.unReadmsg);
      }
    }
    if (data?.category === 1 || data?.category === 2) {
      if (data?.status === 1) {
        return (className = styles.unReadmsg);
      }
    }
    return className;
  }

  return (
    <Box className={`${returnClassNames()} ${styles.NotificationTemplateDiv}`}>
      <Box
        className={`${styles.notificationDiv}`}
        onClick={() =>
          data?.category === 3
            ? handleMentionedNotification()
            : handleNotification()
        }
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
