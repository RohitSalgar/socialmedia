import { Box } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import styles from "./index.module.css";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";

const LookingEmpty = ({ description = "Looking Empty" }) => {
  return (
    <WidgetWrapper sx={{margin : '0.5rem 0rem'}}>
      <Box className={styles.mainbox}>
        <SentimentDissatisfiedRoundedIcon sx={{ fontSize: "100px" }} />
        <p>{description}</p>
      </Box>
    </WidgetWrapper>
  );
};

export default LookingEmpty;
