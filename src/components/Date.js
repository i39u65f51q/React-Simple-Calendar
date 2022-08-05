import { useDispatch, useSelector } from 'react-redux';
import { calendarActions } from '../redux/CalendarSlice';
import { v4 as uuidv4 } from 'uuid';
import {
  format,
  startOfWeek,
  lastDayOfWeek,
  isSameMonth,
  isSameDay,
  parseISO,
  formatISO,
} from 'date-fns';
import { AiTwotoneCalendar } from 'react-icons/ai';

const Date = ({ day }) => {
  const calendarInitState = useSelector(state => state.calendar);
  const { reminder, selectedDate, today } = calendarInitState;

  const dispatch = useDispatch();
  const { setSelectedDate } = calendarActions;

  //===== CSS Conditions =====
  const isSameDaySameMonth = day => {
    return isSameDay(day, parseISO(today)) && isSameMonth(day, parseISO(today));
  };
  const isNotSameMonth = day => {
    return !isSameMonth(day, parseISO(selectedDate));
  };
  const isWeekend = day => {
    return (
      isSameDay(startOfWeek(day), day) || isSameDay(lastDayOfWeek(day), day)
    );
  };
  const isNormalDay = day => {
    return !isWeekend(day) && !isSameDaySameMonth(day) && !isNotSameMonth(day);
  };
  const isSameWithSelectedDate = day => {
    return isSameDay(parseISO(selectedDate), day);
  };

  const clickHander = day => {
    dispatch(setSelectedDate(formatISO(day)));
  };

  return (
    <>
      <div className="flex flex-col" key={uuidv4()}>
        <div className="h-5">
          {reminder.some(item => isSameDay(item.date, day)) && (
            <AiTwotoneCalendar />
          )}
        </div>
        <button
          className={`
              ${isNormalDay(day) ? 'text-slate-800' : ''}
              ${isSameDaySameMonth(day) ? 'text-green-500' : ''}
              ${isWeekend(day) ? 'text-red-500' : ''}
           ${
             isNotSameMonth(day)
               ? 'font-bold h-10 text-slate-300 pointer-events-none'
               : ''
           },
           ${
             isSameWithSelectedDate(day) && isNormalDay(day)
               ? 'bg-slate-500 text-white'
               : ''
           }
           ${
             isSameWithSelectedDate(day) && isSameDaySameMonth(day)
               ? 'bg-green-500 text-white'
               : ''
           }
           ${
             isSameWithSelectedDate(day) && isWeekend(day)
               ? 'bg-red-500 text-white'
               : ''
           }
           `}
          onClick={() => clickHander(day)}
        >
          {format(day, 'd')}
        </button>
      </div>
    </>
  );
};

export default Date;
