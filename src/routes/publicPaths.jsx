import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { lazy } from "react";

const LoginPageComponent = lazy(() =>
	import("../view/User/Public/Login/index")
);

const OTPPageComponent = lazy(() =>
	import("../view/User/Public/Otp/index")
);

const RegisterComponent = lazy(() =>
	import("../view/User/Public/Register/index")
);

const publicPaths = [
	{
		path: "login",
		element: LoginPageComponent,
	},
	{
		path: "otp/:id",
		element: OTPPageComponent,
	},
	{
		path: "register",
		element: RegisterComponent,
	},
];
console.log("public rendered")
function PublicApp() {
	const location = useLocation()
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
