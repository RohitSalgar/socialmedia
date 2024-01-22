import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import PostTitle from "../../../../components/PostTitle";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import { useState } from "react";
import { Stack } from '@mui/material';
import CommentBox from '../../../../components/Comments/CommentBox';
import CommentInputBox from '../../../../components/Comments/CommentInputBox';

const reorderedComments = [
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
    ]
  }
]

const PostWidget = ({ postData }) => {
  const [isComments, setIsComments] = useState(false);
  const [selected, setSelected] = useState(0); //0 for none, -id for edit, id for reply

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper m="0.3rem 0">
      <PostTitle data={postData} />
      <Typography color={main} sx={{ mt: "0.5rem", ml:1 }}>{postData?.description}</Typography>
      <Typography color={main} sx={{ mt: "0.5rem", ml:1}}>{postData?.hashtags.map((hash) => `#${hash} `)}</Typography>
      {/* <img
        width="100%"
        height="auto"
        alt="post"
        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        src={searchlogo}
      /> */}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={""}>
              {/* <FavoriteOutlined sx={{ color: primary }} /> */}
              <FavoriteBorderOutlined />
            </IconButton>
            <Typography>{postData?.likes === 1 ? `1 like`: `${postData?.likes} likes`} </Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <Box onClick={() => setIsComments(!isComments)} sx={{ display: "flex", flexDirection: "row", alignItems:"center"}}>
              <IconButton >
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography sx={{cursor:"pointer"}}>{"comments"}</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && <Box mt="0.5rem">
        <Box>
          <Divider />
          <Stack >
            <CommentInputBox type='comment' postData={postData} />
            {reorderedComments.map((c) => {
              return <CommentBox
                key={c.id}
                selected={selected}
                setSelected={setSelected}
                {...c}
              />
            }
            )}
          </Stack>
        </Box>
        <Divider />
      </Box>}
    </WidgetWrapper>
  );
};

export default PostWidget;
