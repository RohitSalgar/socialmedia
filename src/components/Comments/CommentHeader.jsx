import React, { useEffect, useState } from 'react'
import { Box, Avatar, Typography, useTheme, IconButton } from '@mui/material';
import {
  DeleteOutlined,
} from "@mui/icons-material";

import CommentHeaderActions from './CommentHeaderActions';
import { useSelector } from 'react-redux';

function CommentHeader({ user, createdAt, onDelete, onEdit, onReply, reply, edit, deleted, commentAction, postData,commentId }) {
  const { userId } = useSelector((state) => state.profile.profileData)
  const currentUser = "julie";
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [date, setDate] = useState('');

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
      <Box sx={{ display: 'flex', height: 32, alignItems: 'center', justifyContent: 'space-between' }}>
        <Box className="header-left" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="avatar"
            sx={{ width: 32, height: 32 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {(userId === postData?.userId || userId === postData?.userReplied) ? 
                <Typography variant="you" sx={{ ml: 1, height: 18, py: '2px', px: '6px', lineHeight: 1, borderRadius: '3px', textTransform:"capitalize" }}>you</Typography>
            :
            <>
              <Typography color={dark} variant="fullName" textTransform={"capitalize"} fontWeight="400" sx={{ ml: 1 }}>{postData?.userInfo.fullName}</Typography>
              <Typography sx={{ ml: 1 }} textTransform={"capitalize"} color={dark} variant="designation" fontWeight="300">
                MERN stack Developer
              </Typography></> 

            }

          </Box>
        </Box>

        <CommentHeaderActions user={user} onDelete={onDelete} onEdit={onEdit} onReply={onReply} reply={reply} edit={edit} commentAction={commentAction} postData={postData} commentId={commentId}/>


      </Box>
    </>
  )
}

export default CommentHeader