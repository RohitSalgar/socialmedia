import { Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";

const ChangePasswordComponent = lazy(() =>
	import("../views/PublicPages/ChangePassword/index")
);


const publicPaths = [
	{
		path: "servicefeedback/:id",
		element: ServiceFeedbackComponent,
	},
];

function PublicApp() {
	return (
		<Routes>
			{publicPaths.map((e, index) => (
				<Route key={index} path={e.path} element={<e.element />} />
			))}
			<Route
				path="*"
				element={<Navigate state={{ from: location }} to="/login" />}
			/>
		</Routes>
	);
}

export default PublicApp;