import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { useDeleteComment, useDeleteReply } from "../../hooks/likeComment";
import { useSelector } from "react-redux";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  useDeletescheduleComments,
  useDeletescheduleReply,
} from "../../hooks/schedule";

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
  const { userId } = useSelector((state) => state.profile.profileData);
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: deleteReply } = useDeleteReply();
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  const { mutate: deleteScheduleReply } = useDeletescheduleReply();
  const { mutate: deleteScheduleComments } = useDeletescheduleComments();
  const deleteComments = () => {
    if (Object.keys(postData).includes("userReplied")) {
      const payload = {
        commentId: commentId,
        replyId: postData?._id,
        userId: userId,
      };
      if (dashboardView === "schedule") {
        return deleteScheduleReply(payload);
      } else {
        return deleteReply(payload);
      }
    } else {
      const payload = {
        commentId: postData._id,
        userId: userId,
      };
      if (dashboardView === "schedule") {
        return deleteScheduleComments(payload);
      } else {
        return deleteComment(payload);
      }
    }
  };

  console.log(postData, "post");

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
          <IconButton>
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
