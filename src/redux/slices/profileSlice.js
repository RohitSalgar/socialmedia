import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: null,
  signedIn: false,
  role: null,
  type: null,
  dashboardView: "",
  viewProfileId: null,
  tabView: "",
  sideView: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
      state.dashboardView = "home";
      state.signedIn = true;
      state.tabView = "trending";
      state.sideView = "companyPage",
        state.role = action.payload.role;
      state.viewProfileId = action.payload.userId;
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
    setViewProfileId: (state, action) => {
      state.viewProfileId = action.payload;
    },
    setTabView: (state, action) => {
      state.tabView = action.payload;
    },
    setSideView: (state, action) => {
      state.sideView = action.payload;
    },

  },
});

export const {
  setProfileData,
  removeProfileData,
  setStatus,
  updateProfileData,
  setDashboardView,
  setViewProfileId,
  setTabView,
  setSideView
} = profileSlice.actions;
export default profileSlice.reducer;
