import { createSlice } from "@reduxjs/toolkit";

const advertSlice = createSlice({
	name: "advert",
	initialState: {
		adStatus: true,
	},
	reducers: {
		closeAdvert: (state) => {
			state.adStatus = false;
		},
        openAdvert : (state)=>{
            state.adStatus = true;
        }
	},
});

export const { closeAdvert, openAdvert } = advertSlice.actions;
export default advertSlice.reducer;
