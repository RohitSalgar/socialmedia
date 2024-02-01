import styles from "./index.module.css";
import { Box, useTheme, Button } from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { useAddSchedule } from "../../../../hooks/schedule";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddScheduleValidation } from "../../../../validation/addSchedule";
import { useSelector } from "react-redux";

const AddSchedule = () => {
  const { mutate } = useAddSchedule();
  const profileData = useSelector((state) => state.profile.profileData);
  const companyId = useSelector((state) => state.profile.companyId);
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddScheduleValidation),
    mode: "onChange",
    defaultValues: {
      pol: "",
      pod: "",
      description: "",
      bookingDate: null,
      openingDate: null,
    },
  });

  const { palette } = useTheme();

  const onSubmit = (data) => {
    let payload = { ...data };

    let bookingDate = new Date(data.bookingDate);
    let openingDate = new Date(data.openingDate);
    payload.createBy = profileData?.userId;
    payload.companyId = companyId;
    payload.bookingCutOff = bookingDate?.toISOString();
    payload.openingOn = openingDate?.toISOString();
    mutate(payload);
    reset();
  };

  return (
    <>
      <WidgetWrapper>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <FlexBetween>
            <Box
              className={styles.AddScheduleDiv}
              sx={{marginBottom:"10px"}}
            >
              <TextField
                id="outlined-multiline-static"
                className={errors.pol && styles.error}
                rows={1}
                placeholder="POL"
                {...register("pol")}
                name="pol"
                sx={{
                  width: "100%",
                  borderRadius: "1rem",
                }}
              />
              <TextField
                id="outlined-multiline-static"
                rows={1}
                placeholder="POD"
                className={errors.pod && styles.error}
                name="pod"
                {...register("pod")}
                sx={{
                  width: "100%",
                  borderRadius: "1rem",
                }}
              />
            </Box>
          </FlexBetween>
          
          <Box 
          >
            <FlexBetween className={styles.dateinput} sx={{marginBottom:"1rem"}}>
              <Controller
                name="openingDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    className={errors.openingDate && styles.error}
                    format="DD-MM-YYYY"
                    label="Opening Date"
                    onChange={(e) => field.onChange(e)}
                    sx={{
                      width: "100%",
                      borderRadius: "1rem",
                      marginRight: "1%",
                    }}
                  />
                )}
              />
              <Controller
                name="bookingDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    className={errors.bookingDate && styles.error}
                    format="DD-MM-YYYY"
                    label="Booking Cut-Off"
                    onChange={(e) => field.onChange(e)}
                    sx={{
                      width: "100%",
                      borderRadius: "1rem",
                      marginLeft: "1%",
                    }}
                  />
                )}
              />
            </FlexBetween>
          </Box>
          <FlexBetween className={styles.inputdiv} flexDirection={"column"}>
            <TextField
              id="outlined-multiline-static"
              multiline
              className={errors.description && styles.error}
              rows={1}
              {...register("description")}
              placeholder="Description..."
              name="description"
              sx={{
                width: "100%",
                borderRadius: "1rem",
              }}
            />
          </FlexBetween>
          <Box>
            <Button
              type="submit"
              className={styles.btns}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "1rem",
                marginTop: "1rem",
                mr: "10px",
                marginLeft:"75%",
              }}
            >
              Post Schedule
            </Button>
          </Box>
        </form>
      </WidgetWrapper>
    </>
  );
};

export default AddSchedule;
