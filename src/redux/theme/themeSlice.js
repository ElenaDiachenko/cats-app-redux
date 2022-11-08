import { createSlice } from '@reduxjs/toolkit';

const themeFromLS = !!localStorage.getItem('CATS_APP_THEME');

const initialState = themeFromLS;
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state) {
        localStorage.removeItem('CATS_APP_THEME');
      } else {
        localStorage.setItem('CATS_APP_THEME', '_');
      }
      return (state = !state);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
