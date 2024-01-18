import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
	name: "profile",
	initialState: {
		profileData: null,
		signedIn: false,
		role: null,
		roleName: null,
		type: null,
		permission: null,
	},
	reducers: {
		setProfileData: (state, action) => {
			state.profileData = action.payload;
			state.signedIn = true;
			state.role = action.payload.role;
			state.type = action.payload.type;
		},
		removeProfileData: (state) => {
			state.profileData = null;
			state.signedIn = false;
			state.role = null;
			state.roleName = null;
			state.type = null;
			state.permission = null;
		},
		setStatus: (state, action) => {
			state.profileData.status = action.payload;
		},
		setRoleData: (state, action) => {
			state.permission = action.payload?.permission;
			state.roleName = action.payload?.roleName;
		},
		updateProfileData: (state, action) => {
			state.profileData = {
				...state.profileData,
				...action.payload,
			};
		},
	},
});

export const {
	setProfileData,
	removeProfileData,
	setStatus,
	setRoleData,
	updateProfileData,
} = profileSlice.actions;
export default profileSlice.reducer;
