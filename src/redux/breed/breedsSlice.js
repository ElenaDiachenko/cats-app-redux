import { createSlice } from '@reduxjs/toolkit';

const breedsSlice = createSlice({
  name: 'breeds',
  initialState: {
    allBreeds: [],
  },
  reducers: {
    getAllBreeds: {
      reducer(state, action) {
        state.allBreeds = action.payload;
      },
    },
  },
});

export const breedsReducer = breedsSlice.reducer;
export const allBreeds = (state) => state.breeds.allBreeds;
export const { getAllBreeds } = breedsSlice.actions;
