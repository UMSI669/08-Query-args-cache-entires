import { configureStore } from '@reduxjs/toolkit';
import { eventsApi } from '../services/eventsApi';
import selectionReducer from '../features/selection/selectionSlice';

export const store = configureStore({
  reducer: {
    selection: selectionReducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventsApi.middleware),
});
