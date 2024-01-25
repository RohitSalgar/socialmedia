import React, { useState } from "react";
import classes from "../posts/index.module.css";
import { IconButton, Typography, Pagination } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllUsers } from "../../../hooks/admin";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Loader from "../../../components/Loader/Loader";

const CustomDataGrid = styled(DataGrid)`
  .MuiTablePagination-displayedRows {
    display: none;
  }
  & .MuiTablePagination-actions {
    display: none;
  }
  & .MuiTablePagination-root {
    display: flex;
    width: 100%;
  }
  & .MuiTablePagination-selectLabel {
    margin-bottom: 0px;
  }
`;

const users = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const { data, isLoading, isFetching } = useGetAllUsers(page, limit);
  const [searchTerm, setSearchTerm] = useState("");
  const { palette } = useTheme();
  const primary = palette.primary.main;

  const columns = [
    {
      field: "fullName",
      headerName: "User Name",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.postSection}>
      <div>
        <Typography variant="h2" color={primary}>
          User List
        </Typography>
      </div>
      <div className={classes.searchContainer}>
        <IconButton className={classes.searchBtn}>
          <Search />
        </IconButton>
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
          placeholder="Search by username..."
        />
      </div>
      <div
        style={{
          height: 450,
          width: "100%",
          marginTop: "10px",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        <CustomDataGrid
          sx={{ textTransform: "capitalize" }}
          getRowId={(row) => row._id}
          rows={data?.userData?.filter((user) =>
            user.fullName.includes(searchTerm.toLowerCase())
          )}
        //   columns={columns.map((column) => ({
        //     ...column,
        //     sortable: false,
        //   }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 3,
              },
            },
          }}
          pageSizeOptions={[3, 6, 9]}
          onPaginationModelChange={(params) => setLimit(params.pageSize)}
          hideFooterSelectedRowCount={true}
          loading={isFetching}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "auto",
            alignItems: "center",
            position: "absolute",
            right: "30px",
            top: "90%",
          }}
        >
          <Pagination
            count={Math.ceil(10 / limit)}
            page={page}
            onChange={(event, value) => setPage(value)}
            variant="outlined"
            color="primary"
          />
        </div>
      </div>
    </section>
  );
};

export default users;
