import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedAcc: 'stub',
  selectedSpec: 'stub',
  isSlideRendered: false,
  page: 1,
};

export const slidesSlice = createSlice({
  name: 'slides',
  initialState,
  reducers: {
    hideSpecsSelect: (state) => {
      state.isSlideRendered = false;
    },
    changeSelectedAcc: (state, action) => {
      state.selectedAcc = action.payload;
    },
    changeSelectedSpec: (state, action) => {
      state.selectedSpec = action.payload;
    },
    showSlide: (state) => {
      state.isSlideRendered = true;
    },
    hideSlide: (state) => {
      state.isSlideRendered = false;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    clearSlide: () => initialState,
  },
});

export const {
  hideSpecsSelect,
  changeSelectedAcc,
  changeSelectedSpec,
  showSlide,
  hideSlide,
  changePage,
  clearSlide,
} = slidesSlice.actions;

export default slidesSlice.reducer;
