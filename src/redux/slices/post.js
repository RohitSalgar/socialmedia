import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tab: "trending",
    replyInput: "false"
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
        }


    },
});

export const { setTab, setReplyInput } =
    postSlice.actions;
export default postSlice.reducer;
