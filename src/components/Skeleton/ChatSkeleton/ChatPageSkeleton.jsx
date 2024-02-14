import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';
import { Box, Divider } from "@mui/material";
import styles from "./index.module.css"

export default function ChatPageSkeleton() {
  return (
    <Box className={styles.container}>
      <Box className={styles.home}>
        <Box sx={{ width: "100%" }}>
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

          </Box>
          <Box>
            <Box className={styles.chatLeft} >
              <Skeleton variant="rectangular" height={15} width={100} />
              <Skeleton variant="rectangular" height={15} width={30}/>
            </Box>
            <Box className={styles.chatRight} >
              <Skeleton variant="rectangular" height={15} width={150} />
              <Skeleton variant="rectangular" height={15} width={30}/>
            </Box>
            <Box className={styles.chatRight} >
              <Skeleton variant="rectangular" height={15} width={50} />
              <Skeleton variant="rectangular" height={15} width={30}/>
            </Box>
            <Box className={styles.chatLeft} >
              <Skeleton variant="rectangular" height={15} width={100} />
              <Skeleton variant="rectangular" height={15} width={30}/>
            </Box>
            <Box className={styles.chatRight} >
              <Skeleton variant="rectangular" height={15} width={50} />
              <Skeleton variant="rectangular" height={15} width={30}/>
            </Box>
          </Box>
          <Divider />

          <Skeleton variant="rectangular" height={40} />

        </Box>
      </Box>
    </Box>
  )
}
