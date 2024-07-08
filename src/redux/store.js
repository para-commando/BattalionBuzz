import { configureStore } from '@reduxjs/toolkit';
import userAuth from './reducers/userAuth';
import toggleViewReducers from './reducers/toggleViewReducers';

export const store = configureStore({
  reducer: {
    userAuthReducerExport: userAuth,
    toggleViewReducersExport: toggleViewReducers,
  },
});

export default store;
