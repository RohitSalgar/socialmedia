import { Box, Button, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import rohitimg from "../../assets/images/sanjai.png";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import { useDispatch } from "react-redux";
import { setViewProfileId } from "../../redux/slices/profileSlice";

const Followers = (data) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper className={styles.followmain}>
      <Typography color={medium} m="0.5rem 0">
        <Box
          className={styles.followersdiv}
          onClick={() => dispatch(setViewProfileId(data?.id))}
        >
          <Box className={styles.avatardiv}>
            <Avatar alt="B" src={rohitimg} sx={{ width: 40, height: 40 }} />
            <Typography className={styles.avatarname}>
              {data?.fullName}
            </Typography>
          </Box>
          <Box className={styles.unfollowdiv}>
            {data?.type === "following" && (
              <Button className={styles.unfollowbtn} variant="dark">
                Unfollow
              </Button>
            )}
            {data?.type === "connection" && <VerifiedRoundedIcon />}
            {data?.type === "followers" && <NewReleasesRoundedIcon />}
          </Box>
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};

export default Followers;
