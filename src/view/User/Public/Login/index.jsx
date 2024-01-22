import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from "./index.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import searchlogo from "../../../../assets/Images/logis1.jpeg";
import * as yup from "yup";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logInApi } from '../../../../hooks/login';
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setProfileData } from '../../../../redux/slices/profileSlice';
import { useNavigate } from 'react-router';

const loginValidation = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .required("Email is required")
    .email("Enter valid email"),
  password: yup.string().trim().required("Password is required"),
});

const defaultTheme = createTheme();

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const ProfileRole = useSelector((state) => state.profile);
  const queryClient = useQueryClient();

  const navigate = useNavigate()

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
        localStorage.setItem("amsSocialToken", data.data);
        localStorage.setItem("amsSocialId", decodedData.userId);
        localStorage.setItem("amsSocialSignedIn", true);
        dispatch(setProfileData(decodedData));
        await queryClient.refetchQueries({ queryKey: ["profileData"] });
        checkRole(decodedData.role)
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
    loginData.mutate(data)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Grid className={styles.registerSlideInRight} style={{ position: 'relative', zIndex: -1, marginRight: "-180px" }} item xs={12} sm={6} md={9} component={Paper} elevation={6} >
            <img src={searchlogo} style={{ width: "100%", height: "100%" }} alt="Image" />
          </Grid>
          <Grid
            item
            xs={10}
            sm={8}
            md={5.5}
            style={{
              width: "1150px", marginLeft: '-100px', position: 'relative',
              zIndex: 1,
            }}
            component={Paper}
            elevation={6}
            square
            sx={{
              my: 0,
              mx: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: " 150px 0 0 150px",
            }}
          >
            <Box
              sx={{
                mt: 12,
                mx: 12,
                mr: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '50%',
              }}
            >
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, mb: 0 }}>
                <Controller
                  name="email"
                  control={control}
                  style={{ marginBottom: 0 }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      style={{ marginBottom: "1px" }}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="off"
                    />
                  )} />
                {errors.email && (
                  <span className={styles.errormsg}>
                    {errors.email.message}
                  </span>
                )}
                <FormControl sx={{ mt: 4 }} variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput
                        {...field}
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
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
                        label="Password"
                      />
                    )} />
                </FormControl>
                {errors.password && (
                  <p className={styles.errormsg}>
                    {errors.password.message}
                  </p>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container >
                  <Grid item style={{ width: "100%", textAlign: "center" }}>
                    <span>Do not have an account?</span>
                    <Link href="/register" variant="body2">
                      Register
                    </Link>
                  </Grid>
                  <Grid item
                    style={{ width: "100%", textAlign: "center" }}
                    onClick={() => localStorage.setItem("amsSocialSignedIn", false)
                    }>
                    <Link href="/public/home" variant="body2">
                      skip
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </div>
      </Grid >
    </ThemeProvider >
  );
}
