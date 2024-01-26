import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./index.module.css";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import searchlogo from "../../../../assets/Images/background.jpg";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { registerValidation } from "../../../../Validations/RegisterValidation";
import { useNavigate, useParams } from "react-router-dom";
import { saveregistration } from "../../../../hooks/register";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import { URL } from "../../../../config";
import { fetchData } from "../../../../helper";
import moment from "moment";
import { useTheme } from "@emotion/react";

const defaultTheme = createTheme();

export default function RegisterPage() {
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const navigate = useNavigate();
  const [location, setLocation] = useState({ state: "", country: "" });
  // const [files, setFiles] = useState([]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(registerValidation),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      dob: null,
      password: "",
      designation: "",
      files: [],
    },
  });
  const { id } = useParams();

  const postRegistrationData = useMutation({
    mutationFn: saveregistration,
    onSuccess: (data) => {
      if (data.status === 0) {
        toast.error(data.response);
      } else {
        navigate("/otp/" + JSON.parse(data.data));
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        let ipAddress = await fetch("https:api.ipify.org");
        ipAddress = await ipAddress.text();
        let location = await fetch(`http://ip-api.com/json/${ipAddress}`);
        location = await location.json();
        setLocation({
          state: location.regionName,
          country: location.country,
        });
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIPAddress();
  }, []);

  const updateEmailData = useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "users/updateRegisterData",
          method: "POST",
        },
        {
          data: [data],
        }
      ),
    onSuccess: (data) => {
      toast.success(data);
      navigate("/otp/" + id);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
  // const fetchExistingData = async (data) => {
  //   try {
  //     const response = await fetch(URL+ "users/userDetailsById", {
  //       method: "POST",
  //       body: {data: [{ id }]},
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const responseJson = await response.json();
  //     if(responseJson.status === 1) {
  //       reset(data);
  //     }
  //     else if (responseJson.status === 0) {
  //       toast.error(responseJson.message);
  //       throw new Error(responseJson.response);
  //     }
  //     return responseJson;
  //   } catch (error) {
  //     toast.error(error.message);
  //     throw new Error(error.message);
  //   }
  // };

  const fetchExistingData = useMutation({
    mutationFn: () =>
      fetchData(
        {
          url: URL + "users/userDetailsById",
          method: "POST",
        },
        {
          data: [{ id }],
        }
      ),
    onSuccess: (data) => {
      reset({
        fullName: data.fullName,
        email: data.email,
        designation: data.designation,
        dob: (data.dob = moment(data.dob)),
      });
    },
  });

  const onSubmit = (data) => {
    if (id) {
      data.id = id;
      updateEmailData.mutate({ ...data, ...location });
    } else {
      postRegistrationData.mutate({ ...data, ...location });
    }
  };
  useEffect(() => {
    if (id) {
      fetchExistingData.mutate();
    }
  }, [id]);

  if (fetchExistingData.isLoading) {
    return <Loader />;
  }

  // const onImageChange = (e) => {
  //   setFiles([e.target.files[0]]);
  // };

  // const handleChange = (event) => {
  //   setValue("designation",`${event.target.value}`)
  //   setDesignation(event.target.value);
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "99vh" }}>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid
            className={styles.slideLleft}
            item
            xs={10}
            sm={8}
            md={6}
            style={{
              width: "1250px",
              position: "relative",
              zIndex: 2,
            }}
            component={Paper}
            elevation={6}
            square
            sx={{
              my: 0,
              mx: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "0 150px 150px 0",
            }}
          >
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
              <Typography
                component="h1"
                variant="h4"
                color={primary}
                sx={{
                  fontWeight: "bold",
                  pb: "10px",
                }}
              >
                Create Account
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
                className={styles.loginformdiv}
              >
                <label className={styles.forminputlabel} htmlFor="fullName">
                  Full Name
                </label>
                <Controller
                  name="fullName"
                  id="fullName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      style={{
                        marginBottom: "1px",
                        fontSize: "10px",
                        marginTop: "0px",
                      }}
                      required
                      fullWidth
                      id="fullName"
                      name="fullName"
                      autoComplete="given-name"
                    />
                  )}
                />
                {errors.fullName && (
                  <p className={styles.errormsg}>{errors.fullName.message}</p>
                )}
                <Box className={styles.loginforminputs} sx={{ pt: "10px" }}>
                  <label className={styles.forminputlabel} htmlFor="email">
                    Email Address
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        style={{
                          marginBottom: "1px",
                          fontSize: "10px",
                          marginTop: "0px",
                        }}
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                      />
                    )}
                  />
                  {errors.email && (
                    <p className={styles.errormsg}>{errors.email.message}</p>
                  )}
                </Box>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "baseline",
                  }}
                >
                  <FormControl
                    fullWidth
                    className={styles.loginforminputs}
                    width="50%"
                  >
                    <label
                      className={styles.forminputlabel}
                      htmlFor="designation"
                    >
                      Designation
                    </label>
                    <Controller
                      name="designation"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          margin="normal"
                          style={{
                            marginBottom: "1px",
                            fontSize: "10px",
                            marginTop: "0px",
                          }}
                          required
                          fullWidth
                          id="designation"
                          name="designation"
                        />
                      )}
                    />
                    {errors.designation && (
                      <p className={styles.errormsg}>
                        {errors.designation.message}
                      </p>
                    )}
                  </FormControl>
                  <Box className={styles.loginforminputs} width="100%">
                    <label className={styles.forminputlabel} htmlFor="dob">
                      Date of Birth
                    </label>
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          style={{
                            marginBottom: "1px",
                            fontSize: "10px",
                            marginTop: "0px",
                          }}
                          fullWidth
                          className="datepicker form-control"
                          slotProps={{
                            textField: {
                              readOnly: true,
                            },
                          }}
                          id="dob"
                          views={["year", "month", "day"]}
                          format="MM-DD-YYYY"
                        />
                      )}
                    />
                    {errors.dob && (
                      <p className={styles.errormsg}>{errors.dob.message}</p>
                    )}
                  </Box>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "baseline",
                    paddingTop: "10px",
                  }}
                >
                  <Box className={styles.loginforminputs} width="100%">
                    <label className={styles.forminputlabel} htmlFor="password">
                      Password
                    </label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          margin="normal"
                          style={{
                            marginBottom: "1px",
                            fontSize: "10px",
                            marginTop: "0px",
                          }}
                          required
                          fullWidth
                          name="password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                        />
                      )}
                    />
                    {errors.password && (
                      <p className={styles.errormsg}>
                        {errors.password.message}
                      </p>
                    )}
                  </Box>
                  <Box className={styles.loginforminputs}>
                    <label
                      className={styles.forminputlabel}
                      htmlFor="conPassword"
                    >
                      Confirm Password
                    </label>
                    <Controller
                      name="conPassword"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          style={{
                            marginBottom: "1px",
                            fontSize: "10px",
                            marginTop: "0px",
                          }}
                          {...field}
                          margin="normal"
                          required
                          fullWidth
                          name="conPassword"
                          type="Password"
                          id="conPassword"
                          autoComplete="new-password"
                        />
                      )}
                    />
                    {errors.conPassword && (
                      <p className={styles.errormsg}>
                        {errors.conPassword.message}
                      </p>
                    )}
                  </Box>
                </div>
                {/* <div style={{marginTop:"10px",marginBottom:"10px"}}> */}
                {/* <input
                  type="file"
                  accept="image/*"
                  name="files"
                  onChange={onImageChange}
                  style={{ display: "none" }}
                  id="imageInput"
                  multiple={false} // Allow only one file to be selected
                />
                <label className={styles.forminputlabel} htmlFor="imageInput">
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Upload Image
                  </Button>
                </label> */}
                <Button
                  type="submit"
                  fullWidth
                  variant='primary'
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: `${primary}`,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Button>
                {/* </div> */}
                <Grid container style={{ width: "100%" }}>
                  <Grid item style={{ width: "100%", textAlign: "left" }}>
                    <span>Already have an account?</span>
                    <Link
                      href="/"
                      variant="body2"
                      color={primary}
                      sx={{
                        ml: 1,
                        textDecoration: "unset",
                      }}
                    >
                      Login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid
            className={styles.slideRight}
            style={{
              position: "relative",
              marginLeft: "-300px",
              height: "100vh",
            }}
            item
            xs={12}
            sm={6}
            md={8}
            component={Paper}
            elevation={6}
          >
            <img
              src={searchlogo}
              style={{ width: "100%", height: "100%" }}
              alt="Image"
            />
          </Grid>
        </div>
      </Grid>
    </ThemeProvider>
  );
}
