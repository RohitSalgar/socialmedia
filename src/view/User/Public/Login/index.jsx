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
import searchlogo from "../../widgets/logis1.jpeg";
import * as yup from "yup";

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
      type: "1",
    },
  });

  const onSubmit = () => {
    console.log("run")
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Grid className={styles.registerSlideInRight} style={{ position: 'relative', zIndex: -1,marginRight:"-180px" }} item xs={12} sm={6} md={9} component={Paper} elevation={6} >
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
            {console.log("run")}
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
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 , mb:0}}>
                <Controller
                  name="email"
                  control={control}
                  style={{marginBottom:0}}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      style={{marginBottom:"1px"}}
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
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password" 
                    />
                  )} />
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
                  <Grid item style={{width:"100%", textAlign:"center"}}>
                  <span>Do not have an account?</span>
                    <Link href="/register" variant="body2">
                     Register
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </div>
      </Grid>
    </ThemeProvider>
  );
}
