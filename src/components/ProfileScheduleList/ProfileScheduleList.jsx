import FlexBetween from "../FlexBetween";
import WidgetWrapper from "../WidgetWrapper";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import styles from "./index.module.css";
import LikeComment from "./LikeComment";
import { useDeleteSchedule, useGetAllSchedules } from "../../hooks/schedule";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import moment from "moment";
import PostTitle from "./PostTitle";
import { useGetAllMySchedules } from "../../hooks/schedule";

const ProfileScheduleList = () => {
  const companyId = useSelector((state) => state.profile.companyId);
  const profileCompanyId = useSelector((state) => state.profile.viewCompanyId);
  //   const { data, isLoading } = useGetAllSchedules();
  const { mutate } = useDeleteSchedule();

  const { data, isLoading } = useGetAllMySchedules(profileCompanyId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data &&
        data.map((e, i) => {
          return (
            <WidgetWrapper key={i} sx={{ marginBottom: "20px" }}>
              <PostTitle data={e} />
              <Box className={styles.scheduleListDiv}>
                <Box className={styles.scheduleListSubDiv}>
                  <Typography>POL: </Typography>{" "}
                  <Typography>{e.pol}</Typography>
                </Box>
                <Box className={styles.scheduleListSubDiv}>
                  <Typography>POD: </Typography>{" "}
                  <Typography>{e.pod}</Typography>
                </Box>
                <Box className={styles.scheduleListSubDiv}>
                  <Typography>Cut Off: </Typography>
                  <Typography>
                    {moment(e.bookingCutOff).format("DD-MM-YYYY")}
                  </Typography>
                </Box>
              </Box>
              {e.description !== "" && (
                <FlexBetween flexDirection={"column"}>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={2}
                    value={e.description}
                    disabled
                    name="description"
                    sx={{
                      width: "100%",
                      border: "none",
                    }}
                  />
                </FlexBetween>
              )}
              <Box>
                <LikeComment key={e._id} postData={e} scheduleId={e._id} />
              </Box>
            </WidgetWrapper>
          );
        })}
    </>
  );
};

export default ProfileScheduleList;
