import classes from "./index.module.css"
import { Button } from "@mui/material"

const FrdRequest = ({data, changeConnectionStatusFn}) => {

    return <div className={classes.FrdRequestsection}>
        <div>
          <img className={classes.profilePic} src={data.senderProfile} alt="profile-pic" />
        </div>
        <div>
           <div>
             <p><b>{data.senderName}</b></p>
           </div>
           <div className={classes.buttonContainer}>
            <Button onClick={() => changeConnectionStatusFn(data._id,1)} variant="contained">Accept</Button>
            <Button onClick={() => changeConnectionStatusFn(data._id,3)} variant="outlined">Reject</Button>
           </div>
        </div>
    </div>
}

export default FrdRequest;