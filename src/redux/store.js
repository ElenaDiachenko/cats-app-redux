import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './theme/themeSlice';
import { breedsReducer } from './breed/breedsSlice';

export const store = configureStore({
  reducer: {
    darkTheme: themeReducer,
    breeds: breedsReducer,
  },
});
