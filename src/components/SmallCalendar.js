import { useState } from 'react';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import {
  eachDayOfInterval,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isWeekend,
  isSameMonth,
  addMonths,
} from 'date-fns';

const SmallCalendar = ({ setReminderDate }) => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(new Date());

  const firstDay = startOfWeek(startOfMonth(currentDay));
  const lastDay = endOfWeek(endOfMonth(currentDay));

  const totalDays = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  const getWeek = () => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(totalDays[i]);
    }
    return week;
  };

  const clickHandler = day => {
    setSelectedDay(prev => (prev = day));
    setReminderDate(prev => (prev = day));
  };

  return (
    <div className="w-fit border p-2 flex flex-col gap-2 rounded-lg shadow-xl">
      {/* Months */}
      <div className="flex items-center justify-between">
        <AiOutlineLeft
          className="text-xs cursor-pointer"
          onClick={() => setCurrentDay(addMonths(currentDay, -1))}
        />
        <div className="font-bold text-center">
          {format(currentDay, 'MMMM yyyy')}
        </div>
        <AiOutlineRight
          className="text-xs cursor-pointer"
          onClick={() => setCurrentDay(addMonths(currentDay, 1))}
        />
      </div>
      <div className="grid grid-cols-7 w-fit gap-2 ">
        {/* Weeks */}
        {getWeek().map(week => {
          return (
            <p className="text-xs font-bold" key={uuidv4()}>
              {format(week, 'E')}
            </p>
          );
        })}
        {/*  Dates */}
        {totalDays.map(day => {
          return (
            <div
              className={` 
              ${isWeekend(day, currentDay) ? ' text-red-500' : ''}
              ${
                !isSameMonth(day, currentDay)
                  ? ' text-slate-500 pointer-events-none'
                  : ''
              }
              ${isSameDay(day, selectedDay) ? 'bg-blue-500 text-white' : ''}
              ${
                isSameDay(day, selectedDay) && isWeekend(day, currentDay)
                  ? 'bg-red-600 text-slate-50'
                  : ''
              }
              
              flex items-center justify-center rounded-3xl w-6 h-6 cursor-pointer overflow-hidden text-sm`}
              onClick={() => clickHandler(day)}
              key={uuidv4()}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmallCalendar;
