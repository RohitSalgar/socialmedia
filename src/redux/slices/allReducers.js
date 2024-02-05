import { combineReducers } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice"
import authSlice from "./authSlice";
import chatSlice from "./chat";
import sidebarSlice from "./sidebarSlice";
import postSlice from "./post";
import popupSlice from "./popupSlice";
import advertSlice from "./advert"

export const rootReducer = combineReducers({
	auth: authSlice,
	chat: chatSlice,
	sidebar: sidebarSlice,
	profile: profileSlice,
	post: postSlice,
	popup: popupSlice,
	advert:advertSlice
});
