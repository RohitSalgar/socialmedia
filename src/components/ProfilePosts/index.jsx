import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween";
import { useState } from "react";
import WidgetWrapper from "../WidgetWrapper";


const ProfilePost = () => {
  const [isComments, setIsComments] = useState(false);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper sx={{ p: "10px 20px 10px 0px"}} >
      {/* <Friend /> */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        Hello world
      </Typography>
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

export default ProfilePost;
