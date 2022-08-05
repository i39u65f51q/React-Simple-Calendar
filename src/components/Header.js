import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { format, parseISO } from 'date-fns';

import { useDispatch, useSelector } from 'react-redux';
import { calendarActions } from '../redux/CalendarSlice';

const Header = () => {
  const currentDate = useSelector(state => state.calendar.currentDate);
  const dispatch = useDispatch();

  const { minusMonth, plusMonth } = calendarActions;

  return (
    <header className="text-lg font-bold flex items-center justify-center gap-5 my-5 ">
      <AiOutlineLeft
        className="cursor-pointer"
        onClick={() => dispatch(minusMonth())}
      />
      <h1>{format(parseISO(currentDate), 'MMMM yyyy').toUpperCase()}</h1>
      <AiOutlineRight
        className="cursor-pointer"
        onClick={() => dispatch(plusMonth())}
      />
    </header>
  );
};

export default Header;
