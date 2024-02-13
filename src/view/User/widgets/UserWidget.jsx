import { Box, Typography, Divider, useTheme, List } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ListItemButton from "@mui/material/ListItemButton";
import { useState } from "react";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardView,
  setSideView,
  setTabView,
  setViewProfileId,
} from "../../../redux/slices/profileSlice";
import { useGetProfile } from "../../../hooks/profile";
import Loader from "../../../components/Loader/Loader";
import styles from "./index.module.css";
import { removeHastag } from "../../../redux/slices/post";

const UserWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const signedIn = localStorage.getItem("amsSocialSignedIn");
  const dark = palette.neutral.dark;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const userId = useSelector((state) => state.profile.profileData.userId);
  const { dashboardView } = useSelector((state) => state.profile);
  const { data, isLoading } = useGetProfile(userId);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  function checkIsNumber(number) {
    if (number != null) {
      return number;
    }
    return 0;
  }

  if (isLoading) {
    <Loader />;
  }

  return (
    <Box className={styles.profilediv}>
      {signedIn === "true" && (
        <>
          <Box className={styles.avatardiv}>
            <Avatar
              sx={{ width: 65, height: 65 , border:'1px solid #9e9e9e'}}
              alt={data?.userData?.fullName}
              src={data?.userData?.profile}
            />
            <Box>
              <Typography className={styles.fullname} color={dark} variant="h5" fontWeight="500">
                {data?.userData?.fullName}
              </Typography>
              <Typography
                className={styles.designation}
                fontWeight="400"
              >
                {data?.userData?.designation}
              </Typography>
            </Box>
          </Box>
          <Divider style={{ marginTop: "10px" }} />
        </>
      )}
      <Box></Box>

      <Box p="0">
        <List
          className={`sidebarddiv ${styles.sidebartitle}`}
          component="nav"
          aria-label="main mailbox folders"
        >
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={dashboardView === "home"}
            onClick={(event) => {
              handleListItemClick(event, 0);
              dispatch(setDashboardView("home"));
              dispatch(setSideView("companyPage"));
              dispatch(setTabView("trending"));
              dispatch(removeHastag());
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={dashboardView === "news"}
            onClick={() => {
              dispatch(setDashboardView("news"));
              dispatch(setSideView("companyPage"));
              dispatch(setTabView("news"));
              dispatch(removeHastag());
            }}
          >
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary="News Feed" />
          </ListItemButton>
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={dashboardView === "schedule"}
            onClick={() => {
              dispatch(setSideView("companyPage"));
              dispatch(setDashboardView("schedule"));
              dispatch(removeHastag());
            }}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
          </ListItemButton>
          {/* <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={selectedIndex === 3}
            onClick={(event) => {
              handleListItemClick(event, 3);
              dispatch(setDashboardView("shipment"));
            }}
          > */}
          {/* <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Shipments News" /> */}
          {/* </ListItemButton> */}
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={dashboardView === "pages"}
            onClick={() => {
              dispatch(setDashboardView("pages"));
              dispatch(setTabView("pages"));
              dispatch(setSideView("companyPage"));
              dispatch(removeHastag());
            }}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary=" Company Page" />
          </ListItemButton>
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={dashboardView === "qa"}
            onClick={() => {
              dispatch(setDashboardView("qa"));
              dispatch(setTabView("qa"));
              dispatch(setSideView("companyPage"));
              dispatch(removeHastag());
            }}
          >
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="QA" />
          </ListItemButton>
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={dashboardView === "profile"}
            onClick={() => {
              dispatch(setDashboardView("profile"));
              dispatch(setViewProfileId(userId));
              dispatch(removeHastag());
            }}
          >
            <ListItemIcon>
              <SwitchAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </List>
      </Box>

      <Divider />
    </Box>
  );
};

export default UserWidget;
