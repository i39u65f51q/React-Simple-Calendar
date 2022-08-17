import { useSelector, useDispatch } from 'react-redux';
import { calendarActions } from '../redux/CalendarSlice';
import { format, isSameDay } from 'date-fns';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Reminder = () => {
  const calendarInitState = useSelector(state => state.calendar);

  const { reminder, selectedDate } = calendarInitState;
  const dispatch = useDispatch();

  const { removeData, submitHandler } = calendarActions;

  const filterColors = type => {
    switch (type) {
      case 'School':
        return 'bg-blue-500';
      case 'Work':
        return 'bg-red-500';
      case 'Life':
        return 'bg-green-500';
      default:
        return 'bg-slate-500';
    }
  };

  const deleteHandler = id => {
    console.log(id);
    dispatch(submitHandler(true));
    dispatch(removeData({ id: id }));
  };

  return (
    <>
      <div className="text-center bg-slate-600 p-5">
        <p className="font-bold text-lg text-white">Reminder</p>
      </div>
      {/* If no Reminder */}
      {reminder.length < 1 && (
        <p className="text-center p-3 font-bold text-sm">
          You don't have add any Reminder on Calendar
        </p>
      )}
      {/* Else */}
      {reminder.length > 0 &&
        (reminder.filter(item =>
          isSameDay(new Date(item.date), new Date(selectedDate))
        ).length < 1 ? (
          <p className="text-center p-3 font-bold text-sm">
            No Reminder for {format(new Date(selectedDate), 'MMMM dd')}!
          </p>
        ) : (
          reminder
            .filter(item =>
              isSameDay(new Date(item.date), new Date(selectedDate))
            )
            .map(item => {
              return (
                <div
                  className="flex border justify-between items-center p-2"
                  key={item.id}
                  id={item.id}
                >
                  <div className="flex gap-3">
                    <div
                      className={`w-2 border h-10 ${filterColors(item.type)}`}
                    ></div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1 ">
                        <h1 className="font-bold text-sm">{item.type}</h1>
                        <span className="text-slate-400 text-xs  font-bold">
                          {format(
                            new Date(item.date),
                            "hh:mm aaa 'on' MMMM d "
                          )}
                        </span>
                      </div>
                      <div className="flex items-center text-sm ">
                        {item.content}
                      </div>
                    </div>
                  </div>
                  <div>
                    <RiDeleteBin6Line
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => deleteHandler(item.id)}
                    />
                  </div>
                </div>
              );
            })
        ))}
    </>
  );
};
export default Reminder;
