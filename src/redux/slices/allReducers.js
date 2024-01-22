import { combineReducers } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice"
import authSlice from "./authSlice";
import chatSlice from "./chat";
import sidebarSlice from "./sidebarSlice";
import { postSlice } from "./post";


export const rootReducer = combineReducers({
	auth: authSlice,
	chat: chatSlice,
	sidebar: sidebarSlice,
	profile:profileSlice,
	post:postSlice
});
