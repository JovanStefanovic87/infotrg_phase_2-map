'use client';

import { configureStore } from '@reduxjs/toolkit';
import activePageReducer from './features/nav/activePageSlice';
import formReducer from './features/form/formSlice';
import deviceReducer from './features/device/deviceSlice';

export const store = configureStore({
  reducer: {
    activePage: activePageReducer,
    form: formReducer,
    device: deviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
