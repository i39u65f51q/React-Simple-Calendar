import { useState, useId } from 'react';
//npm
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO } from 'date-fns';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { calendarActions } from '../redux/CalendarSlice';

const Form = () => {
  const [nameInput, setNameInput] = useState('');
  const [reminderInput, setReminderInput] = useState('');
  const id = useId();

  const selectedDate = useSelector(state => state.calendar.selectedDate);
  const dispatch = useDispatch();

  //Submit Data to Reminder
  const addReminder = e => {
    e.preventDefault();

    dispatch(
      calendarActions.addReminder({
        id: uuidv4(),
        name: nameInput,
        content: reminderInput,
        date: format(parseISO(selectedDate), 'MMMM d yyy'),
      })
    );

    setNameInput('');
    setReminderInput('');
  };

  //Submit Button
  const validOnSubmit =
    nameInput.trim() !== '' && reminderInput.trim() !== ''
      ? 'pointer-events-auto opacity-1'
      : 'pointer-events-none opacity-20';

  return (
    <form action="" className="w-full flex items-center justify-center gap-2  ">
      <div className="font-bold text-blue-500 text-lg">
        {format(parseISO(selectedDate), ' MMMM d ')}
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
  );
};

export default Form;
