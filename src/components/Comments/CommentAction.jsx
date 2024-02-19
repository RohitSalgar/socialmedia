import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { useDeleteComment, useDeleteReply } from "../../hooks/likeComment";
import { useDispatch, useSelector } from "react-redux";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  useDeletescheduleComments,
  useDeletescheduleReply,
} from "../../hooks/schedule";
import { useDeleteQaComment, useDeleteQaReply } from "../../hooks/qa";
import { setReplyInput } from "../../redux/slices/post";
import { useState } from "react";

function CommentAction({
  type,
  sx,
  onClick,
  reply,
  edit,
  postData,
  commentId,
}) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [isClicked, setIsClicked] = useState(false);
  const { userId } = useSelector((state) => state.profile.profileData);
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: deleteReply } = useDeleteReply();
  const dispatch = useDispatch();
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  const { mutate: deleteScheduleReply } = useDeletescheduleReply();
  const { mutate: deleteScheduleComments } = useDeletescheduleComments();
  const { mutate: deleteQaComments } = useDeleteQaComment();
  const { mutate: deleteQaReply } = useDeleteQaReply();
  const deleteComments = () => {
    if (!isClicked) {
      setIsClicked(true);
      if (Object.keys(postData).includes("userReplied")) {
        if (dashboardView === "qa") {
          return deleteQaReply({
            answerId: commentId,
            userId: userId,
            replyId: postData?._id,
          });
        }
        const payload = {
          commentId: commentId,
          replyId: postData?._id,
          userId: userId,
        };
        if (dashboardView === "schedule" || dashboardView === "postprofile") {
          return deleteScheduleReply(payload);
        } else {
          return deleteReply(payload);
        }
      } else {
        if (dashboardView === "qa") {
          return deleteQaComments({
            answerId: postData._id,
            userId: userId,
          });
        }
        const payload = {
          commentId: postData._id,
          userId: userId,
        };
        if (dashboardView === "schedule" || dashboardView === "postprofile") {
          return deleteScheduleComments(payload);
        } else {
          return deleteComment(payload);
        }
      }
    }
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  return (
    <>
      {type === "reply" && (
        <Box
          sx={{
            userSelect: "none",
            ...(reply && {
              "& *": {
                color: dark,
                fill: dark,
              },
            }),
            ...sx,
          }}
          onClick={onClick}
        >
          <IconButton onClick={() => dispatch(setReplyInput("true"))}>
            <ReplyIcon />
          </IconButton>
        </Box>
      )}
      {/* {(type === "edit") && 
        <Box 
          sx={{
            userSelect: 'none',
            ...(edit && {
              '& *':{
                color: dark, 
                fill: dark
              },
            }),
            ...sx
          }}
          onClick={onClick}
        >
          <Typography variant='primaryAction' sx={{ml: 1}}>Edit</Typography>
        </Box>
      } */}
      {type === "delete" && (
        <Box
          sx={{
            userSelect: "none",
            "&:active *": {
              color: dark,
              fill: dark,
            },
            ...sx,
          }}
          onClick={() => deleteComments()}
        >
          <IconButton>
            <DeleteOutlined />
          </IconButton>
        </Box>
      )}
    </>
  );
}

export default CommentAction;
