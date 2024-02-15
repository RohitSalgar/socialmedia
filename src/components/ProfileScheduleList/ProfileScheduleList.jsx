import WidgetWrapper from "../../components/WidgetWrapper";
import { Box, Typography } from "@mui/material";
import styles from "./index.module.css";
import LikeComment from "./LikeComment";
import { useGetAllMySchedules } from "../../hooks/schedule";
import Loader from "../../components/Loader/Loader";
import moment from "moment";
import PostTitle from "./PostTitle";
import LookingEmpty from "../../components/LookingEmpty/LookingEmpty";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import PostSkeleton from "../../components/Skeleton/PostSkeleton";
import { AdvertisementWidget } from "../../view/User/Private/Posts/AdvertisementWidget";

const ScheduleList = () => {
  // const { ref, inView } = useInView();
  // const { hashtag } = useSelector((state) => state.post);
  // const dashboardView = useSelector((state) => state.profile.dashboardView);
  const { companyId } = useSelector((state) => state.profile);
  const { data, isLoading } = useGetAllMySchedules(companyId);

  // useEffect(() => {
  //   if (inView) {
  //     if (
  //       hashtag === "" &&
  //       dashboardView === "schedule" &&
  //       !data?.pageParams.includes(Math.ceil(data?.pages[0]?.totalCount / 5))
  //     ) {
  //       scheduleFetchNextPage();
  //     }
  //   }
  // }, [inView]);

  if (isLoading) {
    return <Loader />;
  }


  return (
    <>
      {data && data?.length > 0 ? (
        data.map((e, i) => (
          <Box key={i}>
            {e?.title ? (
              <AdvertisementWidget postData={e} />
            ) : (
              <>
                <WidgetWrapper key={i} sx={{ marginBottom: "10px" }}>
                  <PostTitle data={e} />
                  <Box className={styles.scheduleListDiv}>
                    <Box>
                      <Box className={styles.scheduleListSubDiv}>
                        <Typography>POL: </Typography>
                        <Typography>{e.pol}</Typography>
                      </Box>
                      <Box className={styles.scheduleListSubDiv}>
                        <Typography>POD: </Typography>
                        <Typography>{e.pod}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Box className={styles.scheduleListSubDiv}>
                        <Typography>Opening On: </Typography>
                        <Typography>
                          {moment(e.openingOn).format("DD-MM-YYYY")}
                        </Typography>
                      </Box>
                      <Box className={styles.scheduleListSubDiv}>
                        <Typography>Booking Cut-Off: </Typography>
                        <Typography>
                          {moment(e.bookingCutOff).format("DD-MM-YYYY")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {e.description !== "" && (
                    <Box className={styles.descriptiondiv}>
                      <p>{e.description}</p>
                    </Box>
                  )}
                  <Box>
                    <LikeComment key={e._id} postData={e} scheduleId={e._id} />
                  </Box>
                </WidgetWrapper>
              </>
            )}
          </Box>
        ))
      ) : (
        <div style={{ marginTop: "10px" }}>
          <LookingEmpty />
        </div>
      )}
      {/* 
      {!data?.pageParams.includes(
        Math.ceil(data?.pages[0]?.totalCount / 5)
      ) && <PostSkeleton />}
      <div
        ref={ref}
        style={{ height: "10px" }}
        onClick={() => scheduleFetchNextPage()}
      >
        {scheduleFetchingNextPage && <PostSkeleton />}
      </div> */}
      {/* {(!data || !data.pages || data.pages.length === 0) && (
        <div style={{ marginTop: "10px" }}>
          <LookingEmpty />
        </div>
      )} */}
    </>
  );
};

export default ScheduleList;
