import React, { useState, useId, forwardRef } from 'react';
//npm
import { v4 as uuidv4 } from 'uuid';
import { formatISO } from 'date-fns';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { calendarActions } from '../redux/CalendarSlice';
//Components
import SmallCalendar from './SmallCalendar';

const Form = forwardRef((props, inputRef) => {
  const [nameInput, setNameInput] = useState('School');
  const [reminderInput, setReminderInput] = useState('');
  const [reminderDate, setReminderDate] = useState(new Date());
  const id = useId();

  const dispatch = useDispatch();

  const { addReminder, submitHandler } = calendarActions;

  //Submit Data to Reminder
  const submitReminder = e => {
    e.preventDefault();
    dispatch(submitHandler(true));
    dispatch(
      addReminder({
        id: uuidv4(),
        type: nameInput,
        content: reminderInput,
        date: formatISO(reminderDate),
      })
    );
    setNameInput('');
    setReminderInput('');
    dispatch(calendarActions.closeForm());
  };

  //Submit Button
  const validOnSubmit =
    reminderInput.trim() !== ''
      ? 'pointer-events-auto opacity-1'
      : 'pointer-events-none opacity-20';

  return (
    <div
      className=" border w-fit  flex flex-col items-center justify-center gap-5  
    rounded-lg shadow-xl 
    absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2
    bg-white overflow-hidden "
    >
      <div className="w-full border p-2 bg-slate-600 text-white">
        <h4 className="font-bold text-center">Input New Reminder </h4>
      </div>
      <form
        action=""
        ref={inputRef}
        className=" bg-white p-5 flex flex-col items-center justify-center gap-10"
      >
        <div className="flex gap-5">
          {/* Calendar  */}
          <SmallCalendar setReminderDate={setReminderDate} />
          {/*  Select Type */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label htmlFor={id + '-name'} className="font-bold text-sm">
                  Type:
                </label>
                <select
                  name=""
                  id={id + '-name'}
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="border border-black rounded px-2"
                >
                  <option value="School">School</option>
                  <option value="Work">Work</option>
                  <option value="Life">Life</option>
                </select>
              </div>
              {/* Input Reminder */}
              <div className="flex flex-col">
                <label
                  htmlFor={id + '-reminder'}
                  className="font-bold text-sm w-24"
                >
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
            </div>
            {/* Submit Button */}
            <input
              type="submit"
              className={` ${validOnSubmit} w-full px-2 py-1 text-sm font-bold rounded border-black text-white bg-slate-600`}
              value="Submit"
              onClick={submitReminder}
            />
          </div>
        </div>
      </form>
    </div>
  );
});

export default Form;
