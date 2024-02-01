import { useState } from "react";
import classes from "../posts/index.module.css";
import { IconButton, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { useGetAllSchedules } from "../../../hooks/admin";
import Loader from "../../../components/Loader/Loader";
import moment from "moment";

const schedules = () => {
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const { data: scheduleData, isLoading } = useGetAllSchedules();
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "pol",
      headerName: "POL",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
    },
    {
      field: "pod",
      headerName: "POD",
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
      field: "bookingCutOff",
      headerName: "Bookings Close",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "tabel-header",
      valueGetter: ({ value }) => moment(value).format("DD-MM-YYYY"),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  console.log(scheduleData, "sdf");

  return (
    <section className={classes.postSection}>
      <div>
        <Typography variant="h2" color={primary}>
          Schedule List
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
          rows={scheduleData.filter(
            (schedule) =>
              schedule.companyName &&
              schedule.companyName
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

export default schedules;
