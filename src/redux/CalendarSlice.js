import { createSlice } from '@reduxjs/toolkit';
import { addMonths, subMonths, formatISO, parseISO, format } from 'date-fns';

const initialState = {
  currentDate: formatISO(new Date()),
  selectedDate: formatISO(new Date()),
  today: formatISO(new Date()),
  reminder: [],
  isShowForm: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    toggleForm: state => {
      state.isShowForm = !state.isShowForm;
    },
    addReminder: (state, action) => {
      state.reminder = [...state.reminder, action.payload];
    },
    plusMonth: state => {
      state.currentDate = formatISO(addMonths(parseISO(state.currentDate), 1));
    },
    minusMonth: state => {
      state.currentDate = formatISO(subMonths(parseISO(state.currentDate), 1));
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const calendarReducer = calendarSlice.reducer;
export const calendarActions = calendarSlice.actions;
