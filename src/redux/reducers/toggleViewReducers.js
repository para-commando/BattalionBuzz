import { createSlice } from '@reduxjs/toolkit';

export const userAuthReducers = createSlice({
  name: 'toggleViewReducers',
  initialState: {
    valueIsDetailsVisible: false,
    valueIsChatsVisible: false,
    valueIsLandingPageVisible: true,
    currentOpenedUser: '',
    messages: [],
    //
  },
  reducers: {
    isDetailsVisible: (state, action) => {
      state.valueIsDetailsVisible = action.payload;
    },
    isChatsVisible: (state, action) => {
      state.valueIsChatsVisible = action.payload;
    },
    isLandingPageVisible: (state, action) => {
      state.valueIsLandingPageVisible = action.payload;
    },
    currentOpenedUser: (state, action) => {
      state.currentOpenedUser = action.payload;
     },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { isDetailsVisible, isChatsVisible, currentOpenedUser,isLandingPageVisible,setMessages } =
  userAuthReducers.actions;
export default userAuthReducers.reducer;
