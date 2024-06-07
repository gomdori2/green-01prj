import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const HeaderDiv = styled.div`
  height: 70px;
  margin-bottom: 70px;
  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  .menuHeader {
    display: flex;
    gap: 40px;
    font-size: 20px;
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
  }
`;

const Header = ({ children }) => {
  return (
    <HeaderDiv>
      <ul>
        <li>
          <Link
            to="/"
            style={{
              height: "35px",
              width: "140px",
              display: "block",
              background: "url(./www/images/logo.png) no-repeat",
              backgroundSize: "contain",
            }}
          ></Link>
        </li>
        <li className="menuHeader">
          <Link to="/reactCalendar">식물관리</Link>
          <Link to="/plantResister">식물등록</Link>
          <Link to="/notice">커뮤니티</Link>
        </li>
        <li>{children}</li>
      </ul>
    </HeaderDiv>
  );
};

export default Header;
