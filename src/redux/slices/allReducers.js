import { combineReducers } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import authSlice from "./authSlice";
import chatSlice from "./chat";
import sidebarSlice from "./sidebarSlice";


export const rootReducer = combineReducers({
	profile: profileSlice,
	auth: authSlice,
	chat: chatSlice,
	sidebar: sidebarSlice

});
