import { useState } from "react";
import FlexBetween from "../../../../components/FlexBetween";
import { Box, IconButton, Typography } from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const LikeComment = ({ postData }) => {
  const [isComments, setIsComments] = useState(false);

  const [postId, setPostId] = useState("");
  const { userId } = useSelector((state) => state.profile.profileData);

  console.log(postId);

  return (
    <FlexBetween mt="0.25rem">
      <FlexBetween gap="1rem">
        <FlexBetween gap="0.3rem">
          {postData?.likedBy.includes(userId) ? (
            <IconButton onClick={() => likeDislike(2)}>
              <FavoriteOutlined sx={{ color: primary }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => likeDislike(1)}>
              <FavoriteBorderOutlined onClo />
            </IconButton>
          )}
          <Typography>
            {postData?.likes === 1 ? `1 like` : `${postData?.likes} likes`}{" "}
          </Typography>
        </FlexBetween>

        <FlexBetween gap="0.3rem">
          <Box
            onClick={() => {
              setPostId(postData?._id);
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
      </FlexBetween>
    </FlexBetween>
  );
};

export default LikeComment;
