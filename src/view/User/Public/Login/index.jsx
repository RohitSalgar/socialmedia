import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "./index.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logInApi } from "../../../../hooks/login";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setProfileData,
  setSkip,
  setViewCompanyId,
} from "../../../../redux/slices/profileSlice";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { URL } from "../../../../config";
const loginValidation = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .required("Email is required")
    .email("Enter valid email"),
  password: yup.string().trim().required("Password is required"),
});


export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const companyId = useSelector((state) => state.profile.companyId);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const navigate = useNavigate();

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

  const loginData = useMutation({
    mutationFn: (data) => logInApi(data),
    onSuccess: async (data) => {
      if (data.status === 1) {
        const decodedData = jwtDecode(data.data);
        if (decodedData.status === 2) {
          navigate("/otp/" + decodedData.userId);
        } else {
          localStorage.setItem("amsSocialToken", data.data);
          localStorage.setItem("amsSocialId", decodedData.userId);
          localStorage.setItem("amsSocialSignedIn", true);
          dispatch(setProfileData(decodedData));
          dispatch(setViewCompanyId(companyId));
          await queryClient.refetchQueries({ queryKey: ["profileData"] });
          checkRole(decodedData.role);
        }
      } else {
        if (data.status === 0 && data.data != null) {
          const parsedData = JSON.parse(data.data);
          const decodedData = jwtDecode(parsedData.token);
          localStorage.setItem("amsSocialId", decodedData.userId);
          localStorage.setItem("amsSocialToken", decodedData.token);
        } else {
          toast.error(data.response);
        }
      }
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(loginValidation),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    loginData.mutate(data);
  };

  const googleSignUpFn = async () => {
    await fetch(URL + "users/auth/google");
  };

  return (
    <Box className={styles.logindiv}>
      <Box className={styles.formdiv}>
        <Typography className={styles.formtitle}>Login</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, mb: 0 }}
          className={styles.loginformdiv}
        >
          <label htmlFor="email">Email Address</label>
          <span style={{ color: "red" }}>*</span>
          <Controller
            name="email"
            id="email"
            className={styles.logininput}
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ mt: "0px" }}
                placeholder="Enter Email"
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
              />
            )}
          />
          {errors.email && (
            <span className={styles.errormsg}>{errors.email.message}</span>
          )}
          <Box sx={{ pt: "10px" }}>
            <label htmlFor="password">Password</label>
            <span style={{ color: "red" }}>*</span>
            <FormControl variant="outlined" fullWidth>
              <Controller
                id="password"
                name="password"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    placeholder="Enter Password"
                    className={styles.forminput}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
            </FormControl>
            {errors.password && (
              <p className={styles.errormsg}>{errors.password.message}</p>
            )}
          </Box>
          <Button className={styles.submitbtn} type="submit" fullWidth>
            Login
          </Button>
          {/* <Button
        onClick={googleSignUpFn}
        className={styles.submitbtn}
        // type="submit"
        fullWidth
        sx={{
          mt: 3,
          mb: 2,
          background: `${primary}`,
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Signup with Google
      </Button> */}
          <Grid
            item
            style={{
              width: "100%",
              background: "#2F65B930",
              textAlign: "center",
              padding: "6px",
              borderRadius: "5px",
                    cursor:"pointer"
            }}
            onClick={() => {
              dispatch(setSkip());
              localStorage.setItem("amsSocialSignedIn", false);
            }}
          >
            <Link
              sx={{
                mt: 1,
                mb: 2,
                color: "#2F65B9",
                fontWeight: "bold",
                textDecoration: "unset",
              }}
              href="/public/home"
            >
              Skip
            </Link>
          </Grid>
          <Grid>
            <Grid item style={{ width: "100%", paddingTop: "10px" }}>
              <span>Do not have an account?</span>
              <Link
                href="/register"
                variant="body2"
                color={primary}
                sx={{
                  ml: 1,
                  textDecoration: "unset",
                }}
              >
                Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
