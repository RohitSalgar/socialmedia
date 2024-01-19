
import {
  Box,
  Typography,
  Divider,
  useTheme,
  ListItem,
  List,
} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import WidgetWrapper from "../../../components/WidgetWrapper";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ListItemButton from '@mui/material/ListItemButton';
import { useState } from "react";

const UserWidget = ({ image }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ width: 100, height: 100 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
            Vijayaragavan
          </Typography>
          <Typography sx={{ mt: 1 }} color={dark} variant="h6" fontWeight="400">
            MERN stack Developer
          </Typography>
        </Box>
        <div style={{ display: "flex", alignItems: "center", margin: "auto", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "10px",
              width: "80%"
            }}
          >

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: "3px"
              }}
            >
              <Typography color={dark} variant="h5" fontWeight="500">
                100
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
                mt: "3px"
              }}
            >
              <Typography color={dark} variant="h5" fontWeight="500">
                2000
              </Typography>
              <Typography color={dark} variant="h6" fontWeight="400">
                Following
              </Typography>
            </Box>

          </Box>
        </div>
      </div>

      <Divider style={{ marginTop: "10px" }} />

      <Box p="0 0 0.1rem 1.5rem">
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary="News Feed" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Shipments News" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="QA" />
          </ListItemButton>
        </List>
      </Box>

      <Divider />
    </WidgetWrapper>
  );
};

export default UserWidget;
