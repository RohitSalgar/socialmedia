import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";

import CommentHeader from "../Comments/CommentHeader";
import CommentInputBox from "../Comments/CommentInputBox";
import DeleteDialog from "../Comments/DeleteDialog";
import EditField from "../Comments/EditField";
import { useGetPostComment } from "../../hooks/likeComment";
import styles from "./index.module.css";

function CommentBox({
  id,
  answer,
  message,
  createdAt,
  user,
  replies,
  selected,
  setSelected,
  reorderedComments,
  commentAction = true,
  postData,
  commentId,
}) {
  let data
  if(message != null){
    data = message
  }else{
    data = answer
  }
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [editText, setEditText] = useState(data);
  const [replyId, setReplyId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirmDelete = () => {
    const updatedComments = updateCommentanswer(data, "\0");
    setState((prev) => ({ ...prev, updatedComments }));
    setDialogOpen(false);
  };

  const handleEdit = () => setSelected(-id);
  const handleReply = () => setSelected(id);

  const handleEditTextChange = (e) => setEditText(e.target.value);

  const handleEditSubmit = () => {
    const updatedComments = updateCommentanswer(data, editText);
    setState((prev) => ({ ...prev, updatedComments }));
    setSelected(0);
  };

  const handleDelete = () => setDialogOpen(true);

  function updateCommentanswer(originalanswer, newanswer) {
    const indices = findIndex(id);
    const updatedComments = [...reorderedComments];

    if (indices.c !== -1 && indices.r === -1) {
      updatedComments[indices.c] = {
        ...updatedComments[indices.c],
        data: newanswer,
      };
    } else if (indices.r !== -1 && indices.c !== -1) {
      updatedComments[indices.c].replies[indices.r] = {
        ...updatedComments[indices.c].replies[indices.r],
        data: newanswer,
      };
    }

    return updatedComments;
  }
  function findIndex(id) {
    let indices = {
      c: -1,
      r: -1,
    };

    for (let cIndex = 0; cIndex < reorderedComments.length; cIndex++) {
      const comment = reorderedComments[cIndex];
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
          display: "flex",
          width: "100%",
          mb: 1,
          borderRadius: "10px",
          background: "#e0ce8854",
          p: 1,
        }}
      >
        <Box sx={{ flexGrow: 1, ml: { laptop: 3, mobile: 0 } }}>
          <CommentHeader
            onDelete={handleDelete}
            onEdit={handleEdit}
            onReply={handleReply}
            reply={selected === id}
            edit={selected === -id}
            deleted={data === "\0"}
            commentAction={commentAction}
            postData={postData}
            commentId={commentId}
          />
          {data !== "\0" ? (
            selected === -id ? (
              <EditField
                defaultValue={data}
                onChange={handleEditTextChange}
                onSubmit={handleEditSubmit}
              />
            ) : (
              <Typography
                variant="body"
                sx={{ flexGrow: 1, mt: 1, ml: 1 }}
                component="p"
              >
                {data.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Typography>
            )
          ) : (
            <Typography variant="deleted">
              This comment has been deleted.
            </Typography>
          )}
        </Box>
      </Box>
      {selected === id && (
        <CommentInputBox
          type="reply"
          replyingTo={user}
          insertAt={findIndex(id).c}
          setSelected={setSelected}
          replyId={postData}
        />
      )}
      {replies && replies.length > 0 && (
        <Box sx={{ display: "flex", width: "94%", ml: 4 }}>
          <Box sx={{ width: "100%" }} className={styles.repliesdiv}>
            {replies.map((reply) => {
              console.log(reply,"reply")
              return <CommentBox
                key={reply.id}
                {...reply}
                selected={selected}
                setSelected={setSelected}
                commentAction={false}
                postData={reply}
                commentId={postData?._id}
              />
            })}
          </Box>
        </Box>
      )}
      <DeleteDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default CommentBox;
