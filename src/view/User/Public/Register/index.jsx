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
import searchlogo from "../../../../assets/Images/background.jpeg";
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
import { fetchData, openFileNewWindow } from "../../../../helper";
import moment from "moment";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { OutlinedInput } from "@mui/material";

const defaultTheme = createTheme();

export default function RegisterPage() {
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const [showPassword, setShowPassword] = useState(false);
  const [conshowPassword, setConShowPassword] = useState(false);
  const navigate = useNavigate();
  const [location, setLocation] = useState({ state: "", country: "" });
  const [files, setFiles] = useState(null);

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
      userName: "",
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

  const updateEmailFn = async (data) => {
    let response = await fetch(URL + "users/updateRegisterData", {
      method: "POST",
      body: data,
    });
    let responseData = await response.json();
    return responseData.response;
  };

  const updateEmailData = useMutation({
    mutationFn: (data) => updateEmailFn(data),
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
    const formData = new FormData();
    formData.append("file", files);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("dob", data.dob);
    formData.append("userName", data.userName);
    formData.append("password", data.password);
    formData.append("designation", data.designation);
    formData.append("state", location.state);
    formData.append("country", location.country);
    if (id) {
      formData.append("id", id);
      data.id = id;
      updateEmailData.mutate(formData);
    } else {
      postRegistrationData.mutate(formData);
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickConShowPassword = () => setConShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onImageChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const onImageClick = () => {
    if (files) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageData = event.target.result;
        openFileNewWindow(imageData);
      };
      reader.readAsDataURL(files);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        className="maindiv"
        container
        component="main"
        sx={{ height: "100vh" }}
      >
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
                  // pb: "10px",
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
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "baseline",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Box className={styles.labelDiv}>
                      <label
                        className={styles.forminputlabel}
                        htmlFor="fullName"
                      >
                        Username
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      {errors?.userName && (
                        <Tooltip
                          style={{
                            marginLeft: "0.5rem",
                            fontSize: "14px",
                            color: "red",
                          }}
                          title={errors?.userName?.message}
                        >
                          <InfoIcon />
                        </Tooltip>
                      )}
                    </Box>
                    <Controller
                      name="userName"
                      id="userName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className={errors.fullName && styles.errormsg}
                          placeholder="Enter Username"
                          margin="normal"
                          style={{
                            marginBottom: "1px",
                            fontSize: "10px",
                            marginTop: "0px",
                            width: "100%",
                          }}
                          required
                          fullWidth
                          id="userName"
                          name="userName"
                          autoComplete="given-name"
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Box className={styles.labelDiv}>
                      <label
                        className={styles.forminputlabel}
                        htmlFor="fullName"
                      >
                        Full Name
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      {errors?.fullName && (
                        <Tooltip
                          style={{
                            marginLeft: "0.5rem",
                            fontSize: "14px",
                            color: "red",
                          }}
                          title={errors?.fullName?.message}
                        >
                          <InfoIcon />
                        </Tooltip>
                      )}
                    </Box>
                    <Controller
                      name="fullName"
                      id="fullName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className={errors.fullName && styles.errormsg}
                          placeholder="Enter Full Name"
                          margin="normal"
                          style={{
                            marginBottom: "1px",
                            fontSize: "10px",
                            marginTop: "0px",
                            width: "100%",
                          }}
                          required
                          fullWidth
                          id="fullName"
                          name="fullName"
                          autoComplete="given-name"
                        />
                      )}
                    />
                  </Box>
                </div>
                <Box className={styles.loginforminputs}>
                  <Box className={styles.labelDiv}>
                    <label className={styles.forminputlabel} htmlFor="email">
                      Email Address
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    {errors?.email && (
                      <Tooltip
                        style={{
                          marginLeft: "0.5rem",
                          fontSize: "14px",
                          color: "red",
                        }}
                        title={errors?.email?.message}
                      >
                        <InfoIcon />
                      </Tooltip>
                    )}
                  </Box>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className={errors.email && styles.errormsg}
                        placeholder="Enter Email"
                        margin="normal"
                        style={{
                          marginBottom: "1px",
                          fontSize: "10px",
                          marginTop: "0px",
                          width: "100%",
                        }}
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                      />
                    )}
                  />
                </Box>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "baseline",
                    width: "100%",
                  }}
                >
                  <FormControl
                    fullWidth
                    className={styles.loginforminputs}
                    width="50%"
                  >
                    <Box className={styles.labelDiv}>
                      <label
                        className={styles.forminputlabel}
                        htmlFor="designation"
                      >
                        Designation
                        <span style={{ color: "red", marginTop: "9px" }}>
                          *
                        </span>
                      </label>
                      {errors?.designation && (
                        <Tooltip
                          style={{
                            marginLeft: "0.5rem",
                            fontSize: "14px",
                            color: "red",
                          }}
                          title={errors?.designation?.message}
                        >
                          <InfoIcon />
                        </Tooltip>
                      )}
                    </Box>

                    <Controller
                      name="designation"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Enter Designation"
                          className={errors.designation && styles.errormsg}
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
                  </FormControl>
                  <Box className={styles.loginforminputs} width="100%">
                    <Box className={styles.labelDiv}>
                      <label className={styles.forminputlabel} htmlFor="dob">
                        Date of Birth
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      {errors?.dob && (
                        <Tooltip
                          style={{
                            marginLeft: "0.5rem",
                            fontSize: "14px",
                            color: "red",
                          }}
                          title={errors?.dob?.message}
                        >
                          <InfoIcon />
                        </Tooltip>
                      )}
                    </Box>
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
                          className={errors.dob && styles.errormsg}
                          slotProps={
                            {
                              // textField: {
                              //   // readOnly: true,
                              // },
                            }
                          }
                          id="dob"
                          views={["year", "month", "day"]}
                          format="DD-MM-YYYY"
                        />
                      )}
                    />
                  </Box>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <Box width="50%" className={styles.loginforminputs}>
                    <Box className={styles.labelDiv}>
                      <label
                        className={styles.forminputlabel}
                        htmlFor="password"
                      >
                        Password
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      {errors?.password && (
                        <Tooltip
                          style={{
                            marginLeft: "0.5rem",
                            fontSize: "14px",
                            color: "red",
                          }}
                          title={
                            "Password must be more than 8 characters long with atleast 1 Uppercase letter, 1 Lowecase letter, 1 Symbol, and 1 Number.      Example : Allmaster@2023."
                          }
                        >
                          <InfoIcon />
                        </Tooltip>
                      )}
                    </Box>
                    <Controller
                      id="password"
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <OutlinedInput
                          {...field}
                          className={errors.password && styles.errormsg}
                          placeholder="Enter Password"
                          margin="normal"
                          style={{
                            marginBottom: "1px",
                            fontSize: "16px",
                            marginTop: "0px",
                          }}
                          required
                          fullWidth
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
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                  </Box>
                  <Box className={styles.loginforminputs} width="50%">
                    <Box className={styles.labelDiv}>
                      <label
                        className={styles.forminputlabel}
                        htmlFor="password"
                      >
                        Confirm Password
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      {errors?.conPassword && (
                        <Tooltip
                          style={{
                            marginLeft: "0.5rem",
                            fontSize: "14px",
                            color: "red",
                          }}
                          title={"Re-enter Password."}
                        >
                          <InfoIcon />
                        </Tooltip>
                      )}
                    </Box>
                    <Controller
                      id="conPassword"
                      name="conPassword"
                      control={control}
                      render={({ field }) => (
                        <OutlinedInput
                          {...field}
                          className={errors.conPassword && styles.errormsg}
                          placeholder="Enter Password"
                          margin="normal"
                          style={{
                            marginBottom: "1px",
                            fontSize: "16px",
                            marginTop: "0px",
                          }}
                          required
                          fullWidth
                          name="conPassword"
                          type={conshowPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickConShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {conshowPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                  </Box>
                </div>
                {files ? (
                  <div className={styles.imageContainer}>
                    <p onClick={onImageClick}>{files.name}</p>
                    <DeleteIcon
                      onClick={() => setFiles(null)}
                      className={styles.deleteIcon}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      width: "100%",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/jpg, image/webp"
                      name="files"
                      onChange={onImageChange}
                      style={{ display: "none" }}
                      id="imageInput"
                      multiple={false}
                    />
                    <label
                      className={styles.forminputlabel}
                      htmlFor="imageInput"
                    >
                      <Button
                        variant="contained"
                        component="span"
                        className={styles.uploadimage}
                      >
                        Upload Image
                      </Button>
                    </label>
                  </div>
                )}
                <Button
                  className={styles.submitbtn}
                  type="submit"
                  fullWidth
                  variant="primary"
                  sx={{
                    mt: 1,
                    mb: 1,
                    background: `${primary}`,
                    color: "#fff",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  Register
                </Button>
                <Grid container style={{ width: "100%" }}>
                  <Grid item style={{ width: "100%", textAlign: "center" }}>
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
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              {/* Image */}
              <img
                src={searchlogo}
                style={{ width: "100%", height: "100%" }}
                alt="Image"
              />
              {/* Text overlay */}
              <div
                className={styles.contantdiv}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "62%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "2rem",
                  padding: "1rem 2rem",
                  width: "65%",
                }}
              >
                <h5> Welcome to Allmaster's SocialMedia</h5>
                <h6> The Hub of Logistics Connectivity!</h6>
                <p>
                  {" "}
                  Join our growing community of logistics enthusiasts and
                  professionals. Whether you're a seasoned logistics expert or
                  just stepping into the world of supply chain management,
                  Allmaster SocialMedia is here to revolutionize the way we
                  connect, collaborate, and innovate in the logistics industry..
                </p>
              </div>
            </div>
          </Grid>
        </div>
      </Grid>
    </ThemeProvider>
  );
}
