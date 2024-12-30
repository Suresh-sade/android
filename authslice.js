// authslice.js (Updated)
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

const initialState = {
  userId: SecureStore.getItemAsync('userId') || null,
  token: SecureStore.getItemAsync('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      SecureStore.setItemAsync('userId', action.payload.userId);  
      SecureStore.setItemAsync('token', action.payload.token);   
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      SecureStore.removeItem('refreshToken');
      SecureStore.removeItem('userId');  
      SecureStore.removeItem('token');
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
