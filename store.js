// store.js

import { configureStore } from '@reduxjs/toolkit';  // From @reduxjs/toolkit
import authReducer from './authslice' // Import your root reducer

const store = configureStore({
  reducer: {
    auth:authReducer
  },  // You can combine reducers here if you have multiple
});

export default store;
