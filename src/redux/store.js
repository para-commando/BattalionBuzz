import { configureStore } from '@reduxjs/toolkit';
import reducer1 from './reducers/reducer1';

export const store = configureStore({
  reducer: {
    reducer1Export: reducer1,
  },
});

export default store;
