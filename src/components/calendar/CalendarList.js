import { Link } from "react-router-dom";

const CalendarList = item => {
  const { pk, title, text, day } = item;
  return (
    <ul key={pk}>
      <Link to={`/reactCalendar/${pk}`}>
        <li>
          <span>{pk}</span>
          <span>{title}</span>
          <span>{text}</span>
          <span>{day}</span>
        </li>
      </Link>
    </ul>
  );
};

export default CalendarList;
