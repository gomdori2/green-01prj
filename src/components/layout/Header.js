/* eslint-disable no-constant-condition */
import { Link } from "react-router-dom";

const Header = ({ children }) => {
  return (
    <header className="header">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/company">회사소개</Link>
          <ul>
            <li>
              <Link to="/company/ceo?name=홍길동&age=31">대표소개</Link>
            </li>
            <li>
              <Link to="/company/history?year=2024&month=06">회사연혁</Link>
            </li>
            <li>
              <Link to="/company/partner">파트너 소개</Link>
            </li>
            <li>
              <Link to="/company/location">회사 위치</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/good">제품소개</Link>
        </li>
      </ul>
      {children}
    </header>
  );
};

export default Header;
