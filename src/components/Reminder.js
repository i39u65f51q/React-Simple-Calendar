import { useSelector } from 'react-redux';
import { format, isSameDay, parseISO } from 'date-fns';

const Reminder = () => {
  const calendarInitState = useSelector(state => state.calendar);

  const { reminder, selectedDate } = calendarInitState;

  return (
    <>
      <div className="font-bold text-lg text-center p-5 bg-slate-600 text-white">
        Reminder
      </div>
      {reminder.length < 1 && (
        <p className="text-center p-3 font-bold text-sm">
          You don't have add any Reminder on Calendar
        </p>
      )}
      {reminder.length > 0 &&
        (reminder.filter(item => isSameDay(item.date, parseISO(selectedDate)))
          .length < 1 ? (
          <p className="text-center p-3 font-bold text-sm">
            No Reminder for {format(parseISO(selectedDate), 'MMMM dd')}!
          </p>
        ) : (
          reminder
            .filter(item => isSameDay(item.date, parseISO(selectedDate)))
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
    </>
  );
};
export default Reminder;
