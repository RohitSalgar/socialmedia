import { Box, Typography, Divider, useTheme, List } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import WidgetWrapper from "../../../components/WidgetWrapper";
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
import { setDashboardView } from "../../../redux/slices/profileSlice";
import { useGetProfile } from "../../../hooks/profile";
import Loader from "../../../components/Loader/Loader";

const UserWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const signedIn = localStorage.getItem("amsSocialSignedIn");
  const dark = palette.neutral.dark;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const userId = useSelector((state) => state.profile.profileData.userId);
  const { data, isLoading } = useGetProfile(userId);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const following =
    data && data[0]?.connectionCounts?.filter((e) => e.status === 2)[0]?.count;

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
    <WidgetWrapper>
      {signedIn === "true" && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt="Remy Sharp"
              src={data?.userData?.profile}
            />
          </Box>
          <div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                mt: "10px",
              }}
            >
              <Typography color={dark} variant="h5" fontWeight="500">
                {data?.userData?.fullName}
              </Typography>
              <Typography
                sx={{ mt: 1, textTransform: "capitalize" }}
                color={dark}
                variant="h6"
                fontWeight="400"
              >
                {data?.userData?.designation}
              </Typography>
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "auto",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "10px",
                  width: "80%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: "3px",
                  }}
                >
                  <Typography color={dark} variant="h5" fontWeight="500">
                    {checkIsNumber(data?.detailsCounts?.followersCount)}
                  </Typography>
                  <Typography color={dark} variant="h6" fontWeight="400">
                    Followers
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: "3px",
                  }}
                >
                  <Typography color={dark} variant="h5" fontWeight="500">
                    {checkIsNumber(data?.detailsCounts?.followingCount)}
                  </Typography>
                  <Typography color={dark} variant="h6" fontWeight="400">
                    Following
                  </Typography>
                </Box>
              </Box>
            </div>
          </div>
          <Divider style={{ marginTop: "10px" }} />
        </>
      )}
      <Box></Box>

      <Box p="0">
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={selectedIndex === 0}
            onClick={(event) => {
              handleListItemClick(event, 0), dispatch(setDashboardView("home"));
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary="News Feed" />
          </ListItemButton>
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={selectedIndex === 2}
            onClick={(event) => {
              handleListItemClick(event, 2),
                dispatch(setDashboardView("schedule"));
            }}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
          </ListItemButton>
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={selectedIndex === 3}
            onClick={(event) => {
              handleListItemClick(event, 3), dispatch(setDashboardView("news"));
            }}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Shipments News" />
          </ListItemButton>
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Pages" />
          </ListItemButton>
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={selectedIndex === 5}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="QA" />
          </ListItemButton>
          <ListItemButton
            sx={{ padding: "1px 20px" }}
            selected={selectedIndex === 5}
            onClick={(event) => {
              handleListItemClick(event, 0),
                dispatch(setDashboardView("profile"));
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
    </WidgetWrapper>
  );
};

export default UserWidget;
