import { Box, Button, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import rohitimg from "../../assets/images/sanjai.png";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardView,
  setViewCompanyId,
  setViewProfileId,
} from "../../redux/slices/profileSlice";
import { useChangeConnectionStatus } from "../../hooks/profile";
import Loader from "../Loader/Loader";
import { usePostUnfollow } from "../../hooks/posts";

const Followers = ({ data, type }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { profileData, viewProfileId } = useSelector((state) => state.profile);
  const medium = palette.neutral.medium;
  const { mutate, isLoading } = useChangeConnectionStatus();
  const { mutate: postUnfollowMutate, isLoading: postUnfollowLoading } =
    usePostUnfollow();

  const postData = {
    id: data?.data?._id,
    status: 3,
  };

  function handleUnfollow() {
    if (data?.data?.followerName) {
      postUnfollowMutate(postData);
    } else {
      mutate(postData);
    }
  }

  function handleClick() {
    if (type === "connection") {
      dispatch(setViewProfileId(viewProfileId === data?.recipientId
        ? data?.senderId
        : data?.recipientId));
      dispatch(setDashboardView("profile"));
    } else if (type === "followers") {
      dispatch(setViewProfileId(viewProfileId === data?.recipientId
        ? data?.senderId
        : data?.recipientId));
      dispatch(setDashboardView("profile"));
    } else if (type === "following") {
      if (data?.companyId) {
        dispatch(setViewCompanyId(data?.companyId));
        dispatch(setDashboardView("postprofile"));
      } else {
        dispatch(setDashboardView("profile"));
        dispatch(setViewProfileId(viewProfileId === data?.recipientId
          ? data?.senderId
          : data?.recipientId));
      }
    } else if (type === "companyfollowers") {
      dispatch(setViewProfileId(data?.followerId));
      dispatch(setDashboardView("profile"));
    }
  }

  if (isLoading || postUnfollowLoading) {
    <Loader />;
  }

  const getProfileName = () => {
    if (type === "connection") {
      return viewProfileId === data?.recipientId
        ? data?.senderName
        : data?.recipientName;
    } else if (type === "followers") {
      return viewProfileId === data?.recipientId
      ? data?.senderName
      : data?.recipientName;
    } else if (type === "following") {
      return data?.followerName ? data?.followerName  : viewProfileId === data?.recipientId
      ? data?.senderName
      : data?.recipientName;
    } else if (type === "companyfollowers") {
      return data?.followerName;
    }
    return 0;
  };

  const getProfilePic = () => {
    if (type === "connection") {
      return viewProfileId === data?.recipientId
        ? data?.senderProfile
        : data?.recipientProfile;
    } else if (type === "followers") {
      return viewProfileId === data?.recipientId
      ? data?.senderProfile
      : data?.recipientProfile;
    } else if (type === "following") {
      return data?.profile ? data?.profile : viewProfileId === data?.recipientId
      ? data?.senderProfile
      : data?.recipientProfile;
    } else if (type === "companyfollowers") {
      return data?.profile;
    }
    return 0;
  };

  return (
    <WidgetWrapper className={styles.followmain}>
      <Typography color={medium} m="0.5rem 0">
        <Box className={styles.followersdiv}>
          <Box className={styles.avatardiv} onClick={() => handleClick()}>
            <Avatar
              alt="B"
              src={getProfilePic()}
              sx={{ width: 40, height: 40 }}
            />
            <Typography className={styles.avatarname}>
              {getProfileName()}
            </Typography>
          </Box>
          <Box className={styles.unfollowdiv}>
            {type === "following" && data?.unFollow && (
              <Button
                className={styles.unfollowbtn}
                onClick={() => handleUnfollow()}
                variant="dark"
              >
                Unfollow
              </Button>
            )}
            {type === "following" && !data?.unFollow && <VerifiedRoundedIcon />}
            {type === "connection" && <VerifiedRoundedIcon />}
            {type === "followers" && <NewReleasesRoundedIcon />}
            {type === "companyfollowers" && <VerifiedRoundedIcon />}
          </Box>
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};

export default Followers;
