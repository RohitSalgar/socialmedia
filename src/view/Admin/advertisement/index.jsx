import { useState } from "react";
import classes from "../posts/index.module.css";
import { Button, IconButton, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { useGetAllAdvertisements, useGetAllSchedules, useInsertAdvertisement } from "../../../hooks/admin";
import Loader from "../../../components/Loader/Loader";
import moment from "moment";
import { useDispatch } from "react-redux";
import AdvertisementModal from "../../../components/AdvertisementModal";
import { closePopup, openPopup } from "../../../redux/slices/popupSlice";

const Advertisement = () => {
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const dispatch = useDispatch()
  const { data: adData, isLoading } = useGetAllAdvertisements();
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  console.log(adData,"ad")
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "link",
      headerName: "Link",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "files",
      headerName: "Images",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "openingOn",
      headerName: "Bookings Open",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
      valueGetter: ({ value }) => moment(value).format("DD-MM-YYYY"),
    },
  ];

  const closeModal = () => {
    setOpenModal(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.postSection}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <Typography variant="h2" color={primary}>
          Advertisement Lists
        </Typography>
        <Button
            variant="contained"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            {"Add Advertisement"}
          </Button>
      </div>
      <div className={classes.searchContainer}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
          placeholder="Search by company name..."
        />
        <IconButton className={classes.searchBtn}>
          <Search />
        </IconButton>
      </div>
      <div>
        <DataGrid
          sx={{ textTransform: "capitalize", minHeight: "450px" }}
          getRowId={(row) => row._id}
          rows={adData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          hideFooterSelectedRowCount={true}
        />
      </div>
      <AdvertisementModal
        open={openModal}
        handleClose={closeModal}
      />
    </section>
  );
};

export default Advertisement;
