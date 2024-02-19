import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { Avatar, Box, ListItemButton, ListItemIcon } from "@mui/material";
import styles from "./index.module.css"
import {
  IconButton,
} from "@mui/material";
import {
  Divider,
  List,
  ListItemText,
} from "@mui/material";

export default function DashboardSkeleton() {
  return (
    <Box className={styles.container}>
      <Box className={styles.navbar}>
        <Skeleton animation="wave" width={200} height={60} />
        <IconButton disabled>
          <Skeleton animation="wave" width={400} height={60} />
        </IconButton>
        <Box className={styles.navRight}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </Box>
      <Box className={styles.home}>
        {/* Adjust the height here */}
        <Box sx={{ width: "25%" }}>
          <Box >
            <Box>
              {/* Profile Information */}
              <Box className={styles.profile}>
                <Skeleton variant="circular" width={50} height={50}>
                  <Avatar />
                </Skeleton>
                <Skeleton
                  animation="wave"
                  height={20}
                  width="60%"
                />
              </Box>            </Box>
            <Divider />
            <Box p="0">
              {/* Sidebar List */}
              <List
                className={`sidebarddiv ${styles.sidebartitle}`}
                component="nav"
                aria-label="main mailbox folders"
              >
                {/* Home */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <Skeleton width={25} />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
                {/* News Feed */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <Skeleton width={25} />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
                {/* Schedule */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <Skeleton width={25} />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
                {/* Company Page */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <Skeleton width={25} />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
                {/* QA */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <Skeleton width={25} />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
                {/* Profile */}
                <ListItemButton sx={{ padding: "1px 20px" }}>
                  <ListItemIcon>
                    <Skeleton width={25} />                  </ListItemIcon>
                  <ListItemText primary={<Skeleton width={100} />} />
                </ListItemButton>
              </List>
            </Box>
            <Divider />
          </Box>
        </Box>
        <Box sx={{ width: "48%", marginTop: "30px" }}>
          <Box className={styles.myPost}>
            <Skeleton variant="rectangular" height={50} />
            <Box className={styles.myPostAction}>
              <Skeleton variant="rectangular" height={30} width={30} />
              <Skeleton variant="rectangular" height={30} width={80} />
            </Box>
          </Box>
          <Skeleton variant="rectangular" height={60} />
          <Box>
            <CardHeader
              avatar={
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
              }
              action={null}
              title={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={
                <Skeleton animation="wave" height={10} width="40%" />

              }
            />
            <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />

            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            </CardContent>
          </Box>
          <Box>
            <CardHeader
              avatar={
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
              }
              action={null}
              title={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={
                <Skeleton animation="wave" height={10} width="40%" />

              }
            />
            <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />

            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            </CardContent>
          </Box>
        </Box>
        <Box sx={{ width: "25%", paddingRight: "20px" }}>
          <Skeleton variant="rectangular" height={200} sx={{ marginBottom: "20px" }} />
          <Skeleton variant="rectangular" height={200} />

        </Box>
      </Box>
    </Box>
  )
}
