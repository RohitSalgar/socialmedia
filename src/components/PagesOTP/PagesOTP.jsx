import { Box, Button, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setEditOff } from "../../redux/slices/chat";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { useGetProfile } from "../../hooks/profile";
import { otpValidation } from "../../Validations/OtpValidations";
import { URL } from "../../config";
import { setSideView } from "../../redux/slices/profileSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../../helper";
import { toast } from "react-toastify";

const PagesOTP = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const dark = palette.neutral.dark;
  const primary = palette.neutral.primary;
  const profileId = useSelector((state) => state.profile.viewProfileId);
  const { data, isLoading } = useGetProfile(profileId);
  const pagesId = data?.pageData?._id;
  const pagesEmail = data?.pageData?.email;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpValidation),
    mode: "onSubmit",
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
    },
  });

  const otpPost = async (data) => {
    try {
      const response = await fetch(URL + "pages/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          data: [
            {
              id: pagesId,
              otp: Object.values(data).join(""),
            },
          ],
        }),
      });
      const responseJson = await response.json();
      if (responseJson.status === 1) {
        dispatch(setSideView("companyPage"));
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        // toast.success(responseJson.response)
      } else {
        // toast.error(responseJson.response)
      }
      reset()
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };

  const resendOtpData = useMutation({
    mutationFn: () =>
      fetchData(
        {
          url: URL + "pages/resendOtp",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ email: pagesEmail }] }
      ),
    // onSuccess: (data) => {
    //   toast.success(data);
    // },
    // onError: (error) => {
    //   toast.error(error.message.split(":")[1]);
    // },
  });

  const onSubmit = (data) => {
    otpPost(data);
  };
  const codeChangeHandler = (event) => {
    const currentId = event.target.id;
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const element = event.target;
    if (keys.includes(event.key) && currentId < 6) {
      const nextSibling = document.getElementById(`${parseInt(currentId) + 1}`);
      nextSibling ? nextSibling.focus() : element.blur();
    } else if (event.key === "Backspace" && currentId > 0) {
      const prevSibling = document.getElementById(currentId - 1);
      prevSibling ? prevSibling.focus() : element.blur();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <WidgetWrapper className={styles.editdiv}>
      <Typography color={medium} m="0.5rem 0" sx={{ minHeight: "75vh" }}>
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
            onClick={() => {
              dispatch(setSideView("companyPage"));
            }}
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
            className={styles.loginformdiv}
          >
            <div className={styles.otplabel}>
              <Typography className={styles.otptxt} color={dark}>
                OTP
              </Typography>
            </div>
            <div className={styles.otpdiv}>
              <Controller
                name={`otp1`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    onChange={(event) => {
                      const newValue = event.target.value.replace(/[^\d]+/g, "").slice(-1);
                      field.onChange(newValue);
                    }}
                    maxLength={1}
                    id="1"
                    className={styles.otp}
                    placeholder="*"
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
                    onChange={(event) => {
                      const newValue = event.target.value.replace(/[^\d]+/g, "").slice(-1);
                      field.onChange(newValue);
                    }}
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
                    onChange={(event) => {
                      const newValue = event.target.value.replace(/[^\d]+/g, "").slice(-1);
                      field.onChange(newValue);
                    }}
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
                    onChange={(event) => {
                      const newValue = event.target.value.replace(/[^\d]+/g, "").slice(-1);
                      field.onChange(newValue);
                    }}
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
                    onChange={(event) => {
                      const newValue = event.target.value.replace(/[^\d]+/g, "").slice(-1);
                      field.onChange(newValue);
                    }}
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
                    onChange={(event) => {
                      const newValue = event.target.value.replace(/[^\d]+/g, "").slice(-1);
                      field.onChange(newValue);
                    }}
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
              <p className={styles.errormsg} style={{ marginTop: "25px" }}>Enter Valid OTP</p>
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
              className={styles.submitbtn}
            >
              Submit
            </Button>
          </Box>
          <div className={styles.receiveotp}>
            <p>Didn't Receive OTP? </p>
            <p
              onClick={() => resendOtpData.mutate()}
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

export default PagesOTP;
