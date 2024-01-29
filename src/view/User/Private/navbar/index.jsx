import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../../../components/FlexBetween";
import { ImSwitch } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../../../redux/slices/authSlice";
import { setChatModeOff, setChatModeOn } from "../../../../redux/slices/chat";
import ClearIcon from "@mui/icons-material/Clear";
import {
  clearSkip,
  removeProfileData,
  setDashboardView,
  setSideView,
  setViewCompanyId,
  setViewProfileId,
} from "../../../../redux/slices/profileSlice";
import classes from "./index.module.css";
import { useNavSearch } from "../../../../hooks/user";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signedIn = localStorage.getItem("amsSocialSignedIn");
  const { sideView } = useSelector((state) => state.profile);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const onSearchSuccess = (data) => {
    setSearchData(data);
  };
  const { mutate: navesearchMutate } = useNavSearch(onSearchSuccess);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  function handleClick(value) {
    setSearchText("");
    if (value.fullName) {
      dispatch(setViewProfileId(value?._id));
      dispatch(setDashboardView("profile"));
    } else {
      dispatch(setViewCompanyId(value?._id));
      dispatch(setDashboardView("postprofile"));
    }
  }

  return (
    <FlexBetween padding="1rem 3%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
        >
          AllMasters
        </Typography>
      </FlexBetween>
      <div>
        <FlexBetween gap="1.75rem">
          {isNonMobileScreens && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  navesearchMutate({ term: e.target.value });
                }}
                placeholder="Search..."
                style={{ width: "250px" }}
              />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
        {searchText != "" && searchData && searchData.length > 0 && (
          <div className={classes.searchitemsContainer}>
            {searchData &&
              searchData.map((value) => {
                return (
                  <div
                    onClick={() => handleClick(value)}
                    key={value._id}
                    className={classes.profileContainer}
                  >
                    <div>
                      <img
                        className={classes.profilePic}
                        src={value.profile}
                        alt=""
                      />
                    </div>
                    <div>
                      {value.fullName ? value.fullName : value.companyName}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          {sideView === "companyPage" && (
            <Message
              sx={{ fontSize: "25px" }}
              onClick={() => dispatch(setSideView("chat"))}
            />
          )}
          {sideView === "chat" && (
            <ClearIcon
              sx={{ fontSize: "25px" }}
              onClick={() => dispatch(setSideView("companyPage"))}
            />
          )}
          {/* <Notifications sx={{ fontSize: "25px" }} /> */}
          <ImSwitch
            style={{ fontSize: "25px" }}
            onClick={() => {
              if (signedIn === "true") {
                dispatch(removeProfileData());
                localStorage.removeItem("amsSocialToken");
                localStorage.removeItem("amsSocialId");
                localStorage.removeItem("amsSocialSignedIn");
              } else {
                localStorage.clear();
                localStorage.removeItem("amsSocialSignedIn");
                dispatch(clearSkip());
              }
              navigate("/login");
            }}
          />
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

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
            <IconButton
              sx={{ fontSize: "25px" }}
              onClick={() => dispatch(setMode())}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <ImSwitch style={{ fontSize: "25px" }} />
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
