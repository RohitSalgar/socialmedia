import { PersonAddOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@mui/icons-material";
import moment from "moment";
import { useDeletePost } from "../../../../hooks/posts";
import { setDashboardView, setViewCompanyId } from "../../../../redux/slices/profileSlice";
import { removeHastag } from "../../../../redux/slices/post";

const PostTitle = ({ data }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch()
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const { userId } = useSelector((state) => state.profile.profileData);
  const { mutate } = useDeletePost();
  const deletePost = (id) => {
    const postData = {
      postId: id,
      userId,
    };
    mutate(postData);
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <Avatar
          sx={{ width: 35, height: 35 }}
          alt="Remy Sharp"
          src={data.companyProfile}
          onClick={() => {dispatch(setViewCompanyId(data?.companyId)) , dispatch(setDashboardView('postprofile'))}} 
        />
        <Box onClick={() => {}}>
          <Typography
            color={main}
            variant="h5"
            fontWeight="400"
            onClick={() => {dispatch(setViewCompanyId(data?.companyId)) , dispatch(setDashboardView('postprofile'))}} 
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
          {moment(data?.createdAt).format("MMM Do YYYY, h:mm a")}
        </Typography>
      </FlexBetween>
      {data?.createdBy != userId ? (
        <IconButton onClick={() => {  dispatch(removeHastag()) , dispatch(setViewCompanyId(data?.companyId)) , dispatch(setDashboardView('postprofile'))}} sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
          <PersonAddOutlined sx={{ color: primaryDark }} />
        </IconButton>
      ) : (
        <IconButton sx={{ p: "0.6rem" }} onClick={() => deletePost(data?._id)}>
          <DeleteOutlined />
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default PostTitle;
