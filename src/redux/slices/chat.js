import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    isSingleChatOn: false
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
        setSingleChatModeOn: (state) => {
            state.isSingleChatOn = true;
        },
        setSingleChatModeOff: (state) => {
            state.isSingleChatOn = false;
        },


    },
});

export const { setChatModeOff, setChatModeOn, setSingleChatModeOff, setSingleChatModeOn } =
    chatSlice.actions;
export default chatSlice.reducer;
