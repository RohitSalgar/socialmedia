import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
import {
  CircularProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import { getEmail } from "../../../../hooks/otp";
import Loader from "../../../../components/Loader/Loader";
import { URL } from "../../../../config";
import styles from "./index.module.css";
import { toast } from "react-toastify";
import { fetchData } from "../../../../helper";
import { otpValidation } from "../../../../Validations/OtpValidations";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../../../redux/slices/profileSlice";
import { useTheme } from "@emotion/react";

const OTPPage = () => {
  const [emailId, setEmailId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const dark = palette.neutral.dark;

  function checkRole(role) {
    switch (role) {
      case 1:
        navigate("/user/home");
        break;
      case 2:
        navigate("/admin/home");
        break;

      default:
        break;
    }
  }
  const {
    handleSubmit,
    formState: { errors },
    control,
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
  const emailData = useMutation({
    mutationFn: () => getEmail(id),
    onSuccess: (response) => {
      const responseData = JSON.parse(response.data);
      setEmailId(responseData.email);
    },
    onError: () => {
      navigate("/login");
    },
  });

  const resendOtpData = useMutation({
    mutationFn: () =>
      fetchData(
        {
          url: URL + "users/resendOtp",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ email: emailId }] }
      ),
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });

  const otpPost = async (data) => {
    try {
      const response = await fetch(URL + "users/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          data: [
            {
              id: id,
              otp: Object.values(data).join(""),
            },
          ],
        }),
      });
      const responseJson = await response.json();
      if (response.ok) {
        const decodedData = jwtDecode(responseJson.data);
        localStorage.setItem("amsSocialToken", responseJson.data);
        localStorage.setItem("amsSocialId", decodedData.userId);
        localStorage.setItem("amsSocialSignedIn", true);
        dispatch(setProfileData(decodedData));
        await queryClient.refetchQueries({ queryKey: ["profileData"] });
        checkRole(decodedData?.role);
      } else {
        throw new Error(responseJson.message || "Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error(error.message.split(":")[1] || "Invalid OTP");
    }
  };

  useEffect(() => {
    emailData.mutate();
  }, []);
  const saveData = (data) => {
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

  if (emailData.isLoading || resendOtpData.isLoading) {
    return <Loader />;
  }

  return (
    <Box className={styles.otpmain}>
      <Box>
        <Typography className={styles.otptitle}>Enter OTP</Typography>
        <Typography paragraph className={styles.otpsendid}>
          OTP sent to <span>{emailId}</span>
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(saveData)}
          sx={{ mt: 1 }}
          className={styles.loginformdiv}
        >
          <div className={styles.otplabel}>
            <Typography className={styles.otptxt} color={dark}>
              OTP <span style={{ color: "red" }}>*</span>
            </Typography>
            <Link
              to={`/register/${id}`}
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
                  onChange={(event) => {
                    const newValue = event.target.value
                      .replace(/[^\d]+/g, "")
                      .slice(-1); // Replace non-numeric characters and retain only the last character
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
                    const newValue = event.target.value
                      .replace(/[^\d]+/g, "")
                      .slice(-1);
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
                    const newValue = event.target.value
                      .replace(/[^\d]+/g, "")
                      .slice(-1);
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
                    const newValue = event.target.value
                      .replace(/[^\d]+/g, "")
                      .slice(-1);
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
                    const newValue = event.target.value
                      .replace(/[^\d]+/g, "")
                      .slice(-1);
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
                    const newValue = event.target.value
                      .replace(/[^\d]+/g, "")
                      .slice(-1);
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
            <p className={styles.errormsg}>Enter Valid OTP</p>
          )}
          <Button
            type="submit"
            className={styles.submitbtn}
            fullWidth
            disabled={otpPost.isLoading || resendOtpData.isLoading}
            sx={{
              mt: 3,
              mb: 2,
              background: `${primary}`,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {otpPost.isLoading || resendOtpData.isLoading ? (
              <CircularProgress size={15} />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
        <div className={styles.receiveotp}>
          <p>Didn't Receive OTP? </p>
          <p
            onClick={() => resendOtpData.mutate()}
            className={styles.forgot}
            color={primary}
          >
            Resend
          </p>
        </div>
      </Box>
    </Box>
  );
};

export default OTPPage;
