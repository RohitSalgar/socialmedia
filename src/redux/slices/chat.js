import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSingleChatOn: false,
    singleConnectionId: null
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
        setSingleChatModeOn: (state, action) => {
            state.isSingleChatOn = true;
            state.singleConnectionId = action.payload;
        },
        setSingleChatModeOff: (state) => {
            state.isSingleChatOn = false;
            state.singleConnectionId = null
        },
        setEditOn: (state) => {
            state.isEdit = true;
        },
        setEditOff: (state) => {
            state.isEdit = false;
        },
        setRemoveChatState: (state) => {
            state.isSingleChatOn = false;
            state.singleConnectionId = null
        }

    },
});

export const { setChatModeOff, setChatModeOn, setSingleChatModeOff, setSingleChatModeOn, setEditOn, setEditOff, setRemoveChatState } =
    chatSlice.actions;
export default chatSlice.reducer;
