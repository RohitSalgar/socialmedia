import { combineReducers } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice"
import authSlice from "./authSlice";
import chatSlice from "./chat";
import { postSlice } from "./post";


export const rootReducer = combineReducers({
	auth: authSlice,
	profile:profileSlice,
	chat: chatSlice,
	post:postSlice
});
