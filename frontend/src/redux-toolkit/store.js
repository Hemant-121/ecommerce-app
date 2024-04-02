import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import productsReducer from './productSlice.js';

const store = configureStore({
  reducer: {
      auth : authReducer,
      products : productsReducer
  }
});


export default store;
