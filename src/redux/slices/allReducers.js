import { combineReducers } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import authSlice from "./authSlice";


export const rootReducer = combineReducers({
	profile: profileSlice,
	auth: authSlice

});
