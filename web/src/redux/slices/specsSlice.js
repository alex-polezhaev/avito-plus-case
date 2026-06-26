import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSpecsByAccId } from '../../api/specsBackend.js';

export const fetchSpecs = createAsyncThunk(
  'specs/fetchSpecs',
  async ({ token, accID }) => getSpecsByAccId(token, accID),
);

const initialState = {
  specs: [],
  currSpecData: {},
  isSpecsLoading: false,
};

export const specsSlice = createSlice({
  name: 'specs',
  initialState,
  reducers: {
    removeSpecs: () => initialState,
    updateCurrSpecData: (state, action) => {
      state.currSpecData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecs.fulfilled, (state, action) => {
        state.specs = action.payload;
        state.isSpecsLoading = false;
      })
      .addCase(fetchSpecs.pending, (state) => {
        state.isSpecsLoading = true;
      });
  },
});

export const { removeSpecs, updateCurrSpecData } = specsSlice.actions;

export default specsSlice.reducer;
