import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../../../components/WidgetWrapper";
import FrdRequest from "../../../components/FrdRequest";
import { useChangeConnectionStatus } from "../../../hooks/profile";
import Loader from "../../../components/Loader/Loader";

const FriendListWidget = ({ data }) => {
  const { palette } = useTheme();
  const {mutate, isPending } = useChangeConnectionStatus()

  const changeConnectionStatusFn = (id, status) => {
    mutate({ id: id, status });
  };

  if(isPending){
    return <Loader />
  }

  return (
    <WidgetWrapper
      sx={{ maxHeight: "400px", minHeight: "34vh", overflow: "scroll" }}
    >
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "0.3rem" }}
      >
        Friend Requests
      </Typography>
      <Box display="flex" flexDirection="column" gap="0.2rem">
        {data &&
          data.map((e, i) => {
            return (
              <FrdRequest
                key={e._id}
                changeConnectionStatusFn={changeConnectionStatusFn}
                data={e}
              />
            );
          })}
        {data && data.length === 0 && (
          <p style={{ paddingTop: "35px", textAlign: "center" }}>
            No Friend Requests
          </p>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
