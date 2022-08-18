import { createSlice } from '@reduxjs/toolkit';
import { addMonths, subMonths, formatISO } from 'date-fns';

const initialState = {
  currentDate: formatISO(new Date()),
  selectedDate: formatISO(new Date()),
  today: formatISO(new Date()),
  reminder: [],
  isShowForm: false,
  isSubmitting: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    openForm: state => {
      state.isShowForm = true;
    },
    closeForm: state => {
      state.isShowForm = false;
    },
    addReminder: (state, action) => {
      state.reminder = [...state.reminder, action.payload];
    },
    plusMonth: state => {
      state.currentDate = formatISO(addMonths(new Date(state.currentDate), 1));
    },
    minusMonth: state => {
      state.currentDate = formatISO(subMonths(new Date(state.currentDate), 1));
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    replaceData: (state, action) => {
      state.reminder = action.payload;
    },
    removeData: (state, action) => {
      state.reminder = state.reminder.filter(
        item => item.id !== action.payload.id
      );
    },
    submitHandler: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
});

export const calendarReducer = calendarSlice.reducer;
export const calendarActions = calendarSlice.actions;
