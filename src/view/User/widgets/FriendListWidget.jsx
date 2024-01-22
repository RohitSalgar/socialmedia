import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../../components/PostTitle";
import WidgetWrapper from "../../../components/WidgetWrapper";

const FriendListWidget = () => {
  const { palette } = useTheme();

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        <Friend
          key={"5050"}
          friendId={"393939"}
          name={"VIJAY"}
          subtitle={"NOTIHNG"}
          userPicturePath={"VVV"}
        />
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
