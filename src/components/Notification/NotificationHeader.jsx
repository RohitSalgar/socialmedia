import { IconButton, Typography } from "@mui/material";
import FlexBetween from "../FlexBetween";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { setSideView } from "../../redux/slices/profileSlice";

const NotificationHeader = () => {
  const dispatch = useDispatch();
  return (
    <FlexBetween>
      <Typography sx={{ fontSize: "23px", fontWeight: "600" }}>
        Notifications
      </Typography>
      <IconButton onClick={() => dispatch(setSideView("companyPage"))}>
        <CloseIcon sx={{ fontSize: "23px" }} />
      </IconButton>
    </FlexBetween>
  );
};

export default NotificationHeader;
