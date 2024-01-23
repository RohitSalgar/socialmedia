import { Box, IconButton, Typography, useTheme } from '@mui/material';
import {
  DeleteOutlined,
} from "@mui/icons-material";
import { useDeleteComment, useDeleteReply } from '../../hooks/likeComment';
import { useSelector } from 'react-redux';
import ReplyIcon from '@mui/icons-material/Reply';

function CommentAction({ type, sx, onClick, reply, edit, postData,commentId }) {
  console.log(commentId)
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const { userId } = useSelector((state) => state.profile.profileData)
  const { mutate: deleteComment } = useDeleteComment()
  const { mutate: deleteReply } = useDeleteReply()
  const deleteComments = () => {
    if (Object.keys(postData).includes("userReplied")) {
      console.log(postData)
      const payload = {
        commentId: commentId,
        replyId:postData?._id,
        userId: userId
      }
      deleteReply(payload)

    } else {
      const postData = {
        commentId: id._id,
        userId: userId
      }
      deleteComment(postData)
    }
  }

  return (
    <>
      {(type === "reply") &&
        <Box
          sx={{
            userSelect: 'none',
            ...(reply && {
              '& *': {
                color: dark,
                fill: dark,
              }
            }),
            ...sx
          }}
          onClick={onClick}
        >
          <IconButton
          >
            <ReplyIcon />
          </IconButton>
        </Box>
      }
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
      {(type === "delete") &&
        <Box
          sx={{
            userSelect: 'none',
            '&:active *': {
              color: dark,
              fill: dark
            },
            ...sx
          }}
          onClick={() => deleteComments()}
        >
          <IconButton
          >
            <DeleteOutlined />
          </IconButton>
        </Box>
      }
    </>
  )
}

export default CommentAction