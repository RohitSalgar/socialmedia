import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@mui/icons-material";
import moment from "moment";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import FlexBetween from "../FlexBetween";
import Loader from "../Loader/Loader";
import { useDeleteSchedule } from "../../hooks/schedule";
import styles from './index.module.css';

const PostTitle = ({ data, removeFrdRequestIcon }) => {
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

  return (
    <FlexBetween>
      <FlexBetween gap="10px">
        <Avatar
          sx={{ width: 45, height: 45, border:'1px solid #9e9e9e' }}
          alt="Remy Sharp"
          src={data.companyProfile ?? "/static/images/avatar/1.jpg"}
        />
        <Box>
          <Box onClick={() => {}}>
            <Typography
              className={styles.companyname}
            >
              {data?.companyName}
            </Typography>
          </Box>
          <Typography color={medium} fontSize="0.75rem">
            {moment(data?.createdAt).format("MMM Do YYYY")}
          </Typography>
        </Box>
      </FlexBetween>
      {!removeFrdRequestIcon && (
        <>
          {data?.companyId !== companyId ? (
            <IconButton sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
              <AiOutlineUsergroupAdd sx={{ color: primaryDark }} />
            </IconButton>
          ) : (
            <IconButton
              sx={{ p: "0.6rem" }}
              onClick={() => deletePost(data?._id)}
            >
              <DeleteOutlined />
            </IconButton>
          )}
        </>
      )}
    </FlexBetween>
  );
};

export default PostTitle;
