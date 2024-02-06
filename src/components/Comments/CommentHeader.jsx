import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, useTheme, IconButton } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import moment from "moment";
import CommentHeaderActions from "./CommentHeaderActions";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.css";
import { useGetProfile } from "../../hooks/profile";
import {
  setViewProfileId,
  setDashboardView,
} from "../../redux/slices/profileSlice";
function CommentHeader({
  user,
  createdAt,
  onDelete,
  onEdit,
  onReply,
  reply,
  edit,
  deleted,
  commentAction,
  postData,
  commentId,
}) {
  const { userId } = useSelector((state) => state.profile.profileData);
  const { data: profiledate, isLoading: profileLoading } =
    useGetProfile(userId);
  const currentUser = "julie";
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  // const relativeTime = new RelativeTime();
  // useEffect(()=> {
  //   setDate(relativeTime.from(new Date(createdAt)))
  //   const interval = setInterval(()=> {
  //     setDate(relativeTime.from(new Date(createdAt)))
  //   },5000)
  //   return () => clearInterval(interval)
  // },[createdAt])
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: 32,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          className="header-left"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          {/* <Avatar alt="avatar" sx={{ width: 25, height: 25 }} /> */}
          <span
            style={{
              display: "inline-block",
              width: 25,
              height: 25,
              marginRight: 1,
              backgroundColor: "#bdbdbd",
              borderRadius: "50%",
              textAlign: "center",
              lineHeight: "25px",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(setViewProfileId(postData.userId));
              dispatch(setDashboardView("profile"));
            }}
          >
            {postData.userInfo.fullName.charAt(0).toUpperCase()}
          </span>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              dispatch(setViewProfileId(postData.userId));
              dispatch(setDashboardView("profile"));
            }}
          >
            {userId === postData?.userId || userId === postData?.userReplied ? (
              <Typography
                variant="you"
                sx={{
                  ml: 1,
                  height: 18,
                  py: "2px",
                  px: "6px",
                  lineHeight: 1,
                  borderRadius: "3px",
                }}
              >
                you
              </Typography>
            ) : (
              <Box className={styles.textdiv}>
                <Typography
                  color={dark}
                  variant="fullName"
                  fontWeight="400"
                  sx={{ ml: 1 }}
                >
                  {postData?.userInfo?.fullName}
                </Typography>
                <Typography
                  color={dark}
                  variant="designation"
                  fontWeight="300"
                  fontSize="12px"
                  paddingRight={1}
                >
                  ({postData?.userInfo?.designation})
                </Typography>
              </Box>
            )}
          </Box>
          <Typography color={medium} fontSize="0.70rem">
            {moment(postData.commentedOn).format("MMM Do YYYY, h:mm a")}
          </Typography>
        </Box>

        <CommentHeaderActions
          user={user}
          onDelete={onDelete}
          onEdit={onEdit}
          onReply={onReply}
          reply={reply}
          edit={edit}
          commentAction={commentAction}
          postData={postData}
          commentId={commentId}
        />
      </Box>
    </>
  );
}

export default CommentHeader;
