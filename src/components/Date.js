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
    return !isSameMonth(day, parseISO(today));
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

  const clickHandler = day => {
    dispatch(setSelectedDate(formatISO(day)));
  };

  const getTodo = day => {
    const result = [];
    let note = null;
    for (let i = 0; i < reminder.length; i++) {
      if (isSameDay(parseISO(reminder[i].date), day)) {
        note = reminder[i].content;
        result.push(
          <div
            key={uuidv4()}
            className="flex items-center gap-2 w-full overflow-y-auto "
          >
            <AiTwotoneCalendar />
            {note}
          </div>
        );
      }
    }
    return result;
  };

  return (
    <>
      <button
        onClick={() => clickHandler(day)}
        className={`
        h-28
        flex flex-col  items-start border border-slate-300 p-2 
        overflow-y-auto

              ${isNormalDay(day) ? 'text-slate-800' : ''}
              ${isSameDaySameMonth(day) ? 'text-green-500' : ''}
              ${isWeekend(day) ? 'text-red-500' : ''}
           ${
             isNotSameMonth(day)
               ? 'pointer-events-none font-bold text-slate-300 '
               : ''
           },
           ${
             isSameWithSelectedDate(day) && isNormalDay(day)
               ? 'bg-slate-500 text-slate-50 pointer-events-none'
               : ''
           }
           ${
             isSameWithSelectedDate(day) && isSameDaySameMonth(day)
               ? ' bg-green-500 text-slate-50 pointer-events-none'
               : ''
           }
           ${
             isSameWithSelectedDate(day) && isWeekend(day)
               ? 'bg-red-500 text-slate-50 pointer-events-none'
               : ''
           }
           `}
      >
        <p className="font-bold">{format(day, 'd')}</p>
        <div className="text-xs w-full flex flex-col items-start gap-1 ">
          {getTodo(day)}
        </div>
      </button>
    </>
  );
};

export default Date;
