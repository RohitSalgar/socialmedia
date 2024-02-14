import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@mui/icons-material";
import moment from "moment";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useGetProfile } from "../../../../hooks/profile";
import Loader from "../../../../components/Loader/Loader";
import { useDeleteSchedule } from "../../../../hooks/schedule";
import {
  setDashboardView,
  setViewCompanyId,
} from "../../../../redux/slices/profileSlice";
import styles from './index.module.css';

const PostTitle = ({ data }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const { userId } = useSelector((state) => state.profile.profileData);
  const { profileData } = useGetProfile(userId);
  const companyId = useSelector((state) => state.profile.companyId);
  const dispatch = useDispatch();

  const { mutate, isLoading } = useDeleteSchedule();
  const deletePost = (id) => {
    const postData = {
      scheduleId: id,
      companyId: companyId,
    };
    mutate(postData);
  };

  const formatDate = (createdAt) => {
    const now = moment();
    const createdAtMoment = moment(createdAt);
    if (now.isSame(createdAtMoment, "day")) {
      return createdAtMoment.fromNow();
    } else if (now.subtract(1, "day").isSame(createdAtMoment, "day")) {
      return "Yesterday";
    } else {
      return createdAtMoment.format("MMM Do YYYY");
    }
  };

  if (isLoading) {
    <Loader />;
  }

  return (
    <FlexBetween>
      <FlexBetween gap="10px">
        <Avatar
          sx={{ width: 45, height: 45, border:'1px solid #9e9e9e' }}
          alt="Remy Sharp"
          onClick={() => {
            dispatch(setViewCompanyId(data?.companyId)),
              dispatch(setDashboardView("postprofile"));
          }}
          src={data.companyProfile ?? "/static/images/avatar/1.jpg"}
        />
        <Box>
          <Typography
            color={main}
            variant="h5"
            fontWeight="400"
            className={styles.companyName}
            onClick={() => {
              dispatch(setViewCompanyId(data?.companyId)),
                dispatch(setDashboardView("postprofile"));
            }}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {data?.companyName}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {formatDate(data?.createdAt)}
          </Typography>
        </Box>
      </FlexBetween>
      {data?.companyId !== companyId ? (
        <IconButton
          onClick={() => {
            dispatch(setViewCompanyId(data?.companyId)),
              dispatch(setDashboardView("postprofile"));
          }}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          <AiOutlineUsergroupAdd sx={{ color: primaryDark }} />
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
