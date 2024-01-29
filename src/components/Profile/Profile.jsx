import { Box, Typography, Button, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import Followers from "../Followers/Followers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditOn,
  setSingleChatModeOff,
  setChatModeOff,
} from "../../redux/slices/chat";
import {
  useGetFollowList,
  useGetProfile,
  useGetFollowingList,
  useGetConnectionList,
} from "../../hooks/profile";
import Loader from "../Loader/Loader";
import PostWidget from "../../view/User/Private/Posts/PostWidget";
import { useGetMyPostList } from "../../hooks/posts";
import {
  setCompanyId,
  setDashboardView,
  setSideView,
  setViewProfileId,
} from "../../redux/slices/profileSlice";
import LookingEmpty from "../LookingEmpty/LookingEmpty";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BusinessIcon from "@mui/icons-material/Business";

const Profile = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [viewList, setViewList] = useState("post");
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
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
  const companyId = data?.pageData?._id;

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
  function handleEdit() {
    dispatch(setSideView("editprofile"));
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
            <Typography color={dark} className={styles.avatarname}>
              {data?.userData?.fullName}
            </Typography>
            {profileId === userId && (
              <Button
                variant="dark"
                onClick={() => handleEdit()}
                className={styles.editbtn}
              >
                Edit Profile
              </Button>
            )}
            {profileId === userId && data?.pageData === null && (
              <Box className={styles.closediv}>
                <Button
                  className={styles.createbtn}
                  onClick={() => dispatch(setSideView("createcompany"))}
                >
                  Create Page
                  <BusinessIcon />
                </Button>
              </Box>
            )}
            {profileId === userId && data?.pageData?.status === 2 && (
              <Box className={styles.closediv}>
                <Button
                  className={styles.createbtn}
                  onClick={() => dispatch(setSideView("pagesotp"))}
                >
                  OTP Pending
                </Button>
              </Box>
            )}
            {profileId === userId && data?.pageData?.status === 3 && (
              <Box className={styles.closediv}>
                <p className={styles.pendingdiv}>Pending</p>
              </Box>
            )}
            {profileId === userId && data?.pageData?.status === 1 && (
              <Box className={styles.closediv}>
                <Button
                  className={styles.createbtn}
                  onClick={() => {
                    dispatch(setDashboardView("postprofile")),
                      dispatch(setSideView("companyPage"));
                    dispatch(setCompanyId(companyId));
                  }}
                >
                  Switch Post Acount
                </Button>
              </Box>
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
              <Typography color={dark} sx={{ fontWeight: "bold" }}>
                Posts
              </Typography>
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
              <Typography color={dark} sx={{ fontWeight: "bold" }}>
                Followers
              </Typography>
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
              <Typography color={dark} sx={{ fontWeight: "bold" }}>
                Followings
              </Typography>
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
              <Typography color={dark} sx={{ fontWeight: "bold" }}>
                Connections
              </Typography>
            </Box>
            <Box className={styles.postdiv}>
              {connectionList?.map((e, i) => {
                return (
                  <Followers
                    key={i}
                    id={e?.senderId}
                    fullName={e?.senderName}
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
