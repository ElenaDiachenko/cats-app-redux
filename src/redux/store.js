import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { themeReducer } from './theme/themeSlice';
// import { breedsReducer } from './breed/breedsSlice';
import { breedsApi } from './breed/breedsApiSlice';

export const store = configureStore({
  reducer: {
    darkTheme: themeReducer,
    // breeds: breedsReducer,
    [breedsApi.reducerPath]: breedsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    breedsApi.middleware,
  ],
});
setupListeners(store.dispatch);
