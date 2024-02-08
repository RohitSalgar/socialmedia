import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSingleChatOn: false,
    singleConnectionId: null,
    chatliveUsers: [],
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
        },
        setLiveUsers: (state, action) => {
            state.chatliveUsers=action.payload
        },
        resetLiveChatUsers: (state) => {
            state.chatliveUsers = []
        }
    },
});

export const { setChatModeOn, setChatModeOff, setSingleChatModeOn, setSingleChatModeOff, setEditOn, setEditOff, setRemoveChatState, setLiveUsers, resetLiveChatUsers } =
    chatSlice.actions;
export default chatSlice.reducer;
