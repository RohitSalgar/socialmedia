import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function PostModal({handleClose, data , open}) {

    const columns = [
        {
            field: "userInfo",
            headerName: "User Name",
            flex: 1.5,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'tabel-header',
            valueGetter: ({ value }) => value.fullName
        },
        {
            field: "reason", 
            headerClassName: 'tabel-header',
            headerAlign: 'center',
            align: 'center',
            headerName: "Reason",
            flex: 1,
        },
        {
            field: "reportedOn",
            headerName: "Reported Date",
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'tabel-header',
            valueGetter: ({ value }) => moment(value).format("DD-MM-YYYY")
        },
        
    ];
  return (
    <React.Fragment>
      <BootstrapDialog
        fullWidth={'lg'}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Post Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => handleClose()}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
           <b>Post Description :</b> {data?.description}
          </Typography>
          <div>
            {data?.image && <img src={data?.image} />}
          </div>
          <div>
          <Typography gutterBottom>
           <b>Reported Users :</b>
          </Typography>
          {data?.reports && data?.reports.length > 0 && <DataGrid
                sx={{ textTransform: "capitalize" }}
                getRowId={(row) => row._id}
                rows={data.reports}
                columns={columns}
                hideFooterSelectedRowCount={true}
            /> }
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}