import { createSlice } from '@reduxjs/toolkit';

export const userAuthReducers = createSlice({
  name: 'toggleViewReducers',
  initialState: {
    valueIsDetailsVisible: false,
    valueIsChatsVisible: false,
    currentOpenedUser: '',
  },
  reducers: {
    isDetailsVisible: (state, action) => {
      state.valueIsDetailsVisible = action.payload;
    },
    isChatsVisible: (state, action) => {
      state.valueIsChatsVisible = action.payload;
    },
    currentOpenedUser: (state, action) => {
      state.currentOpenedUser = action.payload;
      console.log('🚀 ~ action.payload:', action.payload);
    },
  },
});

export const { isDetailsVisible, isChatsVisible, currentOpenedUser } =
  userAuthReducers.actions;
export default userAuthReducers.reducer;
