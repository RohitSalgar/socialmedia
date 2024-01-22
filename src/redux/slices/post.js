import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tab: "trending",
    // isSingleChatOn: false
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setTab: (state,action) => {
            state.tab = action.payload;
        },


    },
});

export const { setTab } =
    postSlice.actions;
export default postSlice.reducer;
