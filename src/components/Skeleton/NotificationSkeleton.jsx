import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton'
export function NotificationSkeleton(){
    return(
        <div style={{ display:'flex',padding:"10px", alignItems:"center", gap:"5px"}}>
    <Skeleton variant="circular" width={25} height={25}>
    <Avatar />
  </Skeleton>
  <Skeleton
              animation="wave"
              height={10}
              width="80%"
            />
  </div>
    )
}