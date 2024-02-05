import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";

import CommentHeader from "./CommentHeader";
import CommentHeaderActions from "./CommentHeaderActions";
import CommentInputBox from "./CommentInputBox";
import DeleteDialog from "./DeleteDialog";
import EditField from "./EditField";
import { useGetPostComment } from "../../hooks/likeComment";
import styles from "./index.module.css";
import { useSelector } from "react-redux";

function CommentBox({
  id,
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
  type,
}) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [editText, setEditText] = useState(message);
  const [replyId, setReplyId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { userId } = useSelector((state) => state.profile.profileData);

  const handleConfirmDelete = () => {
    const updatedComments = updateCommentmessage(message, "\0");
    setState((prev) => ({ ...prev, updatedComments }));
    setDialogOpen(false);
  };

  const handleEdit = () => setSelected(-id);
  const handleReply = () => setSelected(id);

  const handleEditTextChange = (e) => setEditText(e.target.value);

  const handleEditSubmit = () => {
    const updatedComments = updateCommentmessage(message, editText);
    setState((prev) => ({ ...prev, updatedComments }));
    setSelected(0);
  };

  const handleDelete = () => setDialogOpen(true);

  function updateCommentmessage(originalmessage, newmessage) {
    const indices = findIndex(id);
    const updatedComments = [...reorderedComments];

    if (indices.c !== -1 && indices.r === -1) {
      updatedComments[indices.c] = {
        ...updatedComments[indices.c],
        message: newmessage,
      };
    } else if (indices.r !== -1 && indices.c !== -1) {
      updatedComments[indices.c].replies[indices.r] = {
        ...updatedComments[indices.c].replies[indices.r],
        message: newmessage,
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
            deleted={message === "\0"}
            commentAction={commentAction}
            postData={postData}
            commentId={commentId}
          />
          {message !== "\0" ? (
            selected === -id ? (
              <EditField
                defaultValue={message}
                onChange={handleEditTextChange}
                onSubmit={handleEditSubmit}
              />
            ) : (
              <Typography
                variant="body"
                sx={{ flexGrow: 1, mt: 1, ml: 1 }}
                component="p"
              >
                {message.split("\n").map((line, i) => (
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
              return (
                <CommentBox
                  key={reply.id}
                  {...reply}
                  selected={selected}
                  setSelected={setSelected}
                  commentAction={false}
                  postData={reply}
                  commentId={postData?._id}
                  type={"reply"}
                />
              );
            })}
          </Box>
        </Box>
      )}
      {}
      <DeleteDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default CommentBox;
