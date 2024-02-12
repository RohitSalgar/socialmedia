import { Alert, Box, Divider, Typography } from "@mui/material";
import styles from "./index.module.css";
import { useEffect, useRef, useState } from "react";
import NotificationTemplate from "./NotificationTemplate";
import {
  useGetAllNotificationById,
  useGetAllPostTagNotificationById,
} from "../../hooks/notifications";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import LookingEmpty from "../LookingEmpty/LookingEmpty";
import moment from "moment";
import { PAGE_SIZE } from "../../config";
import { useInView } from "react-intersection-observer";
import { setSideView } from "../../redux/slices/profileSlice";
import { useGetProfile } from "../../hooks/profile";
import { NotificationSkeleton } from "../Skeleton/NotificationSkeleton";

const NotificationContent = () => {
  const [selected, setSelected] = useState("myposts");
  const { ref, inView } = useInView();
  // const notificationRef = useRef();
  const { hashtag } = useSelector((state) => state.post);
  const { userId } = useSelector((state) => state.profile.profileData);
  const { data:profiledata} = useGetProfile(userId);
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useGetAllNotificationById(userId);
  const { data: postTagData, isLoading: postTagLOading,isFetchingNextPage:postTagisFetchingNextPage,fetchNextPage:postTagfetchNextPage } =
    useGetAllPostTagNotificationById(profiledata?.userData?.userName);
  const handleClick = (props) => {
    setSelected(props);
  };
  // useEffect(() => {
  //   if (notificationRef.current) {
  //     notificationRef.current.scrollTop = notificationRef.current.scrollHeight;
  //   }
  // }, [notificationRef.current]);

  useEffect(() => {
    if (inView) {
      if (
        selected === "myposts" &&
        !data?.pageParams.includes(
          Math.ceil(data?.pages[0]?.totalCount / PAGE_SIZE)
        )
      ) {
        fetchNextPage();
      }
      else if(
        selected === "mention" &&
        !postTagData?.pageParams.includes(
          Math.ceil(postTagData?.pages[0]?.totalCount / PAGE_SIZE)
        )
      ){
        postTagfetchNextPage()
      }
    }
  }, [inView, hashtag, setSideView, data,postTagData]);

  if (isLoading || postTagLOading) {
    return <Loader />;
  }


  // const filterDataByTag = () => {
  //   let array = [];
  //   if (selected === "all") {
  //     array = Array.from([...data?.pages, ...postTagData?.pages]);
  //   }
  //   if (selected === "myposts") {
  //     array = Array.from([...data?.pages]);
  //   }
  //   if (selected === "mention") {
  //     array = Array.from([...postTagData?.pages]);
  //   }

  //   return array.sort((a, b) => {
  //     return moment(b.createdAt) - moment(a.createdAt);
  //   });
  // };

  return (
    <Box sx={{ marginLeft: "-0.9rem", marginRight: "-0.9rem" }}>
      <Box className={styles.optionDiv}>
        <Box
          className={`${selected === "all" && styles.selectedButton} ${
            styles.buttonDiv
          }`}
          onClick={() => handleClick("all")}
        >
          <Typography>All</Typography>
        </Box>
        <Box
          className={`${selected === "myposts" && styles.selectedButton} ${
            styles.buttonDiv
          }`}
          onClick={() => handleClick("myposts")}
        >
          <Typography>My Posts</Typography>
        </Box>
        <Box
          className={`${selected === "mention" && styles.selectedButton} ${
            styles.buttonDiv
          }`}
          onClick={() => handleClick("mention")}
        >
          <Typography>Mention</Typography>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "0.2rem" }} />
      <Box className={styles.notificationMainDiv} >
        {data && data?.pages?.length > 0 ? (
          <>
            {selected === "myposts" &&
              data.pages?.map(({ data }) =>
                data
                  .filter((e) => e.status !== 0)
                  .map((e, i) => <NotificationTemplate key={i} data={e} />)
              )
              }
            {selected === "myposts" && !data?.pageParams?.includes(
              Math.ceil(data.pages[0]?.totalCount / 10)
            ) &&<NotificationSkeleton/>}
            { selected === "myposts" && <div
              ref={ref}
              style={{ height: "10px"}}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage && <NotificationSkeleton />}
            </div>}
            {selected === "mention" &&
              postTagData.pages?.map(({ data }) =>
                data
                  .filter((e) => e.status !== 0)
                  .map((e, i) => <NotificationTemplate key={i} data={e} />)
              )}
            {selected === "mention" && !postTagData?.pageParams?.includes(
              Math.ceil(postTagData.pages[0]?.totalCount / 10)
            ) && <NotificationSkeleton />}
            {selected === "mention" &&  <div
              ref={ref}
              style={{ height: "10px" }}
              onClick={() => postTagfetchNextPage()}
            >
              {postTagisFetchingNextPage && <NotificationSkeleton />}
            </div>}
          </>
        ) : (
          <LookingEmpty />
        )}
      </Box>
    </Box>
  );
};

export default NotificationContent;
