import { useState } from "react";
import classes from "../posts/index.module.css";
import { IconButton, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import Button from "@mui/material/Button";
import { useGetAllUnverifiedPages, useVerifyPage } from "../../../hooks/admin";
import Loader from "../../../components/Loader/Loader";
import moment from "moment";
import { Box } from "@mui/system";

const pages = () => {
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const { data: pagesData, isLoading } = useGetAllUnverifiedPages();
  const { mutate, isPaused } = useVerifyPage();
  const [searchTerm, setSearchTerm] = useState("");
  
  const columns = [
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "about",
      headerName: "About",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
      valueGetter: ({ value }) => value ?? "-",
    },
    {
      field: "licenseNo",
      headerName: "License No",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
      valueGetter: ({ value }) => moment(value).format("DD-MM-YYYY"),
    },
    {
      field: "Options",
      headerName: "Options",
      flex: 1.7,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
      renderCell: ({ row }) => {
        if (row.status === 1) {
          return (
            <Box sx={{ display: "flex", gap: "3px" }}>
              <Button
                sx={{ border: "1px solid" }}
                onClick={() => mutate({ id: row._id, status: 5 })}
              >
                BLOCK
              </Button>
            </Box>
          );
        } else if (row.status === 4) {
          return (
            <Box sx={{ display: "flex", gap: "3px" }}>
              <Typography sx={{ color: "red" }}>Rejected</Typography>
            </Box>
          );
        } else if (row.status === 5) {
          return (
            <Box sx={{ display: "flex", gap: "3px" }}>
              <Button
                sx={{ color: "#f3cf00", border: "1px solid #f3cf00" }}
                onClick={() => mutate({ id: row._id, status: 1 })}
              >
                UNBLOCK
              </Button>
            </Box>
          );
        } else if (row.status === 3) {
          return (
            <Box sx={{ display: "flex", gap: "3px" }}>
              <Button
                sx={{ color: "#f3cf00", border: "1px solid #f3cf00" }}
                onClick={() => mutate({ id: row._id, status: 1 })}
              >
                Approve
              </Button>
              <Button
                sx={{ border: "1px solid" }}
                onClick={() => mutate({ id: row._id, status: 4 })}
              >
                Reject
              </Button>
            </Box>
          );
        }
      },
    },
  ];

  if (isLoading || isPaused) {
    return <Loader />;
  }

  return (
    <section className={classes.postSection}>
      <div>
        <Typography variant="h2" color={primary}>
          Company Page List
        </Typography>
      </div>
      <div className={classes.searchContainer}>
        <Search sx={{ marginLeft: "5px" }} />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
          placeholder="Search by company name..."
        />
      </div>
      <div>
        <DataGrid
          sx={{ textTransform: "capitalize", minHeight: "450px" }}
          getRowId={(row) => row._id}
          rows={pagesData.filter((page) =>
            page.companyName
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
    </section>
  );
};

export default pages;
