import classes from "./index.module.css"
import { Button, CircularProgress } from "@mui/material"

const FrdRequest = ({data, changeConnectionStatusFn, isPending}) => {

    return <div className={classes.FrdRequestsection}>
        <div>
          <img className={classes.profilePic} src={data.senderProfile} alt="profile-pic" />
        </div>
        <div>
           <div>
             <p><b>{data.senderName}</b></p>
           </div>
           <div className={classes.buttonContainer}>
            <Button disabled={isPending} onClick={() => changeConnectionStatusFn(data._id,1)} variant="contained">{isPending ? <CircularProgress /> : "Accept" }</Button>
            <Button disabled={isPending} onClick={() => changeConnectionStatusFn(data._id,3)} variant="outlined">{isPending ? <CircularProgress /> : "Reject" }</Button>
           </div>
        </div>
    </div>
}

export default FrdRequest;