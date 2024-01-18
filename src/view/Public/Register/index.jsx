import * as React from 'react';
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
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import searchlogo from "../../widgets/logis1.jpeg";
import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

const registerValidation = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full Name is required")
    .matches(/^[a-zA-Z ]*$/, "Only alphabets are allowed"),
  designation: yup
    .string()
    .required("Designation is required"),
  email: yup
    .string()
    .email("Enter valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,_]).{8,}$/,
      "Invalid Password format"
    ),
  dob: yup
    .string()
    .required("ETD is required")
    .transform((value) =>
      value !== null ? moment(value).format("DD-MM-YYYY") : value
    ),
  conPassword: yup
    .string()
    .trim()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Password does not match"),
});
const defaultTheme = createTheme();

export default function RegisterPage() {
  const navigate = useNavigate()
  const [designation, setDesignation] = useState('');

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(registerValidation),
    mode: "onTouched",
    defaultValues: {
      fullName:"",
      email: "",
      dob: null,
      password: "",
      designation:"",
    },
  });

  const onSubmit = () => {
    console.log("run")
    navigate("/")
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setValue("designation",`${event.target.value}`)
    setDesignation(event.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '99vh' }}>
        <CssBaseline />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Grid
            className={styles.slideLleft}
            item
            xs={10}
            sm={8}
            md={6}
            style={{
              width: "1250px", position: 'relative',
              zIndex: 2,
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
              borderRadius: "0 150px 150px 0",
            }}
          >
            <Box
              sx={{
                mt: 5,
                mx: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '50%',
              }}
            >

              <Typography component="h1" variant="h5">
                Create Account
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      style={{ marginBottom: "1px", fontSize:"10px"}}
                      required
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      name="fullName"
                      autoComplete="given-name"
                      autoFocus
                     
                    />
                  )} />
                {errors.fullName && (
                  <p className={styles.errormsg}>
                    {errors.fullName.message}
                  </p>
                )}
                <Controller
                  name="email"
                  control={control}
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
                      autoComplete="email"
                    />
                  )} />
                {errors.email && (
                  <p className={styles.errormsg}>
                    {errors.email.message}
                  </p>
                )}
                <div style={{ marginTop: "10px", display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                  <FormControl   fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">Designation</InputLabel>

                        <Select
                          required
                          fullWidth
                          style={{ marginBottom: "1px" }}
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={designation}
                          label="designation"
                          onChange={handleChange}
                        >
                          {console.log(designation)}
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                        </Select>
                    {errors.designation && (
                      <p className={styles.errormsg}>
                        {errors.designation.message}
                      </p>
                    )}
                  </FormControl>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          sx={{ width: "100%", marginBottom: "1px" }}
                          fullWidth
                          className="datepicker form-control"
                          slotProps={{
                            textField: {
                              readOnly: true,
                            },
                          }}
                          disablePast
                          id="dob"
                          views={["year", "month", "day"]}
                          format="DD-MM-YYYY"
                        />
                      )}
                    />
                    {errors.dob && (
                      <p className={styles.errormsg}>
                        {errors.dob.message}
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>

                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          margin="normal"
                          style={{ marginBottom: "1px" }}
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
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>

                    <Controller
                      name="conPassword"
                      control={control}
                      style={{ marginBottom: "1px" }}
                      render={({ field }) => (
                        <TextField
                          style={{ marginBottom: "1px" }}
                          {...field}
                          margin="normal"
                          required
                          fullWidth
                          name="conPassword"
                          label="Confirm Password"
                          type="conPassword"
                          id="conPassword"
                          autoComplete="new-password"
                        />
                      )} />
                    {errors.conPassword && (
                      <p className={styles.errormsg}>
                        {errors.conPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* <div style={{marginTop:"10px",marginBottom:"10px"}}> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py:1.4, fontWeight:"600", fontSize:"14px" }}
                  >
                  Register
                </Button>
                  {/* </div> */}
                <Grid container style={{width:"100%"}}>
                  <Grid item style={{width:"100%", textAlign:"center"}}>
                    <span>Already have an account?</span>
                    <Link href="/" variant="body2" >
                      {" Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid className={styles.slideRight} style={{
            position: 'relative',
            marginLeft: '-300px',
            height:"100vh"
          }} item xs={12} sm={6} md={8} component={Paper} elevation={6} >
            <img src={searchlogo} style={{ width: "100%", height: "100%" }} alt="Image" />
          </Grid>
        </div>
      </Grid>
    </ThemeProvider>
  );
}
