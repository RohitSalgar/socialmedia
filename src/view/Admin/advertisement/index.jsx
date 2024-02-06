import { useState } from "react";
import classes from "../posts/index.module.css";
import { Button, IconButton, Typography, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import {
  useDeleteAdd,
  useGetAllAdvertisements,
  useGetAllSchedules,
  useInsertAdvertisement,
} from "../../../hooks/admin";
import Loader from "../../../components/Loader/Loader";
import moment from "moment";
import { useDispatch } from "react-redux";
import AdvertisementModal from "../../../components/AdvertisementModal";
import { closePopup, openPopup } from "../../../redux/slices/popupSlice";
import { CircularProgress } from "@mui/material";
import Popup from "../../../components/ConfirmationPopup";
import AdvertisementViewModal from "../../../components/AdvertisementModal/addviewmodal";

const Advertisement = () => {
  const titleText = "Delete Post";
  const contentText = "Are you sure that you want to delete these post";
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const dispatch = useDispatch();
  const { data: adData, isLoading } = useGetAllAdvertisements();
  const onSuccessFn = () => {
    dispatch(closePopup());
  };
  const { mutate, isPending } = useDeleteAdd(onSuccessFn);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
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
    {
      field: "Options",
      headerName: "Options",
      flex: 2,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
      renderCell: ({ row }) => (
        <Box
          sx={{ display: "flex", justifyContent: "space-between", gap: "30px" }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedPostId(row);
              setOpenViewModal(true);
            }}
          >
            View
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setSelectedPostId(row);
              dispatch(openPopup());
            }}
            disabled={row.status !== 1}
          >
            {isPending ? <CircularProgress /> : "Delete"}
          </Button>
        </Box>
      ),
    },
  ];

  const closeModal = () => {
    setOpenAddModal(false);
    setOpenViewModal(false);
  };

  if (isLoading) {
    return <Loader />;
  }
  const addDelete = () => {
    mutate({ id: selectedPostId._id });
  };
  const addview=()=>{
    mutate({id:selectedPostId._id })
  }

  return (
    <section className={classes.postSection}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2" color={primary}>
          Advertisement Lists
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpenAddModal(true);
          }}
        >
          {"Add Advertisement"}
        </Button>
      </div>
      <div className={classes.searchContainer}>
          <Search sx={{ marginLeft: "5px" }}/>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
          placeholder="Search by Title..."
        />
      </div>
      <div>
        <DataGrid
          sx={{ textTransform: "capitalize", minHeight: "450px" }}
          getRowId={(row) => row._id}
          rows={adData.filter((page) =>
            page.title
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(searchTerm.toLowerCase().replace(/\s/g, ""))
          )}
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
      <Popup
        handleAgree={addDelete}
        titleText={titleText}
        contentText={contentText}
        mutateLoading={isPending}
      />
      <AdvertisementModal
        open={openAddModal}
        handleClose={closeModal}
        data={selectedPostId}
      />
      <AdvertisementViewModal
        handleAgree={addview}
        open={openViewModal}
        handleClose={closeModal}
        data={selectedPostId}
      />
    </section>
  );
};

export default Advertisement;
