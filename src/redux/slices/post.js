import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tab: "trending",
    replyInput: "false",
    hashtag: "",
    page: 1,
    pageSize: 10,
    notificationPostId: ''
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setTab: (state, action) => {
            state.tab = action.payload;
        },
        setReplyInput: (state, action) => {
            state.replyInput = action.payload;
        },
        updateHashtag: (state, action) => {
            state.hashtag = action.payload
        },
        removeHastag: (state) => {
            state.hashtag = ""
        },
        removePostData: (state) => {
            state.tab = "trending"
            state.replyInput = "false"
            state.hashtag = ""
            state.page = 1
            state.pageSize = 10
        },
        updatePage: (state, action) => {
            state.page = action.payload
        },
        resetPage: (state) => {
            state.page = 1
        },
        setNotificationPostId: (state, action) => {
            state.notificationPostId = action.payload;
        }
    },
});

export const { setTab, setReplyInput, updateHashtag, removeHastag, removePostData, setNotificationPostId } =
    postSlice.actions;
export default postSlice.reducer;
