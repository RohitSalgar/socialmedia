import WidgetWrapper from "../../../../components/WidgetWrapper";
import { Box, Typography } from "@mui/material";
import styles from "./index.module.css";
import LikeComment from "./LikeComment";
import { useGetAllSchedules } from "../../../../hooks/schedule";
import Loader from "../../../../components/Loader/Loader";
import moment from "moment";
import PostTitle from "./PostTitle";
import LookingEmpty from "../../../../components/LookingEmpty/LookingEmpty";

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
                <WidgetWrapper key={i} sx={{ marginBottom: "10px" }}>
                  <PostTitle data={e} />
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
        <LookingEmpty/>
      )}
    </>
  );
};

export default ScheduleList;
