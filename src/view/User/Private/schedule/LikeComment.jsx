import { useEffect, useState } from "react";
import FlexBetween from "../../../../components/FlexBetween";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import {
  useGetAllMyCommentAndReply,
  useUpdateScheduleLikes,
} from "../../../../hooks/schedule";
import { useSelector } from "react-redux";
import Loader from "../../../../components/Loader/Loader";
import CommentInputBox from "../../../../components/Comments/CommentInputBox";
import CommentBox from "../../../../components/Comments/CommentBox";
import styles from "./index.module.css";
import {CancelOutlined} from "@mui/icons-material";

const LikeComment = (props) => {
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const [isComments, setIsComments] = useState(false);
  const [selected, setSelected] = useState(0); //0 for none, -id for edit, id for reply
  const [isLiked, setIsLiked] = useState(false);

  const { mutate } = useUpdateScheduleLikes();
  const { data: commentReplyData, isLoading: commentReplyLoading } =
    useGetAllMyCommentAndReply(props?.scheduleId);

  const { userId } = useSelector((state) => state.profile.profileData);

  useEffect(() => {
    setIsLiked(props?.postData.likedBy.includes(userId));
  }, [userId]);

  const likemutate = () => {
    if (!isLiked) {
      const payload = {
        scheduleId: props?.scheduleId,
        userId: userId,
        status: 1,
      };
      mutate(payload);
      setIsLiked(true);
    }
  };

  const disLikemutate = () => {
    if (isLiked) {
      const payload = {
        scheduleId: props?.scheduleId,
        userId: userId,
        status: 2,
      };
      mutate(payload);
      setIsLiked(false);
    }
  };

  if (commentReplyLoading) {
    return <Loader />;
  }

  function addIdsToComments(commentReplyData, parentId = null) {
    let count = 1;
    if (commentReplyData != null) {
      return commentReplyData.map((comment, index) => {
        commentReplyData[index].id = count;
        count++;
        if (comment.replies.length > 0) {
          for (let i = 0; i < commentReplyData[index].replies.length; i++) {
            comment.replies[i].id = count;
            count++;
          }
        }

        return comment;
      });
    } else {
      return [];
    }
  }

  const isUserLiked = () => {
    let data = props?.postData.likedBy;
    return data.filter((i) => {
      return i === userId;
    });
  };

  return (
    <Box gap="1rem">
      <Box className={styles.likeandcommentdiv}>
        <Box className={styles.likediv}>
          {isUserLiked().length > 0 ? (
            <IconButton className={styles.likeicons}>
              <FavoriteOutlined
                sx={{ color: primary }}
                onClick={() => disLikemutate()}
              />
            </IconButton>
          ) : (
            <IconButton className={styles.likeicons}>
              <FavoriteBorderOutlined onClick={() => likemutate()} />
            </IconButton>
          )}

          <Typography>
            {props?.postData?.likes <= 1
              ? `${props?.postData?.likes} like`
              : `${props?.postData?.likes} likes`}
          </Typography>
        </Box>
        <FlexBetween gap="0.3rem">
          <Box
            onClick={() => {
              setIsComments(!isComments);
            }}
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <IconButton>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography sx={{ cursor: "pointer" }}>{"comments"}</Typography>
          </Box>
        </FlexBetween>
      </Box>
      {isComments && (
        <Box mt="0.5rem">
          <Divider />
          <Box>
            {isComments && (
              <Box mt="0.5rem">
                <Box>
                  <Divider />
                  <Box
                onClick={() => {
                  setIsComments(false);
                }}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:"end"
                }}
              >
                <IconButton>
                  <CancelOutlined />
                </IconButton>
                <Typography sx={{ cursor: "pointer" }}>{"close"}</Typography>
              </Box>
                  <Stack>
                    <CommentInputBox
                      type="comment"
                      postData={commentReplyData}
                      scheduleId={props?.scheduleId}
                    />
                    {addIdsToComments(commentReplyData)?.map((c) => {
                      return (
                        <CommentBox
                          key={c.id}
                          postData={c}
                          selected={selected}
                          setSelected={setSelected}
                          reorderedComments={addIdsToComments(commentReplyData)}
                          {...c}
                        />
                      );
                    })}
                  </Stack>
                </Box>
                <Divider />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LikeComment;
