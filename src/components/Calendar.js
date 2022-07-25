import React, { useState, useId } from 'react';

import { v4 as uuidv4 } from 'uuid';
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiTwotoneCalendar,
} from 'react-icons/ai';
import { BsCalendar2Plus } from 'react-icons/bs';

import {
  format,
  addMonths,
  subMonths,
  addDays,
  startOfWeek,
  startOfMonth,
  lastDayOfMonth,
  lastDayOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [reminderInput, setReminderInput] = useState('');
  //Data for Reminder
  const [reminder, setReminder] = useState([]);
  //Form id
  const id = useId();

  // function of Get Week
  const getWeeks = () => {
    const week = [];
    const startDayOfWeek = startOfWeek(currentDate);

    for (let day = 0; day < 7; day++) {
      week.push(addDays(startDayOfWeek, day));
    }
    return week;
  };

  //function of Get Date
  const getDate = () => {
    const startDay = startOfWeek(startOfMonth(currentDate));
    const endDay = lastDayOfWeek(lastDayOfMonth(currentDate));

    const totalDay = eachDayOfInterval({
      start: startDay,
      end: endDay,
    });

    //currentDate will be changed by setCurrent, Therefore currentDate !== today
    const today = new Date();
    const colorfulDays = [];

    //CSS Style
    totalDay.forEach(day => {
      if (isSameDay(day, today) && isSameMonth(day, today)) {
        //If day is same as Today
        colorfulDays.push(
          <div className="flex flex-col">
            <div className="h-5">
              {reminder.some(item => isSameDay(item.date, day)) && (
                <AiTwotoneCalendar />
              )}
            </div>
            <button
              className={` font-bold h-10 ${
                isSameDay(selectedDate, day)
                  ? 'bg-green-500 text-white'
                  : 'text-green-500'
              }`}
              onClick={() => setSelectedDate(day)}
            >
              {format(day, 'd')}
            </button>
          </div>
        );
      } else if (!isSameMonth(day, currentDate)) {
        //If day is not same Month
        colorfulDays.push(
          <div className="flex flex-col">
            <div className="h-5">
              {reminder.some(item => isSameDay(item.date, day)) && (
                <AiTwotoneCalendar />
              )}
            </div>
            <button
              className="font-bold h-10 text-slate-300 pointer-events-none"
              onClick={() => setSelectedDate(day)}
            >
              {format(day, 'd')}
            </button>
          </div>
        );
      } else if (
        //If day is weekend
        isSameDay(startOfWeek(day), day) ||
        isSameDay(lastDayOfWeek(day), day)
      ) {
        colorfulDays.push(
          <div className="flex flex-col ">
            <div className="h-5">
              {reminder.some(item => isSameDay(item.date, day)) && (
                <AiTwotoneCalendar />
              )}
            </div>
            <button
              className={` font-bold h-10 ${
                isSameDay(selectedDate, day)
                  ? 'bg-red-500 text-white'
                  : 'text-red-500'
              }`}
              onClick={() => setSelectedDate(day)}
            >
              {format(day, 'd')}
            </button>
          </div>
        );
      } else {
        //If day is work day
        colorfulDays.push(
          <div className="flex flex-col text-center">
            <div className="h-5">
              {reminder.some(item => isSameDay(item.date, day)) && (
                <AiTwotoneCalendar />
              )}
            </div>
            <button
              className={` font-bold h-10 ${
                isSameDay(selectedDate, day) ? 'bg-slate-700 text-white' : ''
              }`}
              onClick={() => setSelectedDate(day)}
            >
              {format(day, 'd')}
            </button>
          </div>
        );
      }
    });

    return colorfulDays;
  };

  //Submit Data to Reminder
  const addReminder = e => {
    e.preventDefault();

    setReminder(prev => {
      return [
        ...prev,
        {
          id: uuidv4(),
          name: nameInput,
          content: reminderInput,
          date: selectedDate,
        },
      ];
    });
    // Clear Input text
    setNameInput('');
    setReminderInput('');
  };

  //Submit Button
  const validOnSubmit =
    nameInput.trim() !== '' && reminderInput.trim() !== ''
      ? 'pointer-events-auto opacity-1'
      : 'pointer-events-none opacity-20';

  // console.log(getDate());
  // console.log(SelectedDaySameAsReminder.length);
  return (
    <div className="flex h-screen">
      <main className="w-3/4 relative">
        {/* Toggle Form Button */}
        <button
          className="absolute left-5 border p-3 rounded-3xl border-black hover:bg-slate-400"
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          <BsCalendar2Plus className="bg-white" />
        </button>
        {/* Form */}
        {showForm && (
          <form
            action=""
            className="w-full flex items-center justify-center gap-2  "
          >
            <div className="font-bold text-blue-500 text-lg">
              {format(selectedDate, ' MMMM d ')}
            </div>
            <div>
              <label htmlFor={id + '-name'} className="font-bold text-sm">
                Name:
              </label>
              <input
                type="text"
                id={id + '-name'}
                className="border border-black rounded px-2"
                placeholder="Enter your name"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={id + '-reminder'} className="font-bold text-sm">
                Reminder:
              </label>
              <input
                type="text"
                id={id + '-reminder'}
                className="border border-black rounded px-2 "
                placeholder="Enter your reminder"
                value={reminderInput}
                onChange={e => setReminderInput(e.target.value)}
              />
            </div>
            {/* Submit Button */}
            <input
              type="submit"
              className={` ${validOnSubmit} border px-2 font-bold rounded border-black text-white bg-slate-600`}
              value="Submit"
              onClick={addReminder}
            />
          </form>
        )}
        {/* Calendar */}
        <header className="text-lg font-bold flex items-center justify-center gap-5 my-5 ">
          <AiOutlineLeft
            className="cursor-pointer"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          />
          <h1>{format(currentDate, 'MMMM yyyy').toUpperCase()}</h1>
          <AiOutlineRight
            className="cursor-pointer"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          />
        </header>
        <div className="grid-cols-7">
          <div className="flex justify-around my-5 font-bold">
            {getWeeks().map(week => (
              <p key={uuidv4()}>{format(week, 'EEEE')}</p>
            ))}
          </div>
          <div className="grid grid-cols-7 text-center">{getDate()}</div>
        </div>
      </main>
      {/* Reminder */}
      <aside className="w-1/4 border-l border-black">
        <div className="font-bold text-lg text-center p-5 bg-slate-600 text-white">
          Reminder
        </div>
        {/* Render Data */}
        {reminder.length < 1 && (
          <p className="text-center p-3 font-bold text-sm">
            You don't have add any Reminder on Calendar
          </p>
        )}
        {reminder.length > 0 &&
          (reminder.filter(item => isSameDay(item.date, selectedDate)).length <
          1 ? (
            <p className="text-center p-3 font-bold text-sm">
              No Reminder for {format(selectedDate, 'MMMM dd')}!
            </p>
          ) : (
            reminder
              .filter(item => isSameDay(item.date, selectedDate))
              .map(item => {
                return (
                  <div
                    className="flex border rounded items-center gap-3 p-2"
                    key={item.id}
                  >
                    <div className="w-2 border h-10 bg-slate-400"></div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1 ">
                        <h1 className="font-bold text-sm">{item.name}</h1>
                        <span className="text-slate-400 text-xs  font-bold">
                          {format(item.date, "hh:mm aaa 'on' MMMM d ")}
                        </span>
                      </div>
                      <div className="flex items-center text-sm ">
                        {item.content}
                      </div>
                    </div>
                  </div>
                );
              })
          ))}
      </aside>
    </div>
  );
};
export default Calendar;
