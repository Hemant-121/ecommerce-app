import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setAllProducts: (state, action) => {
      console.log("products",action.payload)
      state.products = action.payload;
    },
    setProducts: (state) => {
      state.products = []
    },
  },
});

export const { setAllProducts, setProducts } = productSlice.actions;

export default productSlice.reducer;



