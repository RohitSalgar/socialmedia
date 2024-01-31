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
import { useGetProfile } from "../../hooks/profile";
import Loader from "../Loader/Loader";
import PostWidget from "../../view/User/Private/Posts/PostWidget";
import { useGetMyPagePostList, usePostUnfollow } from "../../hooks/posts";
import {
  setDashboardView,
  setViewCompanyId,
  setViewProfileId,
} from "../../redux/slices/profileSlice";
import LookingEmpty from "../LookingEmpty/LookingEmpty";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useGetCompanyProfile, useGetPageFollowList } from "../../hooks/pages";
import ProfileScheduleList from "../ProfileScheduleList/ProfileScheduleList";
import { useFollowTopPage } from "../../hooks/user";

const PostProfile = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [viewList, setViewList] = useState("schedule");
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const userId = useSelector((state) => state.profile.profileData.userId);
  const profileId = useSelector((state) => state.profile.viewProfileId);
  const profileCompanyId = useSelector((state) => state.profile.viewCompanyId);
  const companyId = useSelector((state) => state.profile.companyId);
  const { data, isLoading } = useGetProfile(profileId);
  const { data: followList, isLoading: followLoading } = useGetPageFollowList(
    profileCompanyId,
    viewList
  );
  const { mutate: pageFollowMutate, isPending } = useFollowTopPage();
  const { mutate: pageUnFollowMutate, isPending: pagetUnfollowPending } =
    usePostUnfollow();
  const { data: companyData, isLoading: companyLoading } =
    useGetCompanyProfile(profileCompanyId);
  const { data: postList, isLoading: postLoading } = useGetMyPagePostList(
    profileCompanyId,
    userId,
    viewList
  );

  if (isLoading || followLoading || postLoading || companyLoading) {
    <Loader />;
  }

  function checkIsNumber(number) {
    if (number != null) {
      return number;
    }
    return 0;
  }

  function handleClick() {
    dispatch(setViewProfileId(userId));
    dispatch(setDashboardView("profile"));
    dispatch(setViewCompanyId(companyId));
  }

  const pageUnFollowFn = () => {
    let pageData = followList.find((item) => item.followerId === userId);
    pageUnFollowMutate({ id: pageData?._id });
  };

  return (
    <WidgetWrapper>
      {(profileId !== userId || companyId !== profileCompanyId) && (
        <Box className={styles.closediv}>
          <Button className={styles.closebtn} onClick={() => handleClick()}>
            <CloseRoundedIcon />
          </Button>
        </Box>
      )}
      <Box className={styles.profilemain}>
        <Typography color={medium} m="0.5rem 0">
          <Box className={styles.avatardiv}>
            <Avatar
              alt="B"
              src={companyData?.companyPageData?.profile}
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
                  onClick={() => setViewList("schedule")}
                >
                  <Typography color={dark} variant="h5" fontWeight="500">
                    {checkIsNumber(companyData?.countData?.scheduleCount)}
                  </Typography>
                  <Typography color={dark} variant="h6" fontWeight="400">
                    Schedules
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
                  onClick={() => setViewList("post")}
                >
                  <Typography color={dark} variant="h5" fontWeight="500">
                    {checkIsNumber(companyData?.countData?.postCount)}
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
                    {checkIsNumber(companyData?.countData?.followCount)}
                  </Typography>
                  <Typography color={dark} variant="h6" fontWeight="400">
                    Followers
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={styles.nameandeditdiv}>
            <Typography color={dark} className={styles.avatarname}>
              {companyData?.companyPageData?.companyName}
            </Typography>
            {companyId != profileCompanyId && (
              <>
                {followList &&
                followList.some((item) => item.followerId === userId) ? (
                  <Button
                    variant="outlined"
                    disabled={pagetUnfollowPending}
                    className={styles.createbtn}
                    onClick={pageUnFollowFn}
                  >
                    {pagetUnfollowPending ? <CircularProgress /> : "UnFollow"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={isPending}
                    className={styles.createbtn}
                    onClick={() =>
                      pageFollowMutate({
                        companyId: profileCompanyId,
                        followerId: userId,
                      })
                    }
                  >
                    {isPending ? <CircularProgress /> : "Follow"}
                  </Button>
                )}
              </>
            )}
            {profileId === userId &&
              data?.pageData?.status === 1 &&
              companyId === profileCompanyId && (
                <Box className={styles.closediv}>
                  <Button
                    className={styles.createbtn}
                    onClick={() => dispatch(setDashboardView("profile"))}
                  >
                    Switch Personal Acount
                  </Button>
                </Box>
              )}
          </Box>
          <Typography
            variant="h6"
            fontWeight="400"
            style={{
              paddingTop: "10px",
              textTransform: "capitalize",
            }}
          >
            {companyData?.companyPageData?.about}
          </Typography>
        </Typography>
        {viewList === "schedule" && (
          <Box>
            <Box>
              <Typography color={dark} sx={{ fontWeight: "bold" }}>
                Schedules
              </Typography>
            </Box>
            <Box className={styles.postdiv}>
              <ProfileScheduleList />
              {companyData?.countData?.scheduleCount === 0 && <LookingEmpty />}
            </Box>
          </Box>
        )}
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
                    type="companyfollowers"
                  />
                );
              })}
              {followList?.length === 0 && <LookingEmpty />}
            </Box>
          </Box>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default PostProfile;
