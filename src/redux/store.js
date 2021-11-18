import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authSlice';
import appointmentsSlice from './reducers/appointmentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentsSlice,
  },
});
