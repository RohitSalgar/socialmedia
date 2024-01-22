import classes from '../posts/index.module.css'
import {
    IconButton,
    InputBase,
} from "@mui/material";
import {
    Search
} from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/base';


const pages = () => {

    const columns = [
		{
			field: "createdBy",
			headerName: "Created User",
		    flex:1,
            headerAlign: 'center',
            align: 'center',
            headerClassName:'tabel-header'
		},
		{
			field: "description",
			headerName: "Description",
			flex:1.5,
            headerAlign: 'center',
            align: 'center',
            headerClassName:'tabel-header'
		},
		{ field: "reportCount",  headerAlign: 'center', headerName: "Reported Users", flex: 1 },
		{
			field: "createdAt",
			headerName: "Created Time",
            flex:1,
            headerAlign: 'center',
            align: 'center',
            headerClassName:'tabel-header'
		},
		{
			field: "Options",
			headerName: "Options",
			flex:1,
            headerAlign: 'center',
            align: 'center',
            headerClassName:'tabel-header',
			renderCell: ({ row }) => (
				<Button>Delete</Button>
			),
		},
	];

    const rows = [{
        _id:1,
        createdBy:"Mahendra",
        description:"sdfsdfsdf sadfasdf sdfadfa awdfadfasdf",
        reportCount: [{name:"mahi"},{name:"balue"}],
        createdAt:"11/01/2024"
    }]

    return <section className={classes.postSection}>
        <div>
            <h1>Reported Posts</h1>
        </div>
        <div className={classes.searchContainer}>
            <input className={classes.searchInput} placeholder="Search by username..." />
            <IconButton className={classes.searchBtn} >
                <Search />
            </IconButton>
        </div>
        <div>
            <DataGrid
                sx={{ textTransform: "capitalize" }}
                getRowId={(row) => row._id}
                rows={rows}
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
}

export default pages;