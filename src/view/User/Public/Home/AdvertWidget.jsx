import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import WidgetWrapper from "../../../../components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper sx={{mb:2}}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Register 
        </Typography>
      </FlexBetween>
      
      <FlexBetween>
        <Typography color={main}>Login</Typography>
        {/* <Typography color={medium}>mikacosmetics.com</Typography> */}
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
