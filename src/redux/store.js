import { configureStore } from '@reduxjs/toolkit';
import userAuth from './reducers/userAuth';

export const store = configureStore({
  reducer: {
    userAuthReducerExport: userAuth,
  },
});

export default store;
