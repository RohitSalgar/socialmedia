import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import moment from "moment";
import styles from "./index.module.css";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { CircularProgress, Tooltip } from "@mui/material";
import { registerValidation } from "../../Validations/RegisterValidation";
import { useTheme } from "@emotion/react";
import { DatePicker } from "@mui/x-date-pickers";
import { advertisementValidation } from "../../Validations/AdvertisementValidation";
import { toast } from "react-toastify";
import { useInsertAdvertisement } from "../../hooks/admin";
import { openFileNewWindow } from "../../helper";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AdvertisementModal({ handleClose, data, open }) {
  const [files, setFiles] = useState(null);
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(advertisementValidation),
    mode: "onTouched",
    defaultValues: {
      title: "",
      link: "",
      description: "",
      adDate: null,
      files: [],
    },
  });

  const onSuccess = (data) => {
    setFiles(null);
    handleClose();
    reset();
  };
  const { mutate: addAd, isLoading: addAdLoading } =
    useInsertAdvertisement(onSuccess);

  const onSubmit = (data) => {
    if (files == null) {
      return toast.error("Update Image");
    }
    const formData = new FormData();
    formData.append("file", files);
    formData.append("title", data.title);
    formData.append("link", data.link);
    formData.append("description", data.description);
    formData.append("adDate", data.adDate);
    addAd(formData);
  };

  const onImageChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const onImageClick = () => {
    if (files) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const imageData = event.target.result;
        openFileNewWindow(imageData);
      };
      reader.readAsDataURL(files);
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Advertisement
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => handleClose()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className={styles.loginformdiv}
        >
          <DialogContent dividers sx={{ mt: 0 }}>
            <Box className={styles.labelDiv}>
              <label className={styles.forminputlabel} htmlFor="title">
                Title
                <span style={{ color: "red" }}>*</span>
              </label>
              {errors?.title && (
                <Tooltip
                  style={{
                    marginLeft: "0.5rem",
                    fontSize: "14px",
                    color: "red",
                  }}
                  title={errors?.title?.message}
                >
                  <InfoIcon />
                </Tooltip>
              )}
            </Box>
            <Controller
              name="title"
              id="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={errors.title && styles.errormsg}
                  placeholder="Enter Title"
                  margin="normal"
                  style={{
                    marginBottom: "1px",
                    fontSize: "10px",
                    marginTop: "0px",
                    width: "100%",
                  }}
                  required
                  fullWidth
                  id="title"
                  name="title"
                  autoComplete="given-name"
                />
              )}
            />
            <Box className={styles.labelDiv}>
              <label className={styles.forminputlabel} htmlFor="link">
                Url Link
                <span style={{ color: "red" }}>*</span>
              </label>
              {errors?.link && (
                <Tooltip
                  style={{
                    marginLeft: "0.5rem",
                    fontSize: "14px",
                    color: "red",
                  }}
                  title={errors?.link?.message}
                >
                  <InfoIcon />
                </Tooltip>
              )}
            </Box>
            <Controller
              name="link"
              id="link"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={errors.title && styles.errormsg}
                  placeholder="Enter Url Link"
                  margin="normal"
                  style={{
                    marginBottom: "1px",
                    fontSize: "10px",
                    marginTop: "0px",
                    width: "100%",
                  }}
                  required
                  fullWidth
                  id="link"
                  name="link"
                  autoComplete="given-name"
                />
              )}
            />
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
                    htmlFor="description"
                  >
                    Description
                    <span style={{ color: "red", marginTop: "9px" }}>*</span>
                  </label>
                  {errors?.description && (
                    <Tooltip
                      style={{
                        marginLeft: "0.5rem",
                        fontSize: "14px",
                        color: "red",
                      }}
                      title={errors?.description?.message}
                    >
                      <InfoIcon />
                    </Tooltip>
                  )}
                </Box>

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Enter description"
                      className={errors.description && styles.errormsg}
                      margin="normal"
                      style={{
                        marginBottom: "1px",
                        fontSize: "10px",
                        marginTop: "0px",
                      }}
                      required
                      fullWidth
                      id="description"
                      name="description"
                    />
                  )}
                />
              </FormControl>
            </div>
            <Box className={styles.loginforminputs} width="100%">
              <Box className={styles.labelDiv}>
                <label className={styles.forminputlabel} htmlFor="adDate">
                  Last Date
                  <span style={{ color: "red" }}>*</span>
                </label>
                {errors?.adDate && (
                    <Tooltip
                      style={{
                        marginLeft: "0.5rem",
                        fontSize: "14px",
                        color: "red",
                      }}
                      title={errors?.adDate?.message}
                    >
                      <InfoIcon />
                    </Tooltip>
                  )}
              </Box>
            </Box>
            <Controller
              name="adDate"
              control={control}
              sx={{ width: "100%" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  fullWidth
                  className={errors.adDate && styles.errormsg}
                  slotProps={
                    {
                      // textField: {
                      //   // readOnly: true,
                      // },
                    }
                  }
                  id="adDate"
                  views={["year", "month", "day"]}
                  format="DD-MM-YYYY"
                  disablePast
                />
              )}
            />
            <div
              style={{
                marginBottom: "1px",
                fontSize: "10px",
                marginTop: "0px",
              }}
            ></div>
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
                <label className={styles.forminputlabel} htmlFor="imageInput">
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
          </DialogContent>
          <DialogActions>
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
                width: "99%",
              }}
            >
              {addAdLoading ? <CircularProgress style={{'color': 'white'}} size={20} /> : "Publish"}
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </React.Fragment>
  );
}
