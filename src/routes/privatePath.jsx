import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { lazy } from "react";


const HomeComponent = lazy(() =>
	import("../view/User/Private/Home/index")
);

const privatePath = [	
	{
		path: "user/home",
		element: HomeComponent,
	},
];

function PrivateApp() {
	const location = useLocation();
	return (
		<Routes>
			{privatePath.map((e, index) => (
				<Route key={index} path={e.path} element={<e.element />} />
			))}
			<Route
				path="*"
				element={<Navigate state={{ from: location }} to="/user/home" />}
			/>
		</Routes>
	);
}

export default PrivateApp;
