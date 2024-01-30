import { Box, Button, Typography, useTheme, Input } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setEditOff } from "../../redux/slices/chat";
import Loader from "../Loader/Loader";
import { createCompany } from "../../validation/createCompany";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateCompany } from "../../hooks/pages";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useGetProfile } from "../../hooks/profile";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { setSideView } from "../../redux/slices/profileSlice";


const CreateCompany = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const dark = palette.neutral.dark;
  const userId = useSelector((state) => state.profile.profileData.userId);
  const { data: profiledate, isLoading: profileLoading } =
    useGetProfile(userId);
  const { mutate, isLoading: mutateLoading } = useCreateCompany();
  const [profilePic, setProfilePic] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCompany),
    mode: "onChange",
    defaultValues: {
      companyName: "",
      email: "",
      licenseNo: "",
      about: "",
    },
  });
  const handleFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePicUrl(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    setProfilePic(event.target.files[0]);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", profilePic);
    formData.append("companyName", data.companyName);
    formData.append("email", data.email);
    formData.append("licenseNo", data.licenseNo);
    formData.append("about", data.about);
    formData.append("createdBy", userId);
    mutate(formData);
  };

  if (mutateLoading || profileLoading) {
    return <Loader />;
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
          <Typography color={dark} sx={{ fontWeight: "500", fontSize: "20px" }}>
            Company Page
          </Typography>
          <Button
            sx={{
              fontSize: "20px",
              padding: "0px",
              minWidth: "0px",
              color: "#585858",
            }}
            onClick={() => dispatch(setSideView('companyPage'))}
          >
            X
          </Button>
        </Box>
        <Box className={styles.avatardiv}>
          <Avatar
            alt="B"
            src={profilePicUrl ? profilePicUrl : profiledate.userData.profile}
            sx={{ width: 80, height: 80 }}
            className={styles.avathar}
          />
          <label htmlFor="file" className={styles.filelabel}>
            <ModeEditIcon />
          </label>
          <Input
            onChange={handleFileChange}
            type="file"
            id="file"
            accept="image/*"
            className={styles.file}
          ></Input>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.editform}>
            <label htmlFor="companyName">Company Name</label>
            <input
              className={errors.companyName && styles.error}
              id="companyName"
              {...register("companyName")}
            />
            <label htmlFor="email">Email</label>
            <input
              className={errors.email && styles.error}
              id="email"
              {...register("email")}
            />
            <label htmlFor="licenseNo">License No</label>
            <input
              className={errors.licenseNo && styles.error}
              id="licenseNo"
              {...register("licenseNo")}
            />
            <label htmlFor="about">About</label>
            <textarea
              className={errors.about && styles.error}
              style={{ height: "30px" }}
              id="about"
              {...register("about")}
            />
            <button
              className={styles.submitbtn}
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Submit
            </button>
          </form>
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};

export default CreateCompany;
