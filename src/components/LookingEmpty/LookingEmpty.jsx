import { Box } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import styles from "./index.module.css";
import Lottie from "lottie-react";
import animationData from '../../assets/newEmptyBox.json';
import animationData1 from '../../assets/emptyAnimation.json';
 

const LookingEmpty = ({ description = "Looking Empty" }) => {
  return (
    <WidgetWrapper sx={{ margin: '0.5rem 0rem' }}>
      <Box className={styles.mainbox} style={{display:"flex"}} >
        {/* <SentimentDissatisfiedRoundedIcon sx={{ fontSize: "100px" }} />
        <p>{description}</p> */}
        {/* <Lottie animationData={animationData1} style={{ width: '200px', height: '200px', fill:"none" }}/> */}
        <Lottie loop={false} animationData={animationData} style={{ width: '200px', height: '200px', fill:"none" }}/>

      </Box>
    </WidgetWrapper>
  );
};

export default LookingEmpty;
