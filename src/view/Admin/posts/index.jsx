import classes from "./index.module.css";
import { IconButton, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useDeletePost, useGetReportedPosts } from "../../../hooks/admin";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import Popup from "../../../components/ConfirmationPopup/index";
import { closePopup, openPopup } from "../../../redux/slices/popupSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import PostModal from "../../../components/PostModal";

const posts = () => {
  const { data: postData, isLoading } = useGetReportedPosts();
  console.log(postData,"post data")
  const titleText = "Delete Post";
  const contentText = "Are you sure that you want to delete these post";
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const onSuccessFn = () => {
    dispatch(closePopup());
  };
  const { mutate, isPending } = useDeletePost(onSuccessFn);

  const columns = [
    {
        field: "fullName",
        headerName: "Created User",
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'tabel-header'
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "reports",
      headerClassName: "tabel-header",
      headerAlign: "center",
      align: "center",
      headerName: "Reported Users",
      flex: 1,
      valueGetter: ({ value }) => value.length,
    },
    {
      field: "createdAt",
      headerName: "Created Time",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
      valueGetter: ({ value }) => moment(value).format("DD-MM-YYYY"),
    },
    {
      field: "Options",
      headerName: "Options",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
      renderCell: ({ row }) => (
        <>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedPostId(row);
              setOpenModal(true);
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
          >
            {isPending ? <CircularProgress /> : "Delete"}
          </Button>
        </>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const postDelete = () => {
    mutate({ postId: selectedPostId._id });
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <section className={classes.postSection}>
      <div>
        <Typography variant="h2">Reported Posts</Typography>
      </div>
      <div className={classes.searchContainer}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
          placeholder="Search by username..."
        />
        <IconButton className={classes.searchBtn}>
          <Search />
        </IconButton>
      </div>
      <div>
        <DataGrid
          sx={{ textTransform: "capitalize" }}
          getRowId={(row) => row._id}
          rows={postData}
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
        handleAgree={postDelete}
        titleText={titleText}
        contentText={contentText}
        mutateLoading={isPending}
      />
      <PostModal
        open={openModal}
        handleClose={closeModal}
        data={selectedPostId}
      />
    </section>
  );
};

export default posts;
