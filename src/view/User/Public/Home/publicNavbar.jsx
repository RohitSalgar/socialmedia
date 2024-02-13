import { useState } from "react";
import {
  Box,
  IconButton,
  //   InputBase,
  Typography,
  useTheme,
  useMediaQuery,
  //   Badge,
} from "@mui/material";
import {
  //   Search,
  Message,
  Notifications,
  Help,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ImSwitch } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
// import ClearIcon from "@mui/icons-material/Clear";
import {
  clearSkip,
  removeProfileData,
  setDashboardView,
  //   setSideView,
  //   setViewCompanyId,
  //   setViewProfileId,
} from "../../../../redux/slices/profileSlice";
import classes from "./index.module.css";
// import { useNavSearch } from "../../../../hooks/user";
import { resetLiveChatUsers, setRemoveChatState } from "../../../../redux/slices/chat";
import { openAdvert } from "../../../../redux/slices/advert";
import { removePostData } from "../../../../redux/slices/post";
// import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
// import { useGetAllNotificationById } from "../../../../hooks/notifications";
// import Loader from "../../../../components/Loader/Loader";
import FlexBetween from "../../../../components/FlexBetween";

const SkipNavbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signedIn = localStorage.getItem("amsSocialSignedIn");
  //   const { sideView } = useSelector((state) => state.profile);
  //   const { userId } = useSelector((state) => state.profile.profileData);
  //   const { data, isLoading } = useGetAllNotificationById(userId);
  //   const [searchText, setSearchText] = useState("");
  //   const [searchData, setSearchData] = useState([]);
  //   const onSearchSuccess = (data) => {
  //     setSearchData(data);
  //   };
  //   const { mutate: navesearchMutate } = useNavSearch(onSearchSuccess);

  const tokenId = localStorage.getItem("amsSocialToken");

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  //   function handleClick(value) {
  //     setSearchText("");
  //     if (value.fullName) {
  //       dispatch(setViewProfileId(value?._id));
  //       dispatch(setDashboardView("profile"));
  //     } else {
  //       dispatch(setViewCompanyId(value?._id));
  //       dispatch(setDashboardView("postprofile"));
  //     }
  //   }

  //   if (isLoading) {
  //     return <Loader />;
  //   }

  return (
    <FlexBetween
      padding="1rem 3%"
      backgroundColor={alt}
      className={classes.headermain}
    >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          sx={{ cursor: "pointer" }}
          onClick={() => dispatch(setDashboardView("home"))}
        >
          AllMasters
        </Typography>
      </FlexBetween>


      {/* DESKTOP NAV */}
      {
        isNonMobileScreens && (
          <FlexBetween gap="2rem">
            {/* <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton> */}

            <div

              onClick={() => {
                if (signedIn === "false") {
                  localStorage.clear();
                  localStorage.removeItem("amsSocialSignedIn");
                  dispatch(clearSkip());
                }
                navigate("/login");
              }}
            >
              <Typography
                fontWeight="normal"
                fontSize="1.3rem"
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={() => dispatch(setDashboardView("home"))}
              >
                SIGN-IN
              </Typography>              </div>
          </FlexBetween>
        )

        // : (
        //   <Button
        //     style={{ fontSize: "15px" }}
        //     onClick={() => {
        //       if (signedIn === "true") {
        //         dispatch(removeProfileData());
        //         dispatch(setRemoveChatState());
        //         localStorage.removeItem("amsSocialToken");
        //         localStorage.removeItem("amsSocialId");
        //         localStorage.removeItem("amsSocialSignedIn");
        //       } else {
        //         localStorage.clear();
        //         localStorage.removeItem("amsSocialSignedIn");
        //         dispatch(clearSkip());
        //       }
        //       setIsMobileMenuToggled(!isMobileMenuToggled)
        //       navigate("/login");
        //     }}
        //   >
        //     SignIN
        //   </Button>
        // )
      }

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            {/* <IconButton
              sx={{ fontSize: "25px" }}
              onClick={() => dispatch(setMode())}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton> */}
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            {/* <ImSwitch style={{ fontSize: "25px" }} /> */}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default SkipNavbar;
