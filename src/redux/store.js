import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';
import { themeReducer } from './theme/themeSlice';
// import { breedsReducer } from './breed/breedsSlice';
import { catApi } from './cats/catsApiSlice';

export const store = configureStore({
  reducer: {
    darkTheme: themeReducer,
    // breeds: breedsReducer,
    [catApi.reducerPath]: catApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    catApi.middleware,
  ],
});
setupListeners(store.dispatch);
