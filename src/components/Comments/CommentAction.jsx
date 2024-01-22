import { Box, IconButton, Typography, useTheme } from '@mui/material';
import {
  DeleteOutlined,
} from "@mui/icons-material";
import { useDeleteComment } from '../../hooks/likeComment';
import { useSelector } from 'react-redux';

function CommentAction({ type, sx, onClick, reply, edit }) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const { mutate, isLoading } = useDeleteComment()
  const { userId } = useSelector((state) => state.profile.profileData)

  const deleteComment = () => {
    const postData = {
      commentId: "65aa28c270cdd307c3c34413",
      userId: userId
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
          <Typography variant='primaryAction' sx={{ ml: 1 }}>Reply</Typography>
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
          onClick={deleteComment}
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