import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData: null,
    signedIn: false,
    role: null,
    type: null,
	dashboardView:'',
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfileData: (state, action) => {
			state.profileData = action.payload;
			state.dashboardView='home'
			state.signedIn = true;
			state.role = action.payload.role;
		},
		removeProfileData: (state) => {
			state.profileData = null;
			state.signedIn = false;
			state.role = null;
		},
		setStatus: (state, action) => {
			state.profileData.status = action.payload;
		},
		updateProfileData: (state, action) => {
			state.profileData = {
				...state.profileData,
				...action.payload,
			};
		},
		setDashboardView: (state, action) => {
			state.dashboardView = action.payload;
		},
    },
});

export const { setProfileData, removeProfileData, setStatus, updateProfileData , setDashboardView } =
    profileSlice.actions;
export default profileSlice.reducer;
