import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, useTheme, IconButton } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";

import CommentHeaderActions from "./CommentHeaderActions";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { useGetProfile } from "../../hooks/profile";

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
  const [date, setDate] = useState("");

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
            }}
          >
            {profiledate.userData.fullName.charAt(0).toUpperCase()}
          </span>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
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
                  textTransform={"capitalize"}
                  color={dark}
                  variant="designation"
                  fontWeight="300"
                  fontSize="12px"
                >
                  ({postData?.userInfo?.designation})
                </Typography>
              </Box>
            )}
          </Box>
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
