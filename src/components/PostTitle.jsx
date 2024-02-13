import { PersonAddOutlined } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@mui/icons-material";
import { useDeletePost } from "../hooks/posts";
import moment from "moment";
import {
  setDashboardView,
  setViewProfileId,
} from "../redux/slices/profileSlice";
import styles from "./index.module.css";

const PostTitle = ({ data, checkCond }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const { userId } = useSelector((state) => state.profile.profileData);
  const { viewProfileId } = useSelector((state) => state.profile);
  const { mutate, isLoading } = useDeletePost();
  const dispatch = useDispatch();
  const deletePost = (id) => {
    const postData = {
      postId: id,
      userId,
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
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <Avatar
          sx={{ width: 45, height: 45 , border:'1px solid #9e9e9e'}}
          onClick={() => {
            dispatch(setViewProfileId(data.createdBy));
            dispatch(setDashboardView("profile"));
          }}
          alt="Remy Sharp"
          src={data?.profile ? data.profile : "/static/images/avatar/1.jpg"}
        />
        <Box onClick={() => {}}>
          <Typography
            className={styles.posttitlename}
            onClick={() => {
              dispatch(setViewProfileId(data.createdBy));
              dispatch(setDashboardView("profile"));
            }}
            variant="h5"
            fontWeight="400"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {data?.fullName}
          </Typography>
          <Typography className={styles.posttitledate} fontSize="0.75rem">
            {formatDate(data?.createdAt)}
          </Typography>
        </Box>
        <Typography color={medium} fontSize="0.75rem">
          {formatDate(data?.createdAt)}
        </Typography>
      </FlexBetween>
      {checkCond || viewProfileId === userId && (
        <>
          {data?.createdBy != userId ? (
            <IconButton
              onClick={() => {
                dispatch(setViewProfileId(data.createdBy));
                dispatch(setDashboardView("profile"));
              }}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              <PersonAddOutlined className={styles.invateicon} />
            </IconButton>
          ) : (
            <IconButton
              disabled={isLoading}
              sx={{ p: "0.6rem" }}
              onClick={() => deletePost(data?._id)}
            >
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Box className={styles.deletebtndiv}>
                  <DeleteOutlined className={styles.deleteIcon} />
                </Box>
              )}
            </IconButton>
          )}
        </>
      )}
    </FlexBetween>
  );
};

export default PostTitle;
