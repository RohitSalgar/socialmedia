import { Avatar, Box, Button, IconButton, TextField, useTheme } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { IoIosSend } from "react-icons/io";

import InputField from './InputField'
import { useInsertComment } from '../../hooks/likeComment';
import { useSelector } from 'react-redux';

function CommentInputBox({ type, postData }) {
  const { palette } = useTheme();
  const { userId } = useSelector((state) => state.profile.profileData)
  const dark = palette.neutral.dark;
  const currentUser = "juliusomo"
  const newId = 5;
  const [text, setText] = useState("");
  const inputField = useRef(null);

  const { mutate, isloading } = useInsertComment()

  function handleSubmit() {
    console.log(text, userId, postData)
    if (type === 'comment') {
      const newComment = {
        postId: postData?._id,
        userId: userId,
        message: text,
      }
      return mutate(newComment);
    } else if (type === 'reply') {
      const updatedComments = state.comments;
      const newReply = {
        id: newId,
        content: text,
        createdAt: new Date().toString(),
        score: 0,
        user: currentUser,
        replyingTo: replyingTo
      }
      updatedComments[insertAt].replies.push(newReply);
      setState(prev => { return { ...prev, newId: newId + 1, comments: updatedComments } })
      setSelected(0);
    }

  }

  return (
    <>
      <Box
        id={type === 'reply' ? 'replyBox' : ''}
        sx={{
          display: { laptop: 'flex', mobile: 'block' },
          width: '100%',
          borderRadius: "4px",
          mt: 1,
        }}
      >
        {
          <>
            <Box sx={{ display: 'flex', width: '100%', }}>
              <Avatar sx={{ width: 40, height: 40, mr: 1 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={1}
                variant='standard'
                placeholder="Comment Your Thought..."
                sx={{
                  width: "100%",
                  mt: 1,
                  // backgroundColor: palette.neutral.light,
                  borderRadius: "1rem",
                }}
                onChange={(e) => setText(e.target.value)}
                type={type}
              />
              <IconButton
                onClick={handleSubmit}
              >
                <IoIosSend size={30} />
              </IconButton>
            </Box>
          </>
        }
      </Box>
    </>
  )
}

export default CommentInputBox