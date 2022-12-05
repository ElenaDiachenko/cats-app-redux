import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';
import { themeReducer } from './theme/themeSlice';
import { apiSlice } from './apiSlice';
// import { catApi } from './cats/catsApiSlice';

export const store = configureStore({
  reducer: {
    darkTheme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],
});
setupListeners(store.dispatch);
