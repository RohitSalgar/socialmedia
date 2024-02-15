import Button from "@mui/material/Button";
import * as React from 'react';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import moment from "moment";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function AdvertisementViewModal({handleClose, data , open}) {
  if (!data){
    return
  }
  return (
    <React.Fragment>
      <BootstrapDialog
        // fullWidth={"lg"}
        aria-labelledby="customized-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Post Details
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
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>Title: </b>{data?.title}
          </Typography>
            <Typography gutterBottom>
              <b>Description </b>{data?.description}
            </Typography>
          <Typography gutterBottom>
            <b>Link: </b>{data?.link}
          </Typography>
          <div>
            <Typography gutterBottom>
              <b>Images: </b><img  style={{width:"100%"}} src={data?.files[0]?.filePath}/>
            </Typography>
          </div>
          <Typography gutterBottom>
              <b>Created At: </b>{moment(data?.createdAt).format("MMM Do YYYY, h:mm a")}
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose} >
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
