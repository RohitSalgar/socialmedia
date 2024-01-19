import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import Friend from "../../../components/Friend";
import WidgetWrapper from "../../../components/WidgetWrapper";
import { useState } from "react";

const PostWidget = () => {
  const [isComments, setIsComments] = useState(false);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper m="2rem 0">
      <Friend />
      <Typography color={main} sx={{ mt: "1rem" }}>Hello world</Typography>
      <img
        width="100%"
        height="auto"
        alt="post"
        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        src={``}
      />
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={""}>
              <FavoriteOutlined sx={{ color: primary }} />
              <FavoriteBorderOutlined />
            </IconButton>
            <Typography>{"10"}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{"2"}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      <Box mt="0.5rem">
        <Box>
          <Divider />
          <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
            {"NOTHING"}
          </Typography>
        </Box>
        <Divider />
      </Box>
    </WidgetWrapper>
  );
};

export default PostWidget;
