import { PersonAddOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = () => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={""} size="55px" />
        <Box onClick={() => {}}>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {"NOTHING"}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
        <PersonAddOutlined sx={{ color: primaryDark }} />
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
