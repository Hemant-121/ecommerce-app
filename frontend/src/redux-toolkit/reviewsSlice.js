import { createSlice } from "@reduxjs/toolkit";


const initialState = []

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews(state, action) {
        state.reviews = action.payload
    },
    logoutReview(state){
      state.reviews = []
    }
  },
});

export const { setReviews,logoutReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
