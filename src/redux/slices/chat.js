import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSingleChatOn: false,
    singleConnectionId: null,
    chatNotification: []
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
        setNotification: (state, action) => {
            // let data
            // if(state.chatNotification.length === 0 ){
            //     data = [action.payload]
            // }else{
            //     data = action.payload
            // }
            state.chatNotification = [...state.chatNotification,action.payload ];
        }
    },
});

export const { setChatModeOff, setChatModeOn, setSingleChatModeOff, setSingleChatModeOn, setEditOn, setNotification, setEditOff, setRemoveChatState } =
    chatSlice.actions;
export default chatSlice.reducer;
