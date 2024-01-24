import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../../components/PostTitle";
import WidgetWrapper from "../../../components/WidgetWrapper";

const FriendListWidget = () => {
  const { palette } = useTheme();
  const friendReq = [1, 2, 3];
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "0.3rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="0.2rem">
        {friendReq.map((e, i) => {
          return (
            <Friend
              key={i}
              friendId={e.friendId}
              name={e.name}
              subtitle={e.subtitle}
              userPicturePath={e.userPicturePath}
            />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
