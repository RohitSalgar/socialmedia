import { PersonAddOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import Avatar from '@mui/material/Avatar';
import { useSelector } from "react-redux";
import {
  DeleteOutlined,
} from "@mui/icons-material";
import { useDeletePost } from "../../../../hooks/posts";
import { useGetAllSchedules } from "../../../../hooks/schedule";
import moment from "moment"
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useGetProfile } from "../../../../hooks/profile";
const PostTitle = ({ data }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const { userId } = useSelector((state) => state.profile.profileData)
  const { profileData} = useGetProfile(userId);

  const { mutate, isLoading } = useDeletePost()
  const deletePost = (id) => {
    const postData = {
      postId: id,
      userId
    }
    mutate(postData)
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <Avatar sx={{ width: 35, height: 35  }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Box onClick={() => { }}>
          <Typography
            color={main}
            variant="h5"
            fontWeight="400"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {data?.companyName}
          </Typography>
        </Box>
        <Typography color={medium} fontSize="0.75rem">
            {moment(data?.createdAt).format('MMM Do YYYY, h:mm a')}
          </Typography>
      </FlexBetween>
      {data?.companyId != profileData?.pageDate?.companyId
        ?
        <IconButton sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
          <AiOutlineUsergroupAdd sx={{ color: primaryDark }} />
        </IconButton> :
        <IconButton sx={{ p: "0.6rem" }} onClick={() => deletePost(data?._id)}>
          <DeleteOutlined />

        </IconButton>
      }
    </FlexBetween>
  );
};

export default PostTitle;
