import { PersonAddOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@mui/icons-material";
import moment from "moment";

const PostTitle = ({ data }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <FlexBetween gap={"5px"}>
          <Avatar
            sx={{ width: 45, height: 45 , border:'1px solid #9e9e9e' }}
            alt="Remy Sharp"
            src={data?.profile}
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
              {data?.fullName}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {data?.designation}
            </Typography>
          </Box>
        </FlexBetween>
        <Typography color={medium} fontSize="0.75rem">
          {moment(data?.createdAt).format("MMM Do YYYY, h:mm a")}
        </Typography>
      </Box>
    </FlexBetween>
  );
};

export default PostTitle;
