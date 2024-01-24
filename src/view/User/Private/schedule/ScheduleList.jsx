import FlexBetween from "../../../../components/FlexBetween";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import styles from "./index.module.css";

const ScheduleList = () => {
  let ScheduleList = [
    {
      pol: "Chennai",
      pod: "Dubai",
      bookingDate: "23-10-24",
      description: "rate are based on CBM",
    },
    {
      pol: "Chennai",
      pod: "Dubai",
      bookingDate: "23-10-24",
      description:
        "rate are based on CBM . CBM changes rate will be reflected in dashboard ",
    },
  ];
  return (
    <>
      {ScheduleList.map((e, i) => {
        return (
          <WidgetWrapper sx={{ marginTop: "1rem" }} key={i}>
            <Box className={styles.scheduleListDiv}>
              <Box className={styles.scheduleListSubDiv}>
                <Typography>POL: </Typography> <Typography>{e.pol}</Typography>
              </Box>
              <Box className={styles.scheduleListSubDiv}>
                <Typography>POD: </Typography> <Typography>{e.pod}</Typography>
              </Box>
              <Box className={styles.scheduleListSubDiv}>
                <Typography>Cut Off: </Typography>
                <Typography>{e.bookingDate}</Typography>
              </Box>
            </Box>
            <FlexBetween flexDirection={"column"}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={2}
                placeholder="Description..."
                value={e.description}
                disabled
                name="description"
                sx={{
                  width: "100%",
                  borderRadius: "1rem",
                }}
              />
            </FlexBetween>
          </WidgetWrapper>
        );
      })}
    </>
  );
};

export default ScheduleList;
