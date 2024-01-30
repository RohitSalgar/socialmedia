import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@mui/icons-material";
import moment from "moment";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import FlexBetween from "../FlexBetween";
import Loader from "../Loader/Loader";
import { useDeleteSchedule } from "../../hooks/schedule";

const PostTitle = ({ data }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const companyId = useSelector((state) => state.profile.companyId);

  const { mutate, isLoading } = useDeleteSchedule();
  const deletePost = (id) => {
    const postData = {
      scheduleId: id,
      companyId: companyId,
    };
    mutate(postData);
  };
  if (isLoading) {
    <Loader />;
  }

  console.log(data , 'dataaasdass')

  return (
    <FlexBetween>
      <FlexBetween gap="10px">
        <Avatar
          sx={{ width: 35, height: 35 }}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <Box onClick={() => {}}>
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
          {moment(data?.createdAt).format("MMM Do YYYY, h:mm a")}
        </Typography>
      </FlexBetween>
      {data?.companyId !== companyId ? (
        <IconButton sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
          <AiOutlineUsergroupAdd sx={{ color: primaryDark }} />
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
