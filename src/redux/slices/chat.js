import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChatModeOn: (state) => {
            state.isOpen = true;
        },
        setChatModeOff: (state) => {
            state.isOpen = false;
        },

    },
});

export const { setChatModeOff, setChatModeOn } =
    chatSlice.actions;
export default chatSlice.reducer;
