import { Box, Button, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setEditOff } from "../../redux/slices/chat";
import { useEditProfile, useGetProfile } from "../../hooks/profile";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import { createCompany } from "../../validation/createCompany";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateCompany } from "../../hooks/pages";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const dark = palette.neutral.dark;
  const userId = useSelector((state) => state.profile.profileData.userId);
  // const { data: profiledate, isLoading } = useGetProfile(userId);
  const { mutate, isLoading: mutateLoading } = useCreateCompany();

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

  const onSubmit = (data) => {
    data.createdBy = userId;
    mutate(data);
  };

  if (mutateLoading) {
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
            Create Company Page
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
              style={{ height: "100px" }}
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
