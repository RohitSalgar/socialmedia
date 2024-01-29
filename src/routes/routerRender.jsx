import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { removeProfileData } from "../redux/slices/profileSlice";
import PublicApp from "./publicPaths";
import PrivateApp from "./privatePath";
import PublicHomeApp from "./publicHome";
import AdminApp from "./adminPaths";

function RouteChecker() {
	const dispatch = useDispatch();
	const {profileData, skip, signedIn } = useSelector((state) => state.profile);
	const token = (localStorage.getItem("amsSocialToken"));
	const decodedData = localStorage.getItem("amsSocialToken") != null ? jwtDecode(localStorage.getItem("amsSocialToken")) : null;
	useEffect(() => {
		
		if (profileData?.signedIn === true) {
			if (token === null) {
				dispatch(removeProfileData());
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

	if (token == null &&  !skip) {
		return <PublicApp />;
	} else if(skip === true && token == null){
		return <PublicHomeApp />
	}
	else if (signedIn && token) {
		if (decodedData.role === 1) {
			return <PrivateApp />
		} else {
			return  <AdminApp />
		}
	}
}

export default function RouterRender() {
	
	return (
		<BrowserRouter>
			<RouteChecker />
		</BrowserRouter>
	);
}

