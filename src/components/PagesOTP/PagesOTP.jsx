import { Box, Button, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setEditOff } from "../../redux/slices/chat";
import Loader from "../Loader/Loader";
import { createCompany } from "../../validation/createCompany";
import { useCreateCompany } from "../../hooks/pages";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const dark = palette.neutral.dark;
  const primary = palette.neutral.primary;
  const userId = useSelector((state) => state.profile.profileData.userId);
  const { mutate, isLoading: mutateLoading } = useCreateCompany();

  const {
    control,
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
      <Typography color={medium} m="0.5rem 0" sx={{minHeight:'75vh'}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={dark} sx={{ fontWeight: "500", fontSize: "20px" }}>
            Enter OTP
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
        <Box
          sx={{
            mt: 5,
            mx: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          {/* <Typography
            component="h1"
            variant="h4"
            color={primary}
            sx={{
              fontWeight: "bold",
              pb: "10px",
            }}
          >
            Enter OTP
          </Typography>
          <Typography paragraph color={dark}>
            OTP sent to
          </Typography> */}
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit(saveData)}
            sx={{ mt: 1 }}
            className={styles.loginformdiv}
          >
            <div className={styles.otplabel}>
              <Typography className={styles.otptxt} color={dark}>
                OTP <span style={{ color: "red" }}>*</span>
              </Typography>
              <Link
                to={`/register`}
                className={styles.changeEmail}
                color={primary}
                sx={{ color: "red" }}
              >
                Change Email
              </Link>
            </div>
            <div className={styles.otpdiv}>
              <Controller
                name={`otp1`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    onChange={(event) =>
                      field.onChange(event.target.value.replace(/[^\d]+/g, ""))
                    }
                    maxLength={1}
                    id="1"
                    className={styles.otp}
                    // placeholder="*"
                    onKeyUp={(event) => {
                      codeChangeHandler(event);
                    }}
                  />
                )}
              />
              <Controller
                name={`otp2`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    onChange={(event) =>
                      field.onChange(event.target.value.replace(/[^\d]+/g, ""))
                    }
                    maxLength={1}
                    id="2"
                    className={styles.otp}
                    placeholder="*"
                    onKeyUp={(event) => {
                      codeChangeHandler(event);
                    }}
                  />
                )}
              />
              <Controller
                name={`otp3`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    onChange={(event) =>
                      field.onChange(event.target.value.replace(/[^\d]+/g, ""))
                    }
                    maxLength={1}
                    id="3"
                    className={styles.otp}
                    placeholder="*"
                    onKeyUp={(event) => {
                      codeChangeHandler(event);
                    }}
                  />
                )}
              />
              <Controller
                name={`otp4`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    onChange={(event) =>
                      field.onChange(event.target.value.replace(/[^\d]+/g, ""))
                    }
                    maxLength={1}
                    id="4"
                    className={styles.otp}
                    placeholder="*"
                    onKeyUp={(event) => {
                      codeChangeHandler(event);
                    }}
                  />
                )}
              />
              <Controller
                name={`otp5`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    onChange={(event) =>
                      field.onChange(event.target.value.replace(/[^\d]+/g, ""))
                    }
                    maxLength={1}
                    id="5"
                    className={styles.otp}
                    placeholder="*"
                    onKeyUp={(event) => {
                      codeChangeHandler(event);
                    }}
                  />
                )}
              />
              <Controller
                name={`otp6`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    onChange={(event) =>
                      field.onChange(event.target.value.replace(/[^\d]+/g, ""))
                    }
                    maxLength={1}
                    id="6"
                    className={styles.otp}
                    placeholder="*"
                    onKeyUp={(event) => {
                      codeChangeHandler(event);
                    }}
                  />
                )}
              />
              {/* <img src={Line} className={styles.otpline} alt="" /> */}
            </div>
            {Object.keys(errors).length > 0 && (
              <p className={styles.errormsg}>Enter Valid OTP</p>
            )}
            <Button
              type="submit"
              fullWidth
              //   disabled={otpPost.isLoading || resendOtpData.isLoading}
              sx={{
                mt: 3,
                mb: 2,
                background: `${primary}`,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Submit
            </Button>
          </Box>
          <div className={styles.receiveotp}>
            <p>Didnt Receive OTP? </p>
            <p
              //   onClick={() => resendOtpData.mutate()}
              className={styles.forgot}
              //   color={primary}
            >
              Resend
            </p>
          </div>
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};

export default CreateCompany;
