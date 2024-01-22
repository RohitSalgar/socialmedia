import { Box, Button, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import rohitimg from "../../assets/images/sanjai.png";
import { useForm } from "react-hook-form";

const EditProfile = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const profileheadclr = palette.black.medium;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <WidgetWrapper className={styles.editdiv}>
      <Typography color={medium} m="0.5rem 0">
        <Typography
          color={profileheadclr}
          sx={{ fontWeight: "bold", fontSize: "20px" }}
        >
          Edit profile
        </Typography>
        <Box className={styles.avatardiv}>
          <Avatar alt="B" src={rohitimg} sx={{ width: 100, height: 100 }} />
          <Button variant="contained" className={styles.changeimgbtn}>
            Change Image
          </Button>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.editform}>
            <label htmlFor="name">Name</label>
            <input id="name" {...register("name")} />
            <label htmlFor="designation">Designation</label>
            <input id="designation" {...register("designation")} />
            <label htmlFor="name">Bio</label>
            <textarea {...register("bio")} />
            <button className={styles.submitbtn} type="submit">Submit</button>
          </form>
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};

export default EditProfile;
