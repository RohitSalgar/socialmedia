import { Box, Button, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import rohitimg from "../../assets/images/sanjai.png";

const Followers = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const profileheadclr = palette.black.medium;

  return (
    <WidgetWrapper className={styles.followmain}>
      <Typography color={medium} m="0.5rem 0">
        <Box className={styles.followersdiv}>
          <Box className={styles.avatardiv}>
            <Avatar alt="B" src={rohitimg} sx={{ width: 40, height: 40 }} />
            <Typography className={styles.avatarname}>Sanjai S</Typography>
          </Box>
          <Box className={styles.unfollowdiv}>
            <Button className={styles.unfollowbtn} variant="dark">
              Un Follow
            </Button>
          </Box>
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};

export default Followers;
