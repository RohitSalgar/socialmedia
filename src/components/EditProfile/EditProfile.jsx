import { Box, Button, Input, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import rohitimg from "../../assets/images/sanjai.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setEditOff } from "../../redux/slices/chat";
import { useEditProfile, useGetProfile } from "../../hooks/profile";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { editProfile } from "../../validation/editProfile";
import { yupResolver } from "@hookform/resolvers/yup";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const profileheadclr = palette.black.medium;
  const userId = useSelector((state) => state.profile.profileData.userId);
  const { data: profiledate, isLoading } = useGetProfile(userId);
  const { mutate, isLoading: mutateLoading } = useEditProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(editProfile),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      designation: "",
      about: "",
    },
  });

  const editData = {
    fullName: profiledate?.userData?.fullName,
    designation: profiledate?.userData?.designation,
    about: profiledate?.userData?.about,
  };

  useEffect(() => {
    reset(editData);
  }, [profiledate]);

  const onSubmit = (data) => {
    data.id = userId;
    mutate(data);
  };

  if (isLoading || mutateLoading) {
    <Loader />;
  }

  return (
    <WidgetWrapper className={styles.editdiv}>
      <Typography color={medium} m="0.5rem 0">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            color={profileheadclr}
            sx={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Edit profile
          </Typography>
          <Button
            sx={{
              fontSize: "20px",
              padding: "0px",
              minWidth: "0px",
              color: "#585858",
            }}
            onClick={() => dispatch(setEditOff())}
          >
            X
          </Button>
        </Box>
        <Box className={styles.avatardiv}>
          <Avatar
            alt="B"
            src={rohitimg}
            sx={{ width: 100, height: 100 }}
            className={styles.avathar}
          />
          <label htmlFor="file" className={styles.filelabel}>
            <ModeEditIcon />
          </label>
          <Input type="file" id="file" className={styles.file}></Input>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.editform}>
            <label htmlFor="fullName">Full Name</label>
            <input
              className={errors.name && styles.error}
              id="fullName"
              {...register("fullName")}
            />
            <label htmlFor="designation">Designation</label>
            <input
              className={errors.designation && styles.error}
              id="designation"
              {...register("designation")}
            />
            <label htmlFor="about">About</label>
            <textarea
              className={errors.about && styles.error}
              style={{ height: "100px" }}
              id="about"
              {...register("about")}
            />
            <button className={styles.submitbtn} type="submit">
              Submit
            </button>
          </form>
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};

export default EditProfile;
