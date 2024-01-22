import { Box } from '@mui/material';
import React from 'react'
import CommentAction from './CommentAction';

function CommentHeaderActions({user,onDelete,onEdit,onReply, reply,edit,commentAction}) {
  const currentUser = "juliusomo";
  return (
    <Box className="header-right" sx={{ml: {laptop: 3, mobile: 0}, display: 'flex', alignItems: 'center'}}>
      {(user === currentUser) ? 
        <>
          <CommentAction type='delete' onClick={onDelete}/> 
          <CommentAction type='edit' sx={{ml: 3}} onClick={onEdit} edit={edit}/>
        </> 
        :
        (commentAction) && <CommentAction type='reply' onClick={onReply} reply={reply} />
      }
    </Box>
  )
}

export default CommentHeaderActions