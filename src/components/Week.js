import { v4 as uuidv4 } from 'uuid';
import { format, startOfWeek, addDays, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';

const Week = () => {
  const currentDate = useSelector(state => state.calendar.currentDate);

  const getWeeks = () => {
    const week = [];
    const startDayOfWeek = startOfWeek(parseISO(currentDate));

    for (let day = 0; day < 7; day++) {
      week.push(addDays(startDayOfWeek, day));
    }
    return week;
  };

  return (
    <div className="flex justify-around my-5 font-bold">
      {getWeeks().map(week => (
        <p key={uuidv4()}>{format(week, 'EEEE')}</p>
      ))}
    </div>
  );
};

export default Week;
