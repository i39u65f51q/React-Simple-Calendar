import { useEffect, useRef } from 'react';
//components
import Form from './Form';
import Reminder from './Reminder';
import Header from './Header';
import Week from './Week';
import TotalDate from './TotalDate';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { calendarActions } from '../redux/CalendarSlice';
import { TbCalendarPlus } from 'react-icons/tb';
//react-icons

const Calendar = () => {
  const isShowForm = useSelector(state => state.calendar.isShowForm);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { openForm, closeForm } = calendarActions;

  useEffect(() => {
    const clickHandler = e => {
      if (inputRef.current) {
        if (!inputRef.current.contains(e.target)) {
          dispatch(closeForm());
        }
      }
    };
    window.addEventListener('click', clickHandler, true);
    return () => window.removeEventListener('click', clickHandler, true);
  }, [dispatch, closeForm]);

  return (
    <>
      <div
        className={` flex h-screen
        ${isShowForm ? 'opacity-30 pointer-events-none' : ''}`}
      >
        <div className="w-3/4 relative">
          {/* Header */}
          <Header />
          {/* Calendar */}
          <main className="grid-cols-7">
            <Week />
            <TotalDate />
          </main>
        </div>
        {/* Reminder */}
        <aside className="w-1/4 border-l border-black">
          <Reminder />
        </aside>
      </div>
      {/* Form */}
      <div
        onClick={() => dispatch(openForm())}
        className=" flex items-center justify-center fixed bottom-5 right-10  w-12 h-12 rounded-3xl  bg-slate-400 shadow-lg cursor-pointer"
      >
        <TbCalendarPlus className="text-white text-2xl" />
      </div>
      {isShowForm ? <Form ref={inputRef} /> : ''}
    </>
  );
};
export default Calendar;
