import { Box, useMediaQuery, List } from "@mui/material";
import Navbar from "../../Private/navbar/index";
import UserWidget from "../../widgets/UserWidget";
import MyPostWidget from "../../Private/Posts/MyPostWidget";
import PostWidget from "./PostWidget";
import AdvertWidget from "./AdvertWidget";
import FriendListWidget from "../../widgets/FriendListWidget";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailIcon from "@mui/icons-material/Mail";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import OptionalTab from "../../Private/Tabs/Tabs";
import { useEffect, useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { setDashboardView } from "../../../../redux/slices/profileSlice";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import { useGetTrendingPosts } from "../../../../hooks/posts";
import LookingEmpty from "../../../../components/LookingEmpty/LookingEmpty";

const HomePage = () => {
  const { tabView } = useSelector((state) => state.profile);
  const [widgetname, setWidgetname] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const dispatch = useDispatch();
  const { data: trendingPost } = useGetTrendingPosts(tabView);

  function handleClassname() {
    setWidgetname(true);
    setTimeout(() => {
      setWidgetname(false);
    }, 200);
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "23%" : undefined}>
          <AdvertWidget widgetname={widgetname} />
          <WidgetWrapper>
            <Box p="0">
              <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                  sx={{ padding: "1px 20px" }}
                  selected={selectedIndex === 0}
                  onClick={(event) => {
                    handleListItemClick(event, 0),
                      dispatch(setDashboardView("home"));
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
                  onClick={(event) => {
                    handleListItemClick(event, 1);
                    dispatch(setDashboardView("news"));
                    handleClassname();
                  }}
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
                    handleClassname();
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
                    handleListItemClick(event, 3);
                    dispatch(setDashboardView("shipment"));
                    handleClassname();
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
                  onClick={(event) => {
                    handleListItemClick(event, 4);
                    dispatch(setDashboardView("pages"));
                    handleClassname();
                  }}
                >
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pages" />
                </ListItemButton>
                <ListItemButton
                  sx={{ padding: "1px 20px" }}
                  selected={selectedIndex === 5}
                  onClick={(event) => {
                    handleListItemClick(event, 5);
                    dispatch(setDashboardView("qa"));
                    handleClassname();
                  }}
                >
                  <ListItemIcon>
                    <ContactSupportIcon />
                  </ListItemIcon>
                  <ListItemText primary="QA" />
                </ListItemButton>
                <ListItemButton
                  sx={{ padding: "1px 20px" }}
                  selected={selectedIndex === 6}
                  onClick={(event) => {
                    handleListItemClick(event, 6),
                      dispatch(setDashboardView("profile"));
                    handleClassname();
                  }}
                >
                  <ListItemIcon>
                    <SwitchAccountIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </List>
            </Box>
          </WidgetWrapper>
        </Box>
        <Box
          sx={{ maxHeight: "100vh", overflow: "scroll" }}
          flexBasis={isNonMobileScreens ? "75%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
        >
          <Box fullWidth width="100%">
            <OptionalTab />
          </Box>
          {trendingPost != null &&
            trendingPost.length > 0 ?
            trendingPost.map((data) => (
              <PostWidget key={data._id} postData={data} />
            )):
            <div style={{marginTop:"10px"}}>
            <LookingEmpty />
            </div>
            }
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
