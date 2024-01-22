import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { removeProfileData } from "../redux/slices/profileSlice";
// import OperationAdminApp from "./operationAdminPaths";
import PublicApp from "./publicPaths";
import PrivateApp from "./privatePath";
import PublicHomeApp from "./publicHome";
import AdminApp from "./adminPaths";

function RouteChecker() {
	const dispatch = useDispatch();
	const profileData = useSelector((state) => state.profile.profileData);
	const token = (localStorage.getItem("amsSocialToken"));
	const signedIn = (localStorage.getItem("amsSocialSignedIn"));
	const decodedData = localStorage.getItem("amsSocialToken") != null ? jwtDecode(localStorage.getItem("amsSocialToken")) : null;
console.log("run")
	useEffect(() => {
		if (profileData?.signedIn === true) {
			if (token === null) {
				dispatch(removeProfileData());
			}
		}
		if (profileData?.signedIn === false) {
			if (token === null) {
				localStorage.removeItem("amsSocialSignedIn");
			}
		}

		if (signedIn != null && signedIn === "true" && token) {
			const currentTimeInSeconds = Math.floor(Date.now() / 1000);
			const issuedTimeInSeconds = decodedData.iat;
			const fiveDaysInSeconds = 5 * 24 * 60 * 60; // 5 days in seconds
			if (currentTimeInSeconds - issuedTimeInSeconds > fiveDaysInSeconds) {
				dispatch(removeProfileData());
				localStorage.removeItem("amsSocialToken");
				localStorage.removeItem("amsSocialId");
				localStorage.removeItem("amsSocialSignedIn");
			}
		}
	}, [token, decodedData, profileData?.signedIn,signedIn]);


	if (token == null && signedIn == null) {
		console.log("SDfsdf")
		return <PublicApp />;
	} else if(signedIn === "false" && token == null){
		console.log("run")
		return <PublicHomeApp />
	}
	else if (signedIn != null && signedIn === "true" && token) {
		if (decodedData.role === 1) {
			console.log("sdfadmvfsgfvn")
			return <PrivateApp />
		} else {
			return  <AdminApp />
		}
	}
}

export default function RouterRender() {
	return (
		<BrowserRouter>
			{/* <RouteChecker /> */}
			<AdminApp />
		</BrowserRouter>
	);
}



// import jwtDecode from "jwt-decode";
// import { lazy, useEffect } from "react";
// import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { removeProfileData } from "../redux/slices/profileSlice";

// // Import Lazy-loaded components
// const LoginPageComponent = lazy(() => import("../view/User/Public/Login/index"));
// const OTPPageComponent = lazy(() => import("../view/User/Public/Otp/index"));
// const RegisterComponent = lazy(() => import("../view/User/Public/Register/index"));
// const HomeComponent = lazy(() => import("../view/User/Private/Home/index"));

// // Public routes configuration
// const publicPaths = [
//   { path: "login", element: <LoginPageComponent /> },
//   { path: "otp/:id", element: <OTPPageComponent /> },
//   { path: "register", element: <RegisterComponent /> },
//   { path: "*", element: <Navigate to="/login" /> }, // Redirect to login for unknown routes
// ];

// // Private routes configuration
// const privatePaths = [{ path: "user/home", element: <HomeComponent /> }];

// // Function to check if the token is expired
// const isTokenExpired = (decodedToken) => {
//   const currentTimeInSeconds = Math.floor(Date.now() / 1000);
//   const issuedTimeInSeconds = decodedToken.iat;
//   const fiveDaysInSeconds = 5 * 24 * 60 * 60; // 5 days in seconds
//   return currentTimeInSeconds - issuedTimeInSeconds > fiveDaysInSeconds;
// };

// // Wrapper for private routes
// const PrivateRoute = ({ element }) => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("amsSocialToken");
//   const signedIn = localStorage.getItem("amsSocialSignedIn");
//   const decodedData = token != null ? jwtDecode(token) : null;

//   useEffect(() => {
//     if (signedIn != null && signedIn === "true" && token && decodedData) {
//       if (decodedData.role !== 1) {
//         // Handle admin case
//         // Dispatch an action or handle accordingly
//       } else if (isTokenExpired(decodedData)) {
//         // Token is more than 5 days old, logout the user
//         dispatch(removeProfileData());
//         localStorage.removeItem("amsSocialToken");
//         localStorage.removeItem("amsSocialId");
//         localStorage.removeItem("amsSocialSignedIn");
//       }
//     }
//   }, [token, decodedData]);

//   return <>{element}</>;
// };

// // Component for public routes
// const PublicApp = () => (
//   <Routes>
//     {publicPaths.map(({ path, element }, index) => (
//       <Route key={index} path={path} element={element} />
//     ))}
//   </Routes>
// );

// // Component for private routes
// const PrivateApp = () => (
//   <Routes>
//     {privatePaths.map(({ path, element }, index) => (
//       <Route key={index} path={path} element={<PrivateRoute element={element} />} />
//     ))}
//     {/* Redirect to home for unknown routes */}
//     <Route path="*" element={<Navigate to="/user/home" />} />
//   </Routes>
// );

// // Main Router component
// const RouterRender = () => (
//   <BrowserRouter>
//     {token == null ? <PublicApp /> : <PrivateApp />}
//   </BrowserRouter>
// );

// export default RouterRender;

