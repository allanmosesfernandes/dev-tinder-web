import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: [],
    reducers: {
        populateFeed: (state, action) => {
            return action.payload;
        },
        emptyFeed: (state, action) => {
            return [];
        }
    }
})

export const { populateFeed, emptyFeed } = feedSlice.actions;
export default feedSlice.reducer;