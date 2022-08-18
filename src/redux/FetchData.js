import { calendarActions } from './CalendarSlice';
import { API_FIREBASE } from '../api/api';

export const FetchDataFromFetch = () => {
  const fetchData = async url => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  return async dispatch => {
    try {
      const newData = await fetchData(API_FIREBASE);
      console.log(newData);
      const result = [];
      for (let prop in newData) {
        result.push(newData[prop]);
      }
      dispatch(calendarActions.replaceData(result));
    } catch (err) {
      console.log(err);
    }
  };
};

export const putDataFromFetch = updatedData => {
  const fetchData = async url => {
    await fetch(API_FIREBASE, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/' },
      body: JSON.stringify(updatedData),
    });
  };
  return async dispatch => {
    try {
      await fetchData(updatedData);
      dispatch(calendarActions.submitHandler(false));
    } catch (err) {
      console.log(err);
    }
  };
};
