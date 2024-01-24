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

function CommentInputBox({ type, postData, replyId, insertAt }) {
  const { palette } = useTheme();
  const { userId } = useSelector((state) => state.profile.profileData);
  const dark = palette.neutral.dark;
  const currentUser = "juliusomo";
  const newId = 5;
  const [text, setText] = useState("");
  const inputField = useRef(null);
  const { mutate: insertComment, isloading: insertCommentLoading } =
    useInsertComment();
  const { mutate: insertReply, isloading: insertReplyLoading } =
    useInsertReply();
  useEffect(() => {
    if (insertCommentLoading || insertReplyLoading) {
      setText("");
    }
  }, [insertCommentLoading, insertReplyLoading]);
  function handleSubmit() {
    if (type === "comment") {
      const newComment = {
        postId: postData?._id,
        userId: userId,
        message: text,
      };
      setText("");
      return insertComment(newComment);
    } else if (type === "reply") {
      const newReply = {
        commentId: replyId?._id,
        userId: userId,
        message: text,
      };
      setText("");
      return insertReply(newReply);
    }
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
            <Box sx={{ display: "flex", width: "100%",alignItems:'center',mb:'5px' }}>
              <Avatar
                sx={{ width: 25, height: 25, mr: 1 }}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
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
                type={type}
                value={text}
              />
              <IconButton onClick={handleSubmit}>
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
