import { createSlice } from '@reduxjs/toolkit';

const breedsSlice = createSlice({
  name: 'breeds',
  initialState: {
    selectedBreed: {},
  },
  reducers: {
    getSelectedBreed: {
      reducer(state, action) {
        state.selectedBreed = action.payload;
      },
    },
  },
});

export const breedsReducer = breedsSlice.reducer;
export const selectedBreed = (state) => state.breeds.selectedBreed;
export const { getSelectedBreed } = breedsSlice.actions;
