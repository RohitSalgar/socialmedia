import { Box } from '@mui/material';
import CommentAction from './CommentAction';
import { useSelector } from 'react-redux';

function CommentHeaderActions({ onReply, reply, commentAction, postData,commentId }) {
  const {userId} = useSelector((state) => state.profile.profileData)
  return (
    <Box className="header-right" sx={{ ml: { laptop: 3, mobile: 0 }, display: 'flex', alignItems: 'center' }}>

      {commentAction && <CommentAction type='reply' onClick={onReply} reply={reply} postData={postData}/>}
      {!commentAction && postData?.userReplied === userId && <CommentAction type='delete' onClick={onReply} delete={reply} postData={postData} commentId={commentId}/>}
      {commentAction && <CommentAction type='delete' onClick={onReply} reply={reply} postData={postData}/>}

    </Box>
  )
}

export default CommentHeaderActions