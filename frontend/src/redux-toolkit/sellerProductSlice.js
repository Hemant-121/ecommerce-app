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
    setSellerProd: (state)=>{
      state.sellerProducts = []
    }
  },
});

export const { setSellerProducts, setSellerProd } = sellerProductSlice.actions;

export default sellerProductSlice.reducer;
