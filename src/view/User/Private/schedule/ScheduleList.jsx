import FlexBetween from "../../../../components/FlexBetween";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import styles from "./index.module.css";
import LikeComment from "./LikeComment";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDeleteSchedule,
  useGetAllMySchedules,
} from "../../../../hooks/schedule";
import Loader from "../../../../components/Loader/Loader";
import { useSelector } from "react-redux";
import moment from "moment";

const ScheduleList = () => {
  const profileData = useSelector((state) => state.profile.profileData);
  const { data, isLoading } = useGetAllMySchedules(profileData?.userId);
  const { mutate } = useDeleteSchedule();

  let postList = [1];

  if (isLoading) {
    return <Loader />;
  }

  const deleteSchedule = (id) => {
    let payload = {};
    payload.scheduleId = id;
    payload.companyId = profileData?.userId;
    mutate(payload);
  };

  return (
    <>
      {data &&
        data.map((e, i) => {
          return (
            <WidgetWrapper sx={{ marginTop: "1rem" }} key={i}>
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
                <Box>
                  <DeleteIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => deleteSchedule(e._id)}
                  />
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
                {postList?.map((data) => (
                  <LikeComment
                    key={data._id}
                    postData={data}
                    scheduleId={e._id}
                  />
                ))}
              </Box>
            </WidgetWrapper>
          );
        })}
    </>
  );
};

export default ScheduleList;
