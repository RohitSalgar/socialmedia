import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { lazy } from "react";

const HomeComponent = lazy(() =>
	import("../view/User/Public/Home/index")
);

const publicHomePath = [	
	{
		path: "public/home",
		element: HomeComponent,
	},
];

function PublicHomeApp() {
	const location = useLocation();
	return (
		<Routes>
			{publicHomePath.map((e, index) => (
				<Route key={index} path={e.path} element={<e.element />} />
			))}
			<Route
				path="*"
				element={<Navigate state={{ from: location }} to="/public/home" />}
			/>
		</Routes>
	);
}

export default PublicHomeApp;
