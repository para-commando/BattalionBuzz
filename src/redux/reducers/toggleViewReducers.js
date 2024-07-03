import { createSlice } from '@reduxjs/toolkit';

export const userAuthReducers = createSlice({
  name: 'toggleViewReducers',
  initialState: {
    valueIsDetailsVisible: false,
    valueIsChatsVisible: false,
  },
  reducers: {
    isDetailsVisible: (state, action) => {
      state.valueIsDetailsVisible = action.payload;
    },
    isChatsVisible: (state, action) => {
      state.valueIsChatsVisible = action.payload;
    },
  },
});

export const {isDetailsVisible,isChatsVisible} = userAuthReducers.actions;
export default userAuthReducers.reducer;
