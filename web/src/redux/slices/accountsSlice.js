import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backend } from '../../api/index.js';

const initialState = {
  accounts: [],
};

export const getAccs = createAsyncThunk('accounts', (token) =>
  backend(token)
    .get(`/accountsAndSpecs/byUser`)
    .then(({ data }) => data),
);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    removeAccs: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAccs.fulfilled, (state, action) => {
      state.accounts = action.payload;
    });
  },
});

export const { removeAccs } = accountsSlice.actions;

export default accountsSlice.reducer;
