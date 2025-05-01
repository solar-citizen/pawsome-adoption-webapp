import { configureStore } from '@reduxjs/toolkit';

import { petSlice } from './petSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    [petSlice.reducerPath]: petSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(petSlice.middleware),
});
