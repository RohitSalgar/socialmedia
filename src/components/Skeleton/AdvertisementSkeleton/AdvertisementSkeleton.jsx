import Skeleton from '@mui/material/Skeleton';
import { Box, Divider } from "@mui/material";
import styles from "./index.module.css"

export default function AdvertisementSkeleton() {
  return (
    <Box className={styles.container}>
      <Box className={styles.home}>
          <Skeleton animation="wave" variant="circular" width={100} height={100} />
        <Box sx={{ width: "90%" }}>
            <Box className={styles.chatLeft} >
              <Skeleton variant="rectangular" height={25} width={100} />
              <Skeleton variant="rectangular" height={25} />
            </Box>
            <Box className={styles.chatLeft} >
              <Skeleton variant="rectangular" height={25} width={80} />
              <Skeleton variant="rectangular" height={25} />
            </Box>
            <Box className={styles.chatLeft} >
              <Skeleton variant="rectangular" height={25} width={90} />
              <Skeleton variant="rectangular" height={75} />
            </Box>
            
          <Divider />

          <Skeleton variant="rectangular" height={40} />

        </Box>
      </Box>
    </Box>
  )
}
