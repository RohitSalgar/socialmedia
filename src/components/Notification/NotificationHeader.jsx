import { IconButton, Typography } from "@mui/material";
import FlexBetween from "../FlexBetween";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { setSideView } from "../../redux/slices/profileSlice";

const NotificationHeader = () => {
  const dispatch = useDispatch();
  return (
    <FlexBetween marginTop={"-1.4rem"}>
      <Typography sx={{ fontSize: "20px", fontWeight: "300" }}>
        Notifications
      </Typography>
      <IconButton onClick={() => dispatch(setSideView("companyPage"))}>
        <CloseIcon sx={{ fontSize: "20px" }} />
      </IconButton>
    </FlexBetween>
  );
};

export default NotificationHeader;
