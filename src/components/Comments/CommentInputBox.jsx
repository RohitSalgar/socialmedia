import { Avatar, Box, IconButton, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";

import InputField from "./InputField";
import { useInsertComment, useInsertReply } from "../../hooks/likeComment";
import { useDispatch, useSelector } from "react-redux";
import {
  useReplyPostComment,
  useUpdatePostComment,
} from "../../hooks/schedule";
import { useInsertQaComment, useInsertQaReply } from "../../hooks/qa";
import { useGetProfile } from "../../hooks/profile";
import Loader from "../Loader/Loader";
import { setReplyInput } from "../../redux/slices/post";
import { AVATAR_COLORS } from "../../assets/avatarBgColors";
import styles from "./index.module.css";

function CommentInputBox({ type, postData, replyId, insertAt, scheduleId }) {
  const { palette } = useTheme();
  const { userId } = useSelector((state) => state.profile.profileData);
  const dark = palette.neutral.dark;
  const currentUser = "juliusomo";
  const newId = 5;
  const [text, setText] = useState("");
  const inputField = useRef(null);
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  const { replyInput } = useSelector((state) => state.post);
  const dispatch = useDispatch();
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
      if (dashboardView === "schedule" || dashboardView === "postprofile") {
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
        dispatch(setReplyInput("false"));
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
      if (dashboardView === "schedule" || dashboardView === "postprofile") {
        dispatch(setReplyInput("false"));
        return insertScheduleReply(newReply);
      } else {
        dispatch(setReplyInput("false"));
        return insertReply(newReply);
      }
    }
  }
  const coloredAvatars =
    AVATAR_COLORS[profiledate?.userData?.fullName?.charAt(0).toUpperCase()];
  if (profileLoading) {
    return <Loader />;
  }

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

              {type === "reply" && replyInput === "true" && (
                <Box className={styles.commentinputdiv}>
                  <Avatar
                    style={{
                      backgroundColor: coloredAvatars,
                      borderRadius: "50%",
                      width: 30,
                      height: 30,
                      fontSize: "12px",
                    }}
                  >
                    {profiledate?.userData?.fullName?.includes("")
                      ? profiledate?.userData?.fullName
                          ?.split(" ")
                          .map((name) => name.charAt(0).toUpperCase())
                          .join("")
                      : profiledate?.userData?.fullName
                          ?.charAt(0)
                          .toUpperCase()}
                  </Avatar>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    placeholder={"Reply your Thought"}
                    sx={{
                      width: "100%",

                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                      },
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
                  <IconButton
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!text.trim()}
                    className={styles.commentbtn}
                  >
                    <IoIosSend size={25} />
                  </IconButton>
                </Box>
              )}
              {type !== "reply" && (
                <Box className={styles.commentinputdiv}>
                  <Avatar
                    style={{
                      backgroundColor: coloredAvatars,
                      borderRadius: "50%",
                      width: 30,
                      height: 30,
                      fontSize: "12px",
                    }}
                  >
                    {profiledate?.userData?.fullName?.includes("")
                      ? profiledate?.userData?.fullName
                          ?.split(" ")
                          .map((name) => name.charAt(0).toUpperCase())
                          .join("")
                      : profiledate?.userData?.fullName
                          ?.charAt(0)
                          .toUpperCase()}
                  </Avatar>
                  <TextField
                    // id="outlined-multiline-static"
                    className={styles.commentinput}
                    placeholder={"Comment your Thought"}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                      },
                    }}
                    type={type}
                    value={text}
                  />
                  <IconButton
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!text.trim()}
                    className={styles.commentbtn}
                  >
                    <IoIosSend size={25} />
                  </IconButton>
                </Box>
              )}
            </Box>
          </>
        }
      </Box>
    </>
  );
}

export default CommentInputBox;
