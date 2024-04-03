import { createSlice } from "@reduxjs/toolkit";

const sellerProductSlice = createSlice({
  name: "sellerProducts",
  initialState: {
    sellerProducts: [],
  },
  reducers: {
    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload.data;
    },
  },
});

export const { setSellerProducts } = sellerProductSlice.actions;

export default sellerProductSlice.reducer;
