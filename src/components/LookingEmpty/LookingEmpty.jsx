import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import styles from "./index.module.css";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";

const LookingEmpty = ({description = "Looking Empty"}) => {
  const { palette } = useTheme();
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <Typography color={medium} m="0.5rem 0">
        <Box className={styles.mainbox}>
          <SentimentDissatisfiedRoundedIcon sx={{fontSize:'100px'}} />
          <p>{description}</p>
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};

export default LookingEmpty;
