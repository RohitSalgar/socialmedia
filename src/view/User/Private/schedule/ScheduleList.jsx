import WidgetWrapper from "../../../../components/WidgetWrapper";
import { Box, Typography } from "@mui/material";
import styles from "./index.module.css";
import LikeComment from "./LikeComment";
import { useGetAllSchedules } from "../../../../hooks/schedule";
import Loader from "../../../../components/Loader/Loader";
import moment from "moment";
import PostTitle from "./PostTitle";

const ScheduleList = () => {
  const { data, isLoading } = useGetAllSchedules();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data && data.length > 0 ? (
        <>
          {data &&
            data.map((e, i) => {
              return (
                <WidgetWrapper key={i} sx={{ marginTop: "20px" }}>
                  <PostTitle data={e} />
                  {console.log(e)}
                  <Box className={styles.scheduleListDiv}>
                    <Box>
                      <Box className={styles.scheduleListSubDiv}>
                        <Typography>POL: </Typography>{" "}
                        <Typography>{e.pol}</Typography>
                      </Box>
                      <Box className={styles.scheduleListSubDiv}>
                        <Typography>POD: </Typography>{" "}
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
                      <p>{e.description} </p>
                    </Box>
                  )}
                  <Box>
                    <LikeComment key={e._id} postData={e} scheduleId={e._id} />
                  </Box>
                </WidgetWrapper>
              );
            })}
        </>
      ) : (
        // <Box sx={{ margin: "2rem" }}>
        //   <Typography sx={{ textAlign: "center" }}>No Schedule</Typography>
        // </Box>
        <WidgetWrapper >
          <Box className={styles.scheduleListDiv} sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>

            <Typography>No Schedule </Typography>{" "}

          </Box>

          <Box>
          </Box>
        </WidgetWrapper>
      )}
    </>
  );
};

export default ScheduleList;
