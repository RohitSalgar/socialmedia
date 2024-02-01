import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";

import InputField from "./InputField";
import { useInsertComment, useInsertReply } from "../../hooks/likeComment";
import { useSelector } from "react-redux";
import {
  useReplyPostComment,
  useUpdatePostComment,
} from "../../hooks/schedule";
import { useInsertQaComment, useInsertQaReply } from "../../hooks/qa";
import { useGetProfile } from "../../hooks/profile";
import Loader from "../Loader/Loader";
function CommentInputBox({ type, postData, replyId, insertAt, scheduleId }) {
  const { palette } = useTheme();
  const { userId } = useSelector((state) => state.profile.profileData);
  const dark = palette.neutral.dark;
  const currentUser = "juliusomo";
  const newId = 5;
  const [text, setText] = useState("");
  const inputField = useRef(null);
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  const { data: profiledate, isLoading: profileLoading } =
    useGetProfile(userId);
  const { mutate: insertComment, isloading: insertCommentLoading } =
    useInsertComment();
  const { mutate: commentMutate } = useUpdatePostComment();
  const { mutate: mutateQaComment } = useInsertQaComment();
  const { mutate: insertReply, isloading: insertReplyLoading } =
    useInsertReply();
  const { mutate: insertScheduleReply } = useReplyPostComment();
  const { mutate: insertQaReply } = useInsertQaReply();
  useEffect(() => {
    if (insertCommentLoading || insertReplyLoading) {
      setText("");
    }
  }, [insertCommentLoading, insertReplyLoading]);
  function handleSubmit() {
    if (type === "comment") {
      if (dashboardView === "schedule") {
        const newComment = {
          scheduleId,
          userId: userId,
          message: text,
        };
        setText("");
        return commentMutate(newComment);
      } else if (dashboardView === "qa") {
        const newComment = {
          questionId: postData?._id,
          userId,
          answer: text,
        };
        setText("");
        return mutateQaComment(newComment);
      } else {
        const newComment = {
          postId: postData?._id,
          userId,
          message: text,
        };
        setText("");
        return insertComment(newComment);
      }
    } else if (type === "reply") {
      if (dashboardView === "qa") {
        setText("");
        return insertQaReply({
          answerId: replyId?._id,
          userId: userId,
          message: text,
        });
      }
      const newReply = {
        commentId: replyId?._id,
        userId: userId,
        message: text,
      };
      setText("");
      if (dashboardView === "schedule") {
        return insertScheduleReply(newReply);
      } else {
        return insertReply(newReply);
      }
    }
  }
  if (profileLoading) {
    return <Loader />;
  }
  console.log(profiledate, "pd");
  return (
    <>
      <Box
        id={type === "reply" ? "replyBox" : ""}
        sx={{
          display: { laptop: "flex", mobile: "block" },
          width: "100%",
          borderRadius: "4px",
          mt: 1,
        }}
      >
        {
          <>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                mb: "5px",
              }}
            >
              {/* <Avatar
                sx={{ width: 25, height: 25, mr: 1 }}
                src={profiledate.userData.fullName.charAt(0)}
              /> */}
              <span
                style={{
                  display: "inline-block",
                  width: 30,
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
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={1}
                variant="standard"
                placeholder="Comment Your Thought..."
                sx={{
                  width: "100%",
                  mt: 1,
                  // backgroundColor: palette.neutral.light,
                  borderRadius: "1rem",
                }}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                type={type}
                value={text}
              />
              <IconButton type="submit" onClick={handleSubmit} disabled={!text.trim()}>
                <IoIosSend size={25} />
              </IconButton>
            </Box>
          </>
        }
      </Box>
    </>
  );
}

export default CommentInputBox;
