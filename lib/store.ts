// lib/store.ts

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import bookingReducer from './bookingSlice';

const rootReducer = combineReducers({
  booking: bookingReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['booking'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Konfigurasi store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

// Buat persistor hanya di client-side
// export const persistor =
//   typeof window !== 'undefined' ? persistStore(store) : { persist: () => null } as any;
export const persistor = typeof window !== 'undefined'
  ? persistStore(store)
  : (null as unknown as ReturnType<typeof persistStore>);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;