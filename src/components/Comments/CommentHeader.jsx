import React, { useEffect,useState } from 'react'
import {Box,Avatar,Typography, useTheme} from '@mui/material';

import CommentHeaderActions from './CommentHeaderActions';


function CommentHeader({user,createdAt ,onDelete,onEdit,onReply, reply,edit, deleted,commentAction}) {
  const currentUser = "julie";
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [date,setDate] = useState('');

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
      <Box sx={{display: 'flex', height: 32, alignItems: 'center', justifyContent: 'space-between'}}>
        <Box className="header-left" sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <Avatar 
            alt="avatar"
            sx={{ width: 32, height: 32 }}   
          />
          <Typography variant="username" sx={{ml:2}}>{user}</Typography>
          {(user === currentUser) && <Typography variant="you" sx={{ml:1, height: 18,  py:'2px',px:'6px', lineHeight:1, borderRadius: '3px'}}>you</Typography>}
          <Typography variant="body" sx={{ml:2}}>{"24"}</Typography>
        </Box>
        
        {!deleted  &&
          <CommentHeaderActions user={user} onDelete={onDelete} onEdit={onEdit} onReply={onReply} reply={reply} edit={edit} commentAction={commentAction}/>
        }
        

      </Box>
    </>
  )
}

export default CommentHeader