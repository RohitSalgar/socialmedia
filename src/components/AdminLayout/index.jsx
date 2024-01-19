import Sidebar from "../Sidebar/index";
import { Box, CssBaseline, Drawer, useMediaQuery } from "@mui/material";
import Main from "../Main/Main";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../redux/slices/sidebarSlice";

const drawerWidth = 350;

function InternalUserLayout() {
	const sidebar = useSelector((state) => state.sidebar.sidebarStatus);
	const dispatch = useDispatch();
	const mobileView = useMediaQuery("(max-width:900px)");

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant={mobileView ? "temporary" : "persistent"}
				anchor="left"
				open={true}>
				<Sidebar onClick={() => dispatch(closeSidebar())} />
			</Drawer>
			<Main open={sidebar} ismobile={mobileView ? 1 : 0}>
				<Outlet />
			</Main>
		</Box>
	);
}

export default InternalUserLayout;
