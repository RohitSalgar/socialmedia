import classes from "./index.module.css"
import { Button } from "@mui/material"

const FrdRequest = ({data, changeConnectionStatusFn}) => {

    return <div className={classes.FrdRequestsection}>
        <div>
          <img className={classes.profilePic} src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp" alt="profile-pic" />
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