import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backend } from '../../api/index.js';

export const fetchFieldsData = createAsyncThunk(
  'fields/fetchFieldsData',
  (token) =>
    backend(token)
      .get(`/fields`)
      .then(({ data }) => data),
);
export const fetchPossibleFields = createAsyncThunk(
  'fields/fetchPossibleFields',
  ({ token, accID }) =>
    backend(token)
      .get(`/fieldsPossible/${accID}`)
      .then(({ data }) => data),
);

const initialState = {
  fields: null,
  loading: null,
};

export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    removeFields: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFieldsData.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchFieldsData.fulfilled, (state, action) => {
      state.fields = action.payload;
      state.loading = true;
    });
    builder.addCase(fetchPossibleFields.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchPossibleFields.fulfilled, (state, action) => {
      state.fields = action.payload;
      state.loading = true;
    });
  },
});

export const { removeFields } = fieldsSlice.actions;

export default fieldsSlice.reducer;
