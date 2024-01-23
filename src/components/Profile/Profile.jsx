import { Box, Typography, Button, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import ProfilePost from "../ProfilePosts";
import Followers from "../Followers/Followers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditOn } from "../../redux/slices/chat";
import { useGetProfile } from "../../hooks/profile";
import Loader from "../Loader/Loader";

const Profile = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [viewList, setViewList] = useState("post");
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const profileheadclr = palette.black.medium;
  const userId = useSelector((state) => state.profile.profileData.userId);
  const { data, isLoading } = useGetProfile(userId);

  const connection =
    data && data[0]?.connectionCounts?.filter((e) => e.status === 1)[0]?.count;

  const following =
    data && data[0]?.connectionCounts?.filter((e) => e.status === 2)[0]?.count;

  if (isLoading) {
    <Loader />;
  }

  function checkIsNumber(number) {
    if (number != null) {
      return number;
    }
    return 0;
  }

  return (
    <WidgetWrapper>
      <Box className={styles.profilemain}>
        <Typography color={medium} m="0.5rem 0">
          <Box className={styles.avatardiv}>
            <Avatar
              alt="B"
              src={data && data[0]?.userData?.profile}
              sx={{ width: 80, height: 80 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "10px",
                width: "100%",
                marginLeft: "20px",
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
                <Box
                  sx={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => setViewList("post")}
                >
                  <Typography color={dark} variant="h5" fontWeight="500">
                    {data && data[0]?.postCount}
                  </Typography>
                  <Typography color={dark} variant="h6" fontWeight="400">
                    Posts
                  </Typography>
                </Box>
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
                <Box
                  sx={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => setViewList("followers")}
                >
                  <Typography color={dark} variant="h5" fontWeight="500">
                    {checkIsNumber(connection) + checkIsNumber(following)}
                  </Typography>
                  <Typography color={dark} variant="h6" fontWeight="400">
                    Followers
                  </Typography>
                </Box>
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
                  {checkIsNumber(following)}
                </Typography>
                <Typography color={dark} variant="h6" fontWeight="400">
                  Following
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
                  {checkIsNumber(connection)}
                </Typography>
                <Typography color={dark} variant="h6" fontWeight="400">
                  Connection
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={styles.nameandeditdiv}>
            <Typography
              color={profileheadclr}
              className={styles.avatarname}
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              {data && data[0]?.userData?.fullName}
            </Typography>
            <Button
              variant="dark"
              onClick={() => dispatch(setEditOn())}
              className={styles.editbtn}
            >
              Edit Profile
            </Button>
          </Box>
          <Typography
            variant="h6"
            fontWeight="400"
            style={{
              paddingTop: "10px",
            }}
          >
            {data && data[0]?.userData?.about}
          </Typography>
        </Typography>
        {viewList === "post" && (
          <Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Posts</Typography>
            </Box>
            <Box className={styles.postdiv}>
              <ProfilePost />
            </Box>
          </Box>
        )}
        {viewList === "followers" && (
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
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default Profile;
