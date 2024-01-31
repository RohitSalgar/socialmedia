import classes from "./index.module.css";
import { Button, CircularProgress } from "@mui/material";
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from "react-redux";
import { setDashboardView, setViewProfileId } from "../../redux/slices/profileSlice";

const FrdRequest = ({ data, changeConnectionStatusFn, isPending }) => {
  const dispatch = useDispatch()
  return (
    <div onClick={() => {dispatch(setViewProfileId(data.senderId)); dispatch(setDashboardView("profile"))}} className={classes.maindiv}>
      <div className={classes.FrdRequestsection}>
        <div>
          <img
            className={classes.profilePic}
            src={data.senderProfile}
            alt="profile-pic"
          />
        </div>
        <div>
          <p  className={classes.username}>
            <b>{data.senderName}</b>
          </p>
        </div>
      </div>
      <div className={classes.senderNamediv}>
        <div className={classes.buttonContainer}>
          <Button
            disabled={isPending}
            className={classes.okbtn}
            onClick={() => changeConnectionStatusFn(data._id, 1)}
            variant="contained"
          >
            {isPending ? <CircularProgress /> : <OfflinePinIcon />}
          </Button>
          <Button
           className={classes.closebtn}
            disabled={isPending}
            onClick={() => changeConnectionStatusFn(data._id, 0)}
            variant="outlined"
          >
            {isPending ? <CircularProgress /> : <CancelIcon />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FrdRequest;
