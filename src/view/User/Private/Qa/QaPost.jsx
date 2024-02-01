import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import PostTitle from "./PostTitle";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import CommentBox from "../../../../components/QaAnswer/CommentBox";
import CommentInputBox from "../../../../components/Comments/CommentInputBox";
import { BsFillSendExclamationFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useReportPost } from "../../../../hooks/posts";
import { useGetQaComment, useQaLikeDisLike } from "../../../../hooks/qa";

const QaWidget = ({ postData }) => {
  const [isComments, setIsComments] = useState(false);
  const [postId, setPostId] = useState("");
  const [report, setReport] = useState(false);
  const [reportText, setReportText] = useState("");
  const [selected, setSelected] = useState(0); //0 for none, -id for edit, id for reply
  const [isLiked, setIsLiked] = useState(false);
  const { data: postComment, isLoading: postCommentLoading } =
    useGetQaComment(postId);
  const onSuccess = () => {
    setReport(false);
    setReportText("");
  };
  const { mutate, isLoading: reportPostLoading } = useReportPost(onSuccess);
  const { mutate: likeMutate, isLoading: likeDislikeLoadingLoading } =
    useQaLikeDisLike(onSuccess);
  const { userId } = useSelector((state) => state.profile.profileData);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  useEffect(() => {
    setIsLiked(postData?.likedBy.includes(userId));
  }, [userId]);

  function addIdsToComments(data, parentId = null) {
    let count = 1;
    if (data != null) {
      return data.map((comment, index) => {
        data[index].id = count;
        count++;
        if (comment.replies.length > 0) {
          for (let i = 0; i < data[index].replies.length; i++) {
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
  const reportPost = () => {
    const payload = {
      postId: postData._id,
      userId: userId,
      reason: reportText,
    };
    mutate(payload);
  };

  if (postCommentLoading) {
    return;
  }

  const likeDislike = () => {
    if (!isLiked) {
      const payload = {
        questionId: postData._id,
        userId: userId,
        status: 1,
      };
      likeMutate(payload);
      setIsLiked(true);
    } else {
      const payload = {
        questionId: postData._id,
        userId: userId,
        status: 2,
      };
      likeMutate(payload);
      setIsLiked(false);
    }
  };

  return (
    <WidgetWrapper m="0.3rem 0">
      <PostTitle data={postData} />
      <Typography color={main} sx={{ mt: "0.5rem", ml: 1 }}>
        Question : {postData?.question}
      </Typography>
      {postData.files != "null" &&
       <img
        width="100%"
        height="auto"
        alt="post"
        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        src={postData.files}
      />
      }
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={likeDislike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>
              {postData?.likes <= 1
                ? `${postData?.likes} like`
                : `${postData?.likes} likes`}
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <Box
              onClick={() => {
                setPostId(postData?._id);
                setIsComments(!isComments);
              }}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography sx={{ cursor: "pointer" }}>{"View Answer"}</Typography>
            </Box>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <Box
              onClick={() => {
                setReport(!report);
              }}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            ></Box>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      {report && (
        <FlexBetween gap="5px">
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={1}
            variant="standard"
            placeholder="Reason To Report..."
            sx={{
              width: "100%",
              mt: 1,
              borderRadius: "1rem",
            }}
            onChange={(e) => setReportText(e.target.value)}
            // type={type}
          />
          {reportText && (
            <IconButton onClick={reportPost}>
              <BsFillSendExclamationFill size={25} />
            </IconButton>
          )}
        </FlexBetween>
      )}
      {isComments && (
        <Box mt="0.5rem">
          <Box>
            <Divider />
            <Stack>
              <CommentInputBox type="comment" postData={postData} />
              {addIdsToComments(postComment)?.map((c) => {
                return (
                  <CommentBox
                    key={c.id}
                    postData={c}
                    selected={selected}
                    setSelected={setSelected}
                    reorderedComments={addIdsToComments(postComment)}
                    {...c}
                  />
                );
              })}
            </Stack>
          </Box>
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default QaWidget;
