import { Box, Typography, Button, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import rohitimg from "../../assets/images/rohitone.png";
import ProfilePost from "../ProfilePosts";
import Followers from "../Followers/Followers";

const Profile = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const profileheadclr = palette.black.medium;

  return (
    <WidgetWrapper>
      <Box className={styles.profilemain}>
        <Typography color={medium} m="0.5rem 0">
          <Box className={styles.avatardiv}>
            <Avatar alt="B" src={rohitimg} sx={{ width: 80, height: 80 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "10px",
                width: "100%",
                marginLeft: "40px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: "3px",
                }}
              >
                <Typography color={dark} variant="h5" fontWeight="500">
                  17
                </Typography>
                <Typography color={dark} variant="h6" fontWeight="400">
                  Posts
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: "3px",
                }}
              >
                <Typography color={dark} variant="h5" fontWeight="500">
                  100
                </Typography>
                <Typography color={dark} variant="h6" fontWeight="400">
                  Followers
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: "3px",
                }}
              >
                <Typography color={dark} variant="h5" fontWeight="500">
                  2000
                </Typography>
                <Typography color={dark} variant="h6" fontWeight="400">
                  Following
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box  className={styles.nameandeditdiv}>
            <Typography
              color={profileheadclr}
              className={styles.avatarname}
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Rohit Salgar
            </Typography>
            <Button variant="dark" className={styles.editbtn}>Edit Profile</Button>
          </Box>
          <Typography
            variant="h6"
            fontWeight="400"
            style={{
              paddingTop: "10px",
            }}
          >
            Your pathway to stunning and immaculate beauty and made sure your
            skin is exfoliating skin and shining like light.
          </Typography>
        </Typography>
        {/* posts div */}
        {/* <Box>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>Posts</Typography>
          </Box>
          <Box className={styles.postdiv}>
            <ProfilePost />
          </Box>
        </Box> */}
        {/* ---------------- */}
        {/* Followers div */}
        <Box>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>Followers</Typography>
          </Box>
          <Box className={styles.postdiv}>
            <Followers />
            <Followers />
            <Followers />
            <Followers />
            <Followers />
            <Followers />
            <Followers />
            <Followers />
            <Followers />
            <Followers />
            <Followers />
            <Followers />
            <Followers />
          </Box>
        </Box>
        {/* ---------------- */}
      </Box>
    </WidgetWrapper>
  );
};

export default Profile;
