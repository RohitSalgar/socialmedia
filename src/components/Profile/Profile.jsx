import { Box, Typography, Button, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import Followers from "../Followers/Followers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditOn } from "../../redux/slices/chat";
import {
  useGetFollowList,
  useGetProfile,
  useGetFollowingList,
  useGetConnectionList,
} from "../../hooks/profile";
import Loader from "../Loader/Loader";
import PostWidget from "../../view/User/Private/Posts/PostWidget";
import { useGetMyPostList } from "../../hooks/posts";
import { setViewProfileId } from "../../redux/slices/profileSlice";
import LookingEmpty from "../LookingEmpty/LookingEmpty";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Profile = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [viewList, setViewList] = useState("post");
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const profileheadclr = palette.black.medium;
  const userId = useSelector((state) => state.profile.profileData.userId);
  const profileId = useSelector((state) => state.profile.viewProfileId);
  const { data, isLoading } = useGetProfile(profileId);
  const { data: followList, isLoading: followLoading } = useGetFollowList(
    profileId,
    viewList
  );
  const { data: followingList, isLoading: followingLoading } =
    useGetFollowingList(profileId, viewList);
  const { data: connectionList, isLoading: connectionLoading } =
    useGetConnectionList(profileId, viewList);
  const { data: postList, isLoading: postLoading } = useGetMyPostList(
    profileId,
    viewList
  );
  if (
    isLoading ||
    followLoading ||
    followingLoading ||
    connectionLoading ||
    postLoading
  ) {
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
      {profileId !== userId && (
        <Box className={styles.closediv}>
          <Button
            className={styles.closebtn}
            onClick={() => dispatch(setViewProfileId(userId))}
          >
            <CloseRoundedIcon />
          </Button>
        </Box>
      )}
      <Box className={styles.profilemain}>
        <Typography color={medium} m="0.5rem 0">
          <Box className={styles.avatardiv}>
            <Avatar
              alt="B"
              src={data?.userData?.profile}
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
                    {checkIsNumber(data?.detailsCounts?.postCount)}
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
                    {checkIsNumber(data?.detailsCounts?.followersCount)}
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
                <Box
                  sx={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => setViewList("following")}
                >
                  <Typography color={dark} variant="h5" fontWeight="500">
                    {checkIsNumber(data?.detailsCounts?.followingCount)}
                  </Typography>
                  <Typography color={dark} variant="h6" fontWeight="400">
                    Following
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
                  onClick={() => setViewList("connection")}
                >
                  <Typography color={dark} variant="h5" fontWeight="500">
                    {checkIsNumber(data?.detailsCounts?.connectionCount)}
                  </Typography>
                  <Typography color={dark} variant="h6" fontWeight="400">
                    Connection
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={styles.nameandeditdiv}>
            <Typography
              color={profileheadclr}
              className={styles.avatarname}
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              {data?.userData?.fullName}
            </Typography>
            {profileId === userId && (
              <Button
                variant="dark"
                onClick={() => dispatch(setEditOn())}
                className={styles.editbtn}
              >
                Edit Profile
              </Button>
            )}
          </Box>
          <Typography
            variant="h6"
            fontWeight="400"
            style={{
              paddingTop: "10px",
            }}
          >
            {data?.userData?.about}
          </Typography>
        </Typography>
        {viewList === "post" && (
          <Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Posts</Typography>
            </Box>
            <Box className={styles.postdiv}>
              {postList?.map((data) => (
                <PostWidget key={data._id} postData={data} />
              ))}
              {postList?.length === 0 && <LookingEmpty />}
            </Box>
          </Box>
        )}
        {viewList === "followers" && (
          <Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Followers</Typography>
            </Box>
            <Box className={styles.postdiv}>
              {followList?.map((e, i) => {
                return (
                  <Followers
                    key={i}
                    id={e?.senderId}
                    fullName={e?.senderName}
                    data={e}
                    type="followers"
                  />
                );
              })}
              {followList?.length === 0 && <LookingEmpty />}
            </Box>
          </Box>
        )}
        {viewList === "following" && (
          <Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Followings</Typography>
            </Box>
            <Box className={styles.postdiv}>
              {followingList?.map((e, i) => {
                return (
                  <Followers
                    key={i}
                    id={e?.recipientId}
                    fullName={e?.recipientName}
                    data={e}
                    type="following"
                    unFollow={profileId === userId ? true : false}
                  />
                );
              })}
              {followingList?.length === 0 && <LookingEmpty />}
            </Box>
          </Box>
        )}
        {viewList === "connection" && (
          <Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Connections</Typography>
            </Box>
            <Box className={styles.postdiv}>
              {connectionList?.map((e, i) => {
                return (
                  <Followers
                    key={i}
                    id={e?.recipientId}
                    fullName={e?.recipientName}
                    data={e}
                    type="connection"
                  />
                );
              })}
              {connectionList?.length === 0 && <LookingEmpty />}
            </Box>
          </Box>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default Profile;
