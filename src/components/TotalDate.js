import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Date from './Date';
import {
  startOfWeek,
  lastDayOfWeek,
  startOfMonth,
  lastDayOfMonth,
  eachDayOfInterval,
  parseISO,
} from 'date-fns';

const TotalDate = () => {
  const currentDate = useSelector(state => state.calendar.currentDate);

  //===== Render Date =====
  const getDate = () => {
    const startDay = startOfWeek(startOfMonth(parseISO(currentDate)));
    const endDay = lastDayOfWeek(lastDayOfMonth(parseISO(currentDate)));

    return eachDayOfInterval({
      start: startDay,
      end: endDay,
    });
  };

  return (
    <div className="grid grid-cols-7 text-center">
      {getDate().map(day => {
        return <Date key={uuidv4()} day={day} />;
      })}
    </div>
  );
};

export default TotalDate;
