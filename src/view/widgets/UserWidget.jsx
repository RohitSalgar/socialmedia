import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  ListItem,
  List,
} from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const UserWidget = ({ image }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  console.log(image, "userrr");

  return (
    <WidgetWrapper>
      <Box sx={{
        display : 'flex',
        justifyContent:"center"
      }}>{/* <UserImage image={image} /> */}
      </Box>
      <div>
        {/* <FlexBetween gap="1rem"> */}
        <Box>
          <Typography variant="h4" color={dark} fontWeight="500">
            Hi Vijay
          </Typography>
          <Typography color={medium}>{"10"} friends</Typography>
        </Box>
        {/* </FlexBetween> */}
        <ManageAccountsOutlined />
      </div>

      <Divider />

      <Box p="0.1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="small" sx={{ color: main }} />
          <Typography color={medium}>{"chennai"}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="small" sx={{ color: main }} />
          <Typography color={medium}>{"it"}</Typography>
        </Box>
      </Box>

      <Divider />
      <Box p="0.1rem 0">
        <List>
          <ListItem>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary="News Feed" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Live Shipments News" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="QA" />
          </ListItem>
        </List>
      </Box>

      <Divider />
    </WidgetWrapper>
  );
};

export default UserWidget;
