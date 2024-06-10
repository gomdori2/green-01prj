import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import TextSliceSpan from "../common/TextSliceSpan";
const CalendarListUlStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  li {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  a {
    display: block;
  }
`;
const CalendarList = ({ item }) => {
  const { pk, title, text, day } = item;
  return (
    <CalendarListUlStyle key={pk}>
      <Link to={`/reactCalendar/${pk}`} state={{ pk, title, text, day }}>
        <li>
          <span>{pk}</span>
          <span>{title}</span>
          <TextSliceSpan text={text} width="60%">
            {text}
          </TextSliceSpan>
          <span>{day}</span>
        </li>
      </Link>
    </CalendarListUlStyle>
  );
};

export default CalendarList;
