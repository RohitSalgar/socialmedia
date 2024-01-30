import { Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { clearSkip } from "../../../../redux/slices/profileSlice";
import { useNavigate } from "react-router";

const AdvertWidget = (widgetname) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const primary = palette.primary.main;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerFn = () => {
    dispatch(clearSkip())
    navigate("/register")
  }

  return (
    <WidgetWrapper
      sx={{ mb: 2 }}
      className={`${
        widgetname?.widgetname === true ? styles.welcomediv : styles.welcomedivs
      }`}
    >
      <FlexBetween>
        <Typography color={dark} variant="h6" fontWeight="500">
          Welcome
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Unlock the full potential of our Allmaster social media feature by
        Registering Today
      </Typography>
      <Button
        className={styles.registerbtn}
        type="submit"
        fullWidth
        variant="primary"
        sx={{
          mt: 1,
          mb: 2,
          background: `${primary}`,
          color: "#fff",
          fontWeight: "bold",
        }}
        onClick={registerFn}
      >
        Register
      </Button>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
