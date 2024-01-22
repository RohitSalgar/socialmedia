import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, useTheme } from '@mui/material';

import CommentHeader from './CommentHeader';
import CommentHeaderActions from './CommentHeaderActions';
import CommentInputBox from './CommentInputBox';
import DeleteDialog from './DeleteDialog';
import EditField from './EditField';

function CommentBox({ id, content, createdAt, user, replies, selected, setSelected, commentAction=true}) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [state, setState] = ( [
        {
          id: 1,
          content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
          createdAt: "May 02 2022",
          score: 5,
          user: "amyrobson",
          replies: []
        },
        {
          id: 2,
          content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
          createdAt: "May 16 2022",
          score: 5,
          user: "maxblagun",
          replies: [
            {
              id: 3,
              content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
              reatedAt: "May 23 2022",
              score: 4,
              user: "ramsesmiron",
              replyingTo: "maxblagun"
            },
            {
              id: 4,
              content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
              createdAt: "May 31 2022",
              score: 2,
              user: "juliusomo",
              replyingTo: "ramsesmiron"
            }
          ]}
        ]
  ); 
  const [editText, setEditText] = useState(content);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirmDelete = () => {
    const updatedComments = updateCommentContent(content, "\0");
    setState((prev) => ({ ...prev,  updatedComments }));
    setDialogOpen(false);
  };

  const handleEdit = () => setSelected(-id);
  const handleReply = () => setSelected(id);

  const handleEditTextChange = (e) => setEditText(e.target.value);

  const handleEditSubmit = () => {
    const updatedComments = updateCommentContent(content, editText);
    setState((prev) => ({ ...prev,  updatedComments }));
    setSelected(0);
  };

  const handleDelete = () => setDialogOpen(true);


  function updateCommentContent(originalContent, newContent) {
    const indices = findIndex(id);
    const updatedComments = [...state];

    if (indices.c !== -1 && indices.r === -1) {
      updatedComments[indices.c] = { ...updatedComments[indices.c], content: newContent };
    } else if (indices.r !== -1 && indices.c !== -1) {
      updatedComments[indices.c].replies[indices.r] = { ...updatedComments[indices.c].replies[indices.r], content: newContent };
    }

    return updatedComments;
  }

  function findIndex(id) {
    let indices = {
      c: -1,
      r: -1,
    };
  
    for (let cIndex = 0; cIndex < state.length; cIndex++) {
      const comment = state[cIndex];
  
      if (comment.id === id) {
        indices.c = cIndex;
        return indices;
      }
  
      indices.r = comment.replies.findIndex((r) => r.id === id);
      if (indices.r !== -1) {
        indices.c = cIndex;
        return indices;
      }
    }
  
    return indices;
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          mb:1,
          borderRadius: '4px',
          border: `1px solid ${dark}`,
          p: 1,
        }}
      >
        <Box sx={{ flexGrow: 1, ml: { laptop: 3, mobile: 0 } }}>
          <CommentHeader user={user} createdAt={createdAt} onDelete={handleDelete} onEdit={handleEdit} onReply={handleReply} reply={selected === id} edit={selected === -id} deleted={content === '\0'}  commentAction={commentAction}/>
          {content !== '\0' ? (
            selected === -id ? (
              <EditField defaultValue={content} onChange={handleEditTextChange} onSubmit={handleEditSubmit} />
            ) : (
              <Typography variant="body" sx={{ flexGrow: 1,mt:1 }} component="p">
                {content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Typography>
            )
          ) : (
            <Typography variant="deleted">This comment has been deleted.</Typography>
          )}
        
        </Box>
      </Box>
      {selected === id && <CommentInputBox type="reply" replyingTo={user} insertAt={findIndex(id).c} setSelected={setSelected}/>}
      {replies && replies.length > 0 && (
        <Box sx={{ display: 'flex', width: '96%', ml:3}}>
          <Box sx={{ width: '100%' }}>
            {replies.map((reply) => (
              <CommentBox key={reply.id} {...reply} selected={selected} setSelected={setSelected} commentAction={false} />
            ))}
          </Box>
        </Box>
      )}
      <DeleteDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} handleConfirmDelete={handleConfirmDelete}  />
    </>
  );
}

export default CommentBox;
