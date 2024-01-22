import { PersonAddOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import Avatar from '@mui/material/Avatar';

const PostTitle = ({data}) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
      <Avatar sx={{ width: 40, height: 40 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
            {data?._id}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            Salgar
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
        <PersonAddOutlined sx={{ color: primaryDark }} />
      </IconButton>
    </FlexBetween>
  );
};

export default PostTitle;
