//components
import Form from './Form';
import Reminder from './Reminder';
import Header from './Header';
import Week from './Week';
import TotalDate from './TotalDate';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { calendarActions } from '../redux/CalendarSlice';
//react-icons
import { BsCalendar2Plus } from 'react-icons/bs';

const Calendar = () => {
  const isShowForm = useSelector(state => state.calendar.isShowForm);
  const { toggleForm } = calendarActions;
  const dispatch = useDispatch();

  return (
    <div className="flex h-screen">
      <div className="w-3/4 relative">
        {/* Toggle Form Button */}
        <button
          className="absolute left-5 border p-3 rounded-3xl border-black hover:bg-slate-400"
          onClick={() => dispatch(toggleForm())}
        >
          <BsCalendar2Plus className="bg-white" />
        </button>
        {/* Form */}
        {isShowForm && <Form />}
        {/* Header */}
        <Header />
        {/* Calendar */}
        <main className="grid-cols-7">
          <Week />
          <TotalDate />
        </main>
      </div>

      <aside className="w-1/4 border-l border-black">
        <Reminder />
      </aside>
    </div>
  );
};
export default Calendar;
