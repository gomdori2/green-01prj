import styled from "@emotion/styled";
import { FaSeedling, FaSun, FaTree, FaWind } from "react-icons/fa6";
import { Link } from "react-router-dom";
const CalendarListUlStyle = styled.div`
  display: flex;
  width: 100%;
  li {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    height: 60px;
  }
  a {
    width: 100%;
  }
  span {
    display: block;
    width: 100%;

    text-align: center;
  }
`;
const SpanIcon = styled.span`
  display: block;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
  }
`;
const CalendarList = ({ item }) => {
  const { pk, title, text, day, img, gardning } = item;
  const uiIcon = {
    1: (
      <FaSun
        size="30"
        style={{ color: "#fff", background: "#FFD700", borderRadius: "10px" }}
      />
    ),
    2: (
      <FaSeedling
        size="30"
        style={{ color: "#fff", background: "#32CD32", borderRadius: "10px" }}
      />
    ),
    3: (
      <FaWind
        size="30"
        style={{ color: "#fff", background: "#00BFFF", borderRadius: "10px" }}
      />
    ),
    4: (
      <FaTree
        size="30"
        style={{ color: "#fff", background: "#32CD32", borderRadius: "10px" }}
      />
    ),
  };

  console.log(gardning);
  return (
    <CalendarListUlStyle key={pk}>
      <Link
        to={`/reactCalendar/${pk}`}
        state={{ pk, title, text, day, img, gardning }}
      >
        <li>
          <span>
            <img
              src={img}
              style={{
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                width: "50px",
                height: "50px",
              }}
            ></img>
          </span>
          <span>{text}</span>
          <SpanIcon>
            <div>
              {gardning?.map(iconKey => (
                <span key={iconKey}>{uiIcon[iconKey]}</span>
              ))}
            </div>
          </SpanIcon>

          <span>{day}</span>
        </li>
      </Link>
    </CalendarListUlStyle>
  );
};

export default CalendarList;
