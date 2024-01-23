import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    isSingleChatOn: false,
    isEdit : false,
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
        setEditOn:(state) => {
            state.isEdit = true;
        },
        setEditOff:(state) => {
            state.isEdit = false;
        },

    },
});

export const { setChatModeOff, setChatModeOn, setSingleChatModeOff, setSingleChatModeOn , setEditOn , setEditOff } =
    chatSlice.actions;
export default chatSlice.reducer;
