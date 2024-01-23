import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import FlexBetween from "../../../../components/FlexBetween";

const Schedule = () => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  return (
    <WidgetWrapper m="2rem 0">
      <Typography color={main} sx={{ mt: "1rem" }}>
        Hello world
      </Typography>
    </WidgetWrapper>
  );
};

export default Schedule;
