import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
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
import { useState } from "react";
import { Stack } from "@mui/material";
import CommentBox from "../../../../components/Comments/CommentBox";
import CommentInputBox from "../../../../components/Comments/CommentInputBox";
import {
  useGetPostComment,
  useLikeDisLike,
} from "../../../../hooks/likeComment";
import searchlogo from "../../../../assets/Images/logis1.jpeg";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { BsFillSendExclamationFill } from "react-icons/bs";

const PostWidget = ({ postData }) => {
  console.log(postData);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper m="0.3rem 0">
      <PostTitle data={postData} />
      <Typography
        color={main}
        sx={{ mt: "0.5rem", ml: 1, textTransform: "capitalize" }}
      >
        {postData?.description}
      </Typography>
      <Typography
        color={main}
        sx={{ mt: "0.5rem", ml: 1, textTransform: "capitalize" }}
      >
        {postData?.hashtags.map((hash) => `#${hash} `)}
      </Typography>
      {postData?.files && postData?.files?.length > 0 && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={postData?.files[0]}
        />
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
