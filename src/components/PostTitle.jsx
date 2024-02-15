import { PersonAddOutlined } from "@mui/icons-material";
import {
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Stack,
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
  setViewCompanyId,
  setViewProfileId,
} from "../redux/slices/profileSlice";
import styles from "./index.module.css";
import { styled } from "@mui/material/styles";
import { removeHastag } from "../redux/slices/post";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const PostTitle = ({ data, checkCond }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const { userId } = useSelector((state) => state.profile.profileData);
  const { dashboardView } = useSelector((state) => state.profile);
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
        {dashboardView === "pages" && data?.companyId ? (
          <Stack direction="row" spacing={2}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar
                  alt="Remy Sharp"
                  src={data?.profile}
                  onClick={() => {
                    dispatch(setViewProfileId(data.createdBy));
                    dispatch(setDashboardView("profile"));
                  }}
                  sx={{
                    width: "20px",
                    height: "20px",
                    border: "0.01rem solid gray",
                    cursor: "pointer",
                  }}
                />
              }
            >
              <Avatar
                alt="Travis Howard"
                sx={{
                  width: "50px",
                  height: "50px",
                  border: "0.01rem solid gray",
                  cursor: "pointer",
                }}
                onClick={() => {
                  dispatch(removeHastag()),
                    dispatch(setViewCompanyId(data?.companyId)),
                    dispatch(setDashboardView("postprofile"));
                }}
                src={data?.companyProfile}
              />
            </Badge>
          </Stack>
        ) : (
          <Avatar
            sx={{ width: 45, height: 45, border: "1px solid #9e9e9e" }}
            onClick={() => {
              dispatch(setViewProfileId(data.createdBy));
              dispatch(setDashboardView("profile"));
            }}
            alt="Remy Sharp"
            src={data?.profile ? data.profile : "/static/images/avatar/1.jpg"}
          />
        )}

        <Box onClick={() => {}}>
          <Typography
            className={styles.posttitlename}
            onClick={() => {
              if (dashboardView === "pages") {
                dispatch(removeHastag()),
                  dispatch(setViewCompanyId(data?.companyId)),
                  dispatch(setDashboardView("postprofile"));
              } else {
                dispatch(setViewProfileId(data.createdBy));
                dispatch(setDashboardView("profile"));
              }
            }}
            variant="h5"
            fontWeight="400"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {dashboardView === "pages" ? data?.companyName : data?.fullName}
          </Typography>
          <Typography className={styles.posttitledate} fontSize="0.75rem">
            {formatDate(data?.createdAt)}
          </Typography>
        </Box>
      </FlexBetween>
      {checkCond ||
        (viewProfileId === userId && (
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
                  <CircularProgress style={{ color: "white" }} size={20} />
                ) : (
                  <Box className={styles.deletebtndiv}>
                    <DeleteOutlined className={styles.deleteIcon} />
                  </Box>
                )}
              </IconButton>
            )}
          </>
        ))}
    </FlexBetween>
  );
};

export default PostTitle;
