import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts(state, action) {
      state.user = action.payload.user;
    }
  },
});

export const { getProducts } = productsSlice.actions;
export default productsSlice.reducer;
