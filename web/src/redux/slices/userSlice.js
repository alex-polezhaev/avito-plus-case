import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backend } from '../../api/index.js';

export const fetchUserData = createAsyncThunk('user/fetchUserData', (token) =>
  backend(token)
    .get('/users')
    .then(({ data }) => {
      data.id = data._id;
      return data;
    }),
);

const initialState = {
  user: null,
  token: null,
  archived: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: () => initialState,
    switchArchived: (state) => {
      if (state.archived === true) {
        state.archived = false;
      } else {
        state.archived = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { loginUser, logoutUser, switchArchived } = userSlice.actions;

export default userSlice.reducer;
