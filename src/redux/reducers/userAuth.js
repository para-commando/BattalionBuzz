import { createSlice } from '@reduxjs/toolkit';

export const userAuthReducers = createSlice({
  name: 'userAuth',
  initialState: {
    valueIsUserNew: false,
    valueIsUserValidated: false,

  },
  reducers: {
    isUserNew: (state, action) => {
      state.valueIsUserNew = action.payload;
    },
    isUserValidated: (state, action) => {
      state.valueIsUserValidated = action.payload;
    },
  },
});

export const { isUserNew, isUserValidated } = userAuthReducers.actions;
export default userAuthReducers.reducer;
