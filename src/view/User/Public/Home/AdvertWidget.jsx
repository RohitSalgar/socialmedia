import { Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import WidgetWrapper from "../../../../components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper sx={{ mb: 2 }}>
      <FlexBetween>
        <Typography color={dark} variant="h6" fontWeight="500">
          Welcome
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Unlock the full potential of our Allmaster social media feature by  Registering Today
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant='primary'
        sx={{
          mt: 1,
          mb: 2,
          background: `${primary}`,
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Register
      </Button>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
