import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { FetchDataFromFetch, putDataFromFetch } from './redux/FetchData';
import Calendar from './components/Calendar';

function App() {
  const calendar = useSelector(state => state.calendar);
  const { reminder, isSubmitting } = calendar;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchDataFromFetch());
  }, [dispatch]);

  useEffect(() => {
    if (isSubmitting) {
      dispatch(putDataFromFetch(reminder));
    }
  }, [dispatch, reminder, isSubmitting]);

  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
