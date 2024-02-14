
import Skeleton from '@mui/material/Skeleton';
import {  Box, ListItemButton, ListItemIcon } from "@mui/material";
import styles from "./index.module.css"
import {
  Divider,
  List,
  ListItemText,
} from "@mui/material";
import {
  Inbox as InboxIcon,
  Mail as MailIcon,
  CalendarMonth as CalendarMonthIcon,
  ContactSupport as ContactSupportIcon,
  SwitchAccount as SwitchAccountIcon,
  Newspaper as NewspaperIcon
} from "@mui/icons-material";

export default function UserWidgetSkeleton() {
  return (
    <Box style={{ marginTop: "100px" }}>
      <Box >
          <Box >
            <Box>
              <Box className={styles.profile}>
                <Skeleton variant="circular" width={80} height={80}>
                </Skeleton>
                <Box className={styles.name}>
                  <Skeleton variant="rectangular" height={10} width={150} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box p="0">
              <List
                className={`sidebarddiv ${styles.sidebartitle}`}
                component="nav"
                aria-label="main mailbox folders"
              >
                {/* Home */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
                {/* News Feed */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <NewspaperIcon />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
                {/* Schedule */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
                {/* Company Page */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
                {/* QA */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <ContactSupportIcon />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
                {/* Profile */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <SwitchAccountIcon />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
              </List>
            </Box>
            <Divider />
          </Box>
      </Box>
    </Box>
  )
}
