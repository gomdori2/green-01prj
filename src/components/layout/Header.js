/* eslint-disable no-constant-condition */
import { Link } from "react-router-dom";

const Header = ({ children }) => {
  return (
    <header className="header">
      <ul>
        <li>
          <Link to="/">홈</Link>
          <Link to="/reactCalendar">임시 캘린더</Link>
        </li>
      </ul>
      {children}
    </header>
  );
};

export default Header;
