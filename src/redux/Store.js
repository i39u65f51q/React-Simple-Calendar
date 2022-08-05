import { configureStore } from '@reduxjs/toolkit';
import { calendarReducer } from './CalendarSlice';

const Store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

export default Store;
