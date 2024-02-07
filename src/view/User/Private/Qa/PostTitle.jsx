import { PersonAddOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@mui/icons-material";
import moment from "moment";
import { useDeleteQa } from "../../../../hooks/qa";
import Loader from "../../../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import { setDashboardView, setViewCompanyId, setViewProfileId } from "../../../../redux/slices/profileSlice";

const PostTitle = ({ data }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const { userId } = useSelector((state) => state.profile.profileData);
  const { mutate, isPending } = useDeleteQa();
  const dispatch = useDispatch()
  const deletePost = (id) => {
    const postData = {
      questionId: id,
      userId,
    };
    mutate(postData);
  };

  const formatDate = (createdAt) => {
    const now = moment();
    const createdAtMoment = moment(createdAt);
    if (now.isSame(createdAtMoment, 'day')) {
      return createdAtMoment.fromNow();
    } else if (now.subtract(1, 'day').isSame(createdAtMoment, 'day')) {
      return 'Yesterday';
    } else {
      return createdAtMoment.format("MMM Do YYYY");
    }
  };

  if(isPending){
    return <Loader />
  }
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <Avatar
          sx={{ width: 35, height: 35 }}
          onClick={() => {dispatch(setViewProfileId(data.createdBy)) , dispatch(setDashboardView('profile'))}} 
          alt="Remy Sharp"
          src={data?.profile ? data.profile : "/static/images/avatar/1.jpg"}
        />
        <Box onClick={() => {}}>
          <Typography
            color={main}
            variant="h5"
            fontWeight="400"
            onClick={() => {dispatch(setViewProfileId(data.createdBy)) , dispatch(setDashboardView('profile'))}} 
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {data?.fullName}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {data?.designation}
          </Typography>
        </Box>
        <Typography color={medium} fontSize="0.75rem">
          {formatDate(data?.createdAt)}
        </Typography>
      </FlexBetween>
      {data?.createdBy != userId ? (
        <IconButton onClick={() => {dispatch(setViewProfileId(data.createdBy)) , dispatch(setDashboardView('profile'))}} sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
          <PersonAddOutlined sx={{ color: primaryDark }} />
        </IconButton>
      ) : (
        <IconButton sx={{ p: "0.6rem" }} onClick={() => deletePost(data?._id)}>
          <DeleteOutlined className="deleteIcon" />
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default PostTitle;
