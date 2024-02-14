

import Skeleton from '@mui/material/Skeleton';
import {  Box } from "@mui/material";
import styles from "./index.module.css";

export default function ProfileSkeleton() {
  return (
    <Box className={styles.container}>
      <Box className={styles.profile}>
        <Box className={styles.topProfile} sx={{ width: "90%" }}>
          <Box className={styles.myPost} >
            <Skeleton animation="wave" variant="circular" width={70} height={70} />
          </Box>
          <Box className={styles.myPost} >
            <Skeleton variant="rectangular" height={30} width={30} />
            <Skeleton variant="rectangular" height={30} width={80} />
          </Box>
          <Box className={styles.myPost} >
            <Skeleton variant="rectangular" height={30} width={30} />
            <Skeleton variant="rectangular" height={30} width={80} />
          </Box>
          <Box className={styles.myPost} >
            <Skeleton variant="rectangular" height={30} width={30} />
            <Skeleton variant="rectangular" height={30} width={80} />
          </Box>
          <Box className={styles.myPost} >
            <Skeleton variant="rectangular" height={30} width={30} />
            <Skeleton variant="rectangular" height={30} width={80} />
          </Box>
        </Box>
        <Box className={styles.title} >
          <Box className={styles.myPost} >
            <Skeleton variant="rectangular" height={30} width={80} />
          </Box>
          <Box className={styles.myPost} style={{ opacity: "0" }}>
            <Skeleton variant="rectangular" height={30} width={80} />
          </Box>
          <Box className={styles.myPost} >
            <Skeleton variant="rectangular" height={30} width={80} />
          </Box>
          <Box className={styles.myPost} >
            <Skeleton variant="rectangular" height={30} width={80} />
          </Box>

        </Box>
        <Box className={styles.title} sx={{  marginTop: "20px !important" }}>
          <Skeleton variant="rectangular" height={30} width={80} />

        </Box>
      </Box>
      <Skeleton sx={{ mt: "30px" }} variant="rectangular" height={300} width={"100%"} />
    </Box>
  )
}
