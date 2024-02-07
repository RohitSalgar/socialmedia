import {
  Box,
  Typography,
  Button,
  useTheme,
  CircularProgress,
} from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import Followers from "../Followers/Followers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetFollowList,
  useGetProfile,
  useGetFollowingList,
  useGetConnectionList,
  useGetMainUserFollowingList,
  useGetUserFollowList,
  useGetMainUserConnectionList,
} from "../../hooks/profile";
import Loader from "../Loader/Loader";
import PostWidget from "../../view/User/Private/Posts/PostWidget";
import { useGetMyPostList } from "../../hooks/posts";
import {
  setCompanyId,
  setDashboardView,
  setSideView,
  setViewCompanyId,
  setViewProfileId,
} from "../../redux/slices/profileSlice";
import LookingEmpty from "../LookingEmpty/LookingEmpty";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BusinessIcon from "@mui/icons-material/Business";
import { useChangeConnectionStatus, useSendFrdRequest } from "../../hooks/user";
import { toast } from "react-toastify";

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

  const { data: mainUserFollowList, isLoading: mainUserFollowListLoading } =
    useGetUserFollowList(userId);

  const { data: mainUserfollowingList, isLoading: mainUserfollowingLoading } =
    useGetMainUserFollowingList(userId);

  const { data: mainUserConnectionList, isLoading: mainUserConnectionLoading } =
    useGetMainUserConnectionList(userId);

  const frdRequestSentSuccess = (data) => {
    toast.success(data);
  };
  const { mutate: frdRequestMutate, isPending } = useSendFrdRequest(
    frdRequestSentSuccess
  );
  const unFollowSuccess = (data) => {
    toast.success(data);
  };
  const { mutate: unfollowMutate, isPending: isUnfollowPending } =
    useChangeConnectionStatus(unFollowSuccess);
  const companyId = data?.pageData?._id;

  if (
    isLoading ||
    followLoading ||
    followingLoading ||
    connectionLoading ||
    postLoading ||
    mainUserfollowingLoading ||
    mainUserConnectionLoading ||
    mainUserFollowListLoading
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
  const checkUserInConnection = (id, array) => {
    return (
      array &&
      array.some((item) => item.recipientId === id || item.senderId === id)
    );
  };

  const unFollowFn = () => {
    const connection = mainUserConnectionList.find(
      (item) => item.recipientId === profileId || item.senderId === profileId
    );
    if (connection === undefined) {
      const connection = mainUserfollowingList.find(
        (item) => item.recipientId === profileId || item.senderId === profileId
      );
      unfollowMutate({ id: connection._id, status: 0 });
    } else {
      unfollowMutate({ id: connection._id, status: 3 });
    }
    return 0;
  };

  const acceptFn = () => {
    const connection = mainUserFollowList.find(
      (item) => item.senderId === profileId
    );
    unfollowMutate({ id: connection._id, status: 1 });
    return 0;
  };

  const getRequestBtn = () => {
    if (
      mainUserConnectionList &&
      mainUserConnectionList.some(
        (item) =>
          item?.recipientId === profileId || item?.senderId === profileId
      )
    ) {
      return (
        <Button
          disabled={isUnfollowPending}
          variant="outlined"
          className={styles.editbtn}
        >
          {isUnfollowPending ? <CircularProgress /> : "Connected"}
        </Button>
      );
    } else if (
      mainUserfollowingList &&
      mainUserfollowingList.some((item) => item?.recipientId === profileId)
    ) {
      return (
        <Button
          disabled={isUnfollowPending}
          onClick={unFollowFn}
          variant="dark"
          className={styles.editbtn}
        >
          {isUnfollowPending ? <CircularProgress /> : "Unfollow"}
        </Button>
      );
    } else if (
      mainUserFollowList &&
      mainUserFollowList.some((item) => item?.senderId === profileId)
    ) {
      return (
        <Button
          disabled={isUnfollowPending}
          onClick={acceptFn}
          variant="dark"
          className={styles.editbtn}
        >
          {isUnfollowPending ? <CircularProgress /> : "Accept"}
        </Button>
      );
    } else {
      return (
        <Button
          disabled={isPending}
          onClick={() =>
            frdRequestMutate({
              senderId: userId,
              recipientId: profileId,
            })
          }
          variant="dark"
          className={styles.editbtn}
        >
          {isPending ? <CircularProgress /> : "Connect"}
        </Button>
      );
    }
  };

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
                    Connections
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
            {profileId !== userId && getRequestBtn()}
            {/* {profileId !== userId &&
              (mainUserfollowingList &&
              mainUserfollowingList.some(
                (item) => item?.recipientId === profileId
              ) ? (
                <Button
                  disabled={isUnfollowPending}
                  onClick={unFollowFn}
                  variant="dark"
                  className={styles.editbtn}
                >
                  {isUnfollowPending ? <CircularProgress /> : "Unfollow"}
                </Button>
              ) : (
                <Button
                  disabled={isPending}
                  onClick={() =>
                    frdRequestMutate({
                      senderId: userId,
                      recipientId: profileId,
                    })
                  }
                  variant="dark"
                  className={styles.editbtn}
                >
                  {isPending ? <CircularProgress /> : "Connect"}
                </Button>
              ))} */}
            {/* {profileId === userId && data?.pageData === null && (
              <Box className={styles.closediv}>
                <Button
                  variant="dark"
                  onClick={() => handleEdit()}
                  className={styles.editbtn}
                >
                  Edit Profile
                </Button>
              )} */}
            {profileId === userId && data?.pageData === null && (
              <Box className={styles.closediv}>
                <Button
                  className={styles.createbtn}
                  onClick={() => dispatch(setSideView("createcompany"))}
                >
                  Create Company Page
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
              <Box className={styles.pendingdivs}>
                <p className={styles.pendingdiv}>Pending</p>
              </Box>
            )}
            {profileId === userId && data?.pageData?.status === 1 && (
              <Box className={styles.closediv}>
                <Button
                  className={styles.createbtn}
                  onClick={() => {
                    dispatch(setDashboardView("postprofile"));
                    dispatch(setSideView("companyPage"));
                    dispatch(setCompanyId(companyId));
                    dispatch(setViewCompanyId(companyId));
                  }}
                >
                  Company Account
                </Button>
              </Box>
            )}
            {profileId === userId && data?.pageData?.status === 5 && (
              <Box className={styles.closediv}>
                <Button
                  className={styles.createbtn}
                  onClick={() => {
                    dispatch(setDashboardView("postprofile"));
                    dispatch(setSideView("companyPage"));
                    dispatch(setCompanyId(companyId));
                    dispatch(setViewCompanyId(companyId));
                  }}
                >
                  Company Account
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
        <hr />
        {viewList === "post" && (
          <Box>
            <Box>
              <Typography color={dark} sx={{ fontWeight: "bold" }}>
                Posts
              </Typography>
            </Box>
            <Box className={styles.postdiv}>
              {postList?.map((data) => (
                <PostWidget key={data._id} postData={data} page={"profile"} />
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
                Following
              </Typography>
            </Box>
            <Box className={styles.postdiv}>
              {followingList?.map((e, i) => {
                return (
                  <Followers
                    key={i}
                    id={e?.recipientId}
                    imgLink={""}
                    companyName={e.followerName}
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
                    imgLink={e?.senderProfile}
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
