import { Box, Button, Input, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEditProfile, useGetProfile } from "../../hooks/profile";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { editProfile } from "../../validation/editProfile";
import { yupResolver } from "@hookform/resolvers/yup";
import { setSideView } from "../../redux/slices/profileSlice";
// import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
const EditProfile = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const dark = palette.neutral.dark;
  const userId = useSelector((state) => state.profile.profileData.userId);
  const { data: profiledate, isLoading } = useGetProfile(userId);
  const editProfileSucess = (data) => {
    dispatch(setSideView("companyPage"));
    // toast.success(data);
  };
  const { mutate, isPending: mutateLoading } =
    useEditProfile(editProfileSucess);
  const [profilePic, setProfilePic] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");

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
    const formData = new FormData();
    formData.append("file", profilePic);
    formData.append("fullName", data.fullName);
    formData.append("designation", data.designation);
    formData.append("about", data.about);
    formData.append("id", userId);
    mutate(formData);
  };

  if (isLoading || mutateLoading) {
   return <Loader />;
  }

  const handleFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePicUrl(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    setProfilePic(event.target.files[0]);
  };

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
          <Typography color={dark} sx={{ fontWeight: "500", fontSize: "20px" }}>
            Edit profile
          </Typography>
          <Button
            sx={{
              fontSize: "20px",
              padding: "0px",
              minWidth: "0px",
              color: "#585858",
            }}
            onClick={() => dispatch(setSideView("companyPage"))}
          >
            X
          </Button>
        </Box>
        <Box className={styles.avatardiv}>
          <Avatar
            alt="B"
            src={profilePicUrl ? profilePicUrl : profiledate?.userData?.profile}
            sx={{ width: 100, height: 100, border: "1px solid #9e9e9e" }}
            className={styles.avathar}
          />
          <label htmlFor="file" className={styles.filelabel}>
            <ModeEditIcon />
          </label>
          <Input
            onChange={handleFileChange}
            type="file"
            id="file"
            inputProps={{ accept: ".png, .jpg, .jpeg" }}
            className={styles.file}
          ></Input>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.editform}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <label htmlFor="fullName">Full Name</label>
                <span style={{ color: "red" }}>*</span>
              </Box>
              {errors?.fullName && (
                <Tooltip
                  style={{
                    fontSize: "14px",
                    color: "red",
                  }}
                  title={errors?.fullName?.message}
                >
                  <InfoIcon />
                </Tooltip>
              )}
            </Box>
            <input
              className={errors.fullName && styles.error}
              id="fullName"
              {...register("fullName")}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <label htmlFor="designation">Designation</label>
                <span style={{ color: "red" }}>*</span>
              </Box>
              {errors?.designation && (
                <Tooltip
                  style={{
                    fontSize: "14px",
                    color: "red",
                  }}
                  title={errors?.designation?.message}
                >
                  <InfoIcon />
                </Tooltip>
              )}
            </Box>
            <input
              className={errors.designation && styles.error}
              id="designation"
              {...register("designation")}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <label htmlFor="about">About</label>
                <span style={{ color: "red" }}>*</span>
              </Box>
              {errors?.about && (
                <Tooltip
                  style={{
                    fontSize: "14px",
                    color: "red",
                  }}
                  title={errors?.about?.message}
                >
                  <InfoIcon />
                </Tooltip>
              )}
            </Box>
            <textarea
              className={errors.about && styles.error}
              style={{ height: "100px" }}
              id="about"
              {...register("about")}
            />
            <Button variant="dark" className={styles.editbtn} type="submit">
              {mutateLoading ? <CircularProgress color="secondary" size={30} /> : "Submit"}
            </Button>
          </form>
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};

export default EditProfile;
