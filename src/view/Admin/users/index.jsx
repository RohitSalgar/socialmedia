import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { AdminSideBar } from "../../../components/Admin/AdminSideBar";
import "./index.css";

export function UsersGrid() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "col1", headerName: "Name", width: 150 },
    { field: "col2", headerName: "Company", width: 150 },
    { field: "col3", headerName: "MobileNumber", width: 150 },
    {
      field: "col4",
      headerName: "view",
      renderCell: () => (
        <Button
          type="button"
          onClick={() => {
            handleClickOpen();
          }}
        >
          VIEW
        </Button>
      ),
      width: 150,
    },
  ];

  const rows = [
    {
      id: 1,
      col1: "Vishal Goud",
      col2: "bluewatersPVT",
      col3: "9875356878",
    },
    {
      id: 2,
      col1: "Gowtham nandha",
      col2: "Star PVT",
      col3: "9878763878",
    },
    {
      id: 3,
      col1: "sidhartha roy",
      col2: "cargopvt",
      col3: "9872518629",
    },
  ];

  return (
    <>
      <div className="maindiv">
        <AdminSideBar />
        <div className="sidediv">
        <div className="searchbox">
					<input
						type="text"
						placeholder="Search Country"
					/>
				</div>
        <div
          style={{
            height: 430,
            width: "100%",
            marginTop: "10px",
            borderRadius: "5px",
          }}
        >
          <DataGrid rows={rows} columns={columns} />
          <Dialog open={open} onClose={handleClose}>
            <div>Dialog Content</div>
          </Dialog>
        </div>
        </div>
      </div>
    </>
  );
}
