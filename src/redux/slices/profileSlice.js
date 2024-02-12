import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: null,
  signedIn: false,
  role: null,
  type: null,
  dashboardView: "",
  viewProfileId: null,
  viewCompanyId: null,
  tabView: "",
  sideView: "",
  skip: false,
  companyId: null,
  mentionedUserName: null
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
      state.sideView = "companyPage";
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
    setMentionedUserName: (state, action) => {
      state.mentionedUserName = action.payload;
    },
    setViewProfileId: (state, action) => {
      state.viewProfileId = action.payload;
    },
    setViewCompanyId: (state, action) => {
      state.viewCompanyId = action.payload;
    },
    setCompanyId: (state, action) => {
      state.companyId = action.payload;
    },
    setTabView: (state, action) => {
      state.tabView = action.payload;
    },
    setSideView: (state, action) => {
      state.sideView = action.payload;
    },
    setSkip: (state) => {
      state.skip = true;
    },
    clearSkip: (state) => {
      state.skip = false;
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
  setViewCompanyId,
  setCompanyId,
  setTabView,
  setSideView,
  setSkip,
  clearSkip,
  setMentionedUserName
} = profileSlice.actions;
export default profileSlice.reducer;
