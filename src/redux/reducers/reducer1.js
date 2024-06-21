import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const reducerOneAsync = createAsyncThunk(
  'reducer1/reducerOne',
  async (data) => {}
);

export const reducer1 = createSlice({
  name: 'reducer1',
  initialState: {
    value: [],
  },
  reducers: {
    reducerOne: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(reducerOreducerOneAsyncne.pending, (state) => {})
      .addCase(reducerOneAsync.fulfilled, (state, action) => {})
      .addCase(reducerOneAsync.rejected, (state, action) => {});
  },
});

export const { reducerOne } =
reducer1.actions;
export default reducer1.reducer;
