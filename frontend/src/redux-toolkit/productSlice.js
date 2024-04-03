import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload.data;
    },
    setProducts: (state) => {
      state.products = []
    },
  },
});

export const { setAllProducts, setProducts } = productSlice.actions;

export default productSlice.reducer;



